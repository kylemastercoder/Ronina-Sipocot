/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";

export type BookingColumn = {
  id: string;
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

      return (
        <Badge
          variant={
            variant as "default" | "secondary" | "destructive" | "outline"
          }
        >
          {row.original.status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
  },
];
