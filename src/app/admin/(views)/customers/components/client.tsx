"use client";

import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { ClientColumn, columns } from "./column";

interface CustomerClientProps {
  data: ClientColumn[];
}

const CustomerClient: React.FC<CustomerClientProps> = ({ data }) => {
  return (
    <>
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};

export default CustomerClient;
