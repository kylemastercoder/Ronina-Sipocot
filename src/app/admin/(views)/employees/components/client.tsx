"use client";

import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { columns, EmployeeColumn } from "./column";

interface EmployeeClientProps {
  data: EmployeeColumn[];
}

const EmployeeClient: React.FC<EmployeeClientProps> = ({ data }) => {
  return (
    <>
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};

export default EmployeeClient;
