import React from "react";
import db from "@/lib/db";
import {
  eachDayOfInterval,
  endOfToday,
  format,
  startOfMonth,
} from "date-fns";
import { PayrollColumn } from "../components/column";
import { formatPrice } from "@/lib/utils";
import PayrollClient from "../components/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PayrollModal from "../components/payroll-modal";
import AttendanceModal from "../components/attendance-modal";
import Heading from "@/components/globals/heading";

const PayrollPage = async ({ params }: { params: { employeeId: string } }) => {
  // Get the current month date range
  const startDate = startOfMonth(new Date());
  const endDate = endOfToday();

  // Fetch the employee details
  const employees = await db.employees.findUnique({
    where: {
      id: params.employeeId,
    },
    include: {
      payroll: true,
      attendance: true,
    },
  });

  const attendance = await db.attendance.findMany({
    where: {
      employeeId: params.employeeId,
      date: {
        gte: format(startDate, "MMMM dd, yyyy"),
        lte: format(endDate, "MMMM dd, yyyy"),
      },
    },
  });

  // Calculate total days in the current month
  const daysInMonthUpToToday = eachDayOfInterval({
    start: startDate,
    end: endDate,
  }).length;

  // Calculate the number of days present and absent
  const daysPresent = attendance.length;
  const daysAbsent = daysInMonthUpToToday - daysPresent;

  // Fetch payroll records for the specific employee within the current month
  const payroll = await db.payroll.findMany({
    where: {
      employeeId: params.employeeId,
    },
    include: {
      employee: true,
      attendance: true,
    },
  });

  const formattedEmployee: PayrollColumn[] = payroll.map((item) => {
    const totalDeductions =
      Number(item.sss) +
      Number(item.philhealth) +
      Number(item.pagibig) +
      Number(item.bir) +
      Number(item.otherDeductions);

    const totalSalary = item.salary * daysPresent - totalDeductions;

    return {
      id: item.id,
      name: `${item.employee.firstName} ${item.employee.lastName}`,
      position: item.employee.position,
      imageUrl: item.employee.imageUrl,
      dateHired: format(new Date(item.employee.dateHired), "MMMM do, yyyy"),
      salary: formatPrice(Number(item.salary)),
      benefits: formatPrice(totalDeductions),
      others: formatPrice(Number(item.otherDeductions)),
      totalSalary: formatPrice(totalSalary),
      daysPresent, // Keeping it as a number now
      dateCreated: format(new Date(item.createdAt), "MMMM do, yyyy"),
      initialData: payroll
    };
  });

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="grid grid-cols-2 gap-10">
        <Card className="dark:bg-emerald-900 bg-emerald-200">
          <CardHeader>
            <CardTitle>Total Present</CardTitle>
            <CardDescription>
              Here is the summary of day present in this month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-black">{daysPresent}</p>
            <span className="text-sm text-muted-foreground">
              As of {format(new Date(), "MMMM dd, yyyy - hh:mm a")}
            </span>
          </CardContent>
        </Card>
        <Card className="dark:bg-red-900 bg-red-200">
          <CardHeader>
            <CardTitle>Total Absent</CardTitle>
            <CardDescription>
              Here is the summary of day absent in this month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-black">{daysAbsent}</p>
            <span className="text-sm text-muted-foreground">
              As of {format(new Date(), "MMMM dd, yyyy - hh:mm a")}
            </span>
          </CardContent>
        </Card>
      </div>
      <div className="flex items-center justify-between space-y-2">
        <Heading
          title={`Payroll Record`}
          description={`Here's a list of payroll for ${employees?.firstName} ${employees?.lastName}!`}
        />
        <div className="flex items-center space-x-2">
          {/* <Link
            href="/admin/payroll/new"
            className={buttonVariants({ size: "sm" })}
          >
            + Add Payroll
            </Link> */}
          <PayrollModal employees={employees ? [employees] : []} />
          <AttendanceModal employees={employees ? [employees] : []} />
        </div>
      </div>
      <PayrollClient data={formattedEmployee} />
    </div>
  );
};

export default PayrollPage;
