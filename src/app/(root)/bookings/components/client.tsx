"use client";

import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { BookingColumn, columns } from "./column";

interface BookingClientProps {
  data: BookingColumn[];
}

const BookingClient: React.FC<BookingClientProps> = ({ data }) => {
  return (
    <>
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};

export default BookingClient;
