import PayrollForm from "@/components/forms/payroll-form";
import db from "@/lib/db";
import React from "react";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const EditPayroll = async ({ searchParams }: PageProps) => {
  const payrollId = Array.isArray(searchParams.payrollId)
    ? searchParams.payrollId[0]
    : searchParams.payrollId || "";

  const payroll = await db.payroll.findUnique({
    where: {
      id: payrollId,
    },
    include: {
        employee: true,
        attendance: true
    }
  });
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <PayrollForm initialData={payroll} />
    </div>
  );
};

export default EditPayroll;
