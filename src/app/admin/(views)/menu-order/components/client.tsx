"use client";

import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { MenuOrderColumn, columns } from "./column";

interface MenuOrderClientProps {
  data: MenuOrderColumn[];
}

const MenuOrderClient: React.FC<MenuOrderClientProps> = ({ data }) => {
  return (
    <>
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};

export default MenuOrderClient;
