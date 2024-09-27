/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

export type EmployeeColumn = {
  id: string
  name: string
  email: string;
  position: string;
  dateHired: string;
  status: string;
  address: string;
  imageUrl: string;
  phoneNumber: string;
  gender: string;
  civilStatus: string;
  rooms: any[];
}

export const columns: ColumnDef<EmployeeColumn>[] = [
  {
    accessorKey: "name",
    header: "Employee",
    cell: ({row}) => (
      <div className="flex items-center gap-x-2">
        <Image src={row.original.imageUrl} alt="Image" width={40} height={40} className="object-cover rounded-md" />
        <div className="flex flex-col">
          <p className="font-semibold">{row.original.name}</p>
          <p className="text-muted-foreground text-sm">{row.original.email}</p>
        </div>
      </div>
    )
  },
  {
    accessorKey: "position",
    header: "Position",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "civilStatus",
    header: "Civil Status",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({row}) => (
      <Badge variant={row.original.status === "Active" ? "default" : "secondary"}>
        {row.original.status}
      </Badge>
    )
  },
  {
    accessorKey: "dateHired",
    header: "Date Hired",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({row}) => <CellAction data={row.original} />
  }
]
