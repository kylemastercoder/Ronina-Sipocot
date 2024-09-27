"use client";

import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { columns, PayrollColumn } from "./column";

interface PayrollClientProps {
  data: PayrollColumn[];
}

const PayrollClient: React.FC<PayrollClientProps> = ({ data }) => {
  return (
    <>
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};

export default PayrollClient;
