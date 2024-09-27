/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import Image from "next/image"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { getInitials } from "@/lib/utils"

export type ClientColumn = {
  id: string
  name: string
  email: string;
  address: string;
  imageUrl: any;
  phoneNumber: string;
  gender: string;
  createdAt: string;
}

export const columns: ColumnDef<ClientColumn>[] = [
  {
    accessorKey: "name",
    header: "Customer",
    cell: ({row}) => (
      <div className="flex items-center gap-x-2">
        {row.original.imageUrl ? (
            <Image src={row.original.imageUrl} alt="Image" width={40} height={40} className="object-cover rounded-md" />
        ) : (
            <Avatar className="w-10 h-10 object-cover rounded-md">
                <AvatarFallback className="rounded-md">{getInitials(row.original.name)}</AvatarFallback>
            </Avatar>
        )}
        <div className="flex flex-col">
          <p className="font-semibold">{row.original.name}</p>
          <p className="text-muted-foreground text-sm">{row.original.email}</p>
        </div>
      </div>
    )
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
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({row}) => <CellAction data={row.original} />
  }
]
