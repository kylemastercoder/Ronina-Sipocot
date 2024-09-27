/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import Image from "next/image"

export type PayrollColumn = {
  id: string
  name: string
  position: string;
  dateHired: string;
  imageUrl: string;
  salary: string;
  benefits: string;
  others: string;
  totalSalary: string;
  daysPresent: any;
  dateCreated: string;
  initialData: any[];
}

export const columns: ColumnDef<PayrollColumn>[] = [
  {
    accessorKey: "name",
    header: "Employee",
    cell: ({row}) => (
      <div className="flex items-center gap-x-2">
        <Image src={row.original.imageUrl} alt="Image" width={40} height={40} className="object-cover rounded-md" />
        <div className="flex flex-col">
          <p className="font-semibold">{row.original.name}</p>
          <p className="text-muted-foreground text-sm">{row.original.position}</p>
        </div>
      </div>
    )
  },
  {
    accessorKey: "position",
    header: "Position",
  },
  {
    accessorKey: "dateHired",
    header: "Date Hired",
  },
  {
    accessorKey: "salary",
    header: "Net Salary",
  },
  {
    accessorKey: "benefits",
    header: "Benefits",
  },
  {
    accessorKey: "others",
    header: "Other Deductions",
  },
  {
    accessorKey: "daysPresent",
    header: "Days Present",
  },
  {
    accessorKey: "totalSalary",
    header: "Total Salary",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({row}) => <CellAction data={row.original} />
  }
]
