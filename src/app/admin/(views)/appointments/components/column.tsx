/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { CellAction } from "./cell-action";
import { Badge } from "@/components/ui/badge";

export type BookingColumn = {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  room: string;
  guest: string;
  checkIn: string;
  checkOut: string;
  totalPayment: string;
  status: string;
  createdAt: string;
};

export const columns: ColumnDef<BookingColumn>[] = [
  {
    accessorKey: "name",
    header: "Customer",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.imageUrl ? (
          <Image
            src={row.original.imageUrl}
            alt="Image"
            width={40}
            height={40}
            className="object-cover rounded-md"
          />
        ) : (
          <Avatar className="w-10 h-10 object-cover rounded-md">
            <AvatarFallback className="rounded-md">
              {getInitials(row.original.name)}
            </AvatarFallback>
          </Avatar>
        )}
        <div className="flex flex-col">
          <p className="font-semibold">{row.original.name}</p>
          <p className="text-muted-foreground text-sm">{row.original.email}</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "room",
    header: "Room",
  },
  {
    accessorKey: "guest",
    header: "Guest",
  },
  {
    accessorKey: "checkIn",
    header: "Check-in Date",
  },
  {
    accessorKey: "checkOut",
    header: "Check-out Date",
  },
  {
    accessorKey: "totalPayment",
    header: "Total Payment",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      let variant;

      switch (row.original.status) {
        case "Pending":
          variant = "secondary";
          break;
        case "Confirmed":
          variant = "default";
          break;
        case "Declined":
          variant = "destructive";
          break;
        default:
          variant = "default"; // or any fallback variant you prefer
      }

      return <Badge variant={variant as "default" | "secondary" | "destructive" | "outline"}>{row.original.status}</Badge>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
