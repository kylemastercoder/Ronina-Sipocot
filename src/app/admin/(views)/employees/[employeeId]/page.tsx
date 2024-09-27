import React from "react";
import db from "@/lib/db";
import EmployeeForm from "@/components/forms/employee-form";

const EmployeePage = async ({ params }: { params: { employeeId: string } }) => {
  const employees = await db.employees.findUnique({
    where: {
      id: params.employeeId,
    },
  });

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <EmployeeForm initialData={employees} />
    </div>
  );
};

export default EmployeePage;
