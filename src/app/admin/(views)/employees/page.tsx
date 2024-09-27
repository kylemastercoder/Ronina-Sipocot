import { buttonVariants } from "@/components/ui/button";
import Heading from "@/components/globals/heading";
import db from "@/lib/db";
import Link from "next/link";
import React from "react";
import EmployeeClient from "./components/client";
import { EmployeeColumn } from "./components/column";
import { format } from "date-fns";

const Employees = async () => {
  const employees = await db.employees.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const rooms = await db.rooms.findMany();

  const formattedEmployee: EmployeeColumn[] = employees.map((item) => ({
    id: item.id,
    name: item.firstName + " " + item.lastName,
    email: item.email,
    position: item.position,
    imageUrl: item.imageUrl,
    dateHired: format(item.dateHired, "MMMM do, yyyy"),
    status: item.status,
    address: item.address,
    phoneNumber: item.phoneNumber,
    gender: item.sex,
    civilStatus: item.civilStatus,
    rooms: rooms,
  }));
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <Heading
          title={`Employee Records`}
          description="Here's a list of your employees in your hotel!"
        />
        <div className="flex items-center space-x-2">
          <Link
            href="/admin/employees/new"
            className={buttonVariants({ size: "sm" })}
          >
            + Add Employee
          </Link>
        </div>
      </div>
      <EmployeeClient data={formattedEmployee} />
    </div>
  );
};

export default Employees;
