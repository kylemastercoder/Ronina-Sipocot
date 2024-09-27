import Heading from "@/components/globals/heading";
import db from "@/lib/db";
import React from "react";
import { format } from "date-fns";
import { BookingColumn } from "./components/column";
import { formatPrice } from "@/lib/utils";
import BookingClient from "./components/client";
import BreadcrumbBanner from "@/components/globals/bread-crumb-banner";
import Container from "@/components/globals/container";

const MyBookings = async () => {
  const bookings = await db.roomAppointments.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      room: true,
      user: true,
    },
  });

  const formattedBookings: BookingColumn[] = bookings.map((item) => ({
    id: item.id,
    name: item.user.firstName + " " + item.user.lastName,
    email: item.user.email,
    imageUrl: item.user.imageUrl ?? "",
    room: item.room.name,
    guest: item.guest,
    checkIn: format(item.checkIn, "MMMM dd, yyyy"),
    checkOut: format(item.checkOut, "MMMM dd, yyyy"),
    totalPayment: formatPrice(Number(item.price)),
    createdAt: format(item.createdAt, "MMMM dd, yyyy"),
    status: item.status,
  }));
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <Heading
          title={`Appointment Records`}
          description="Here's a list of your appointments in your hotel!"
        />
      </div>
      <BookingClient data={formattedBookings} />
    </div>
  );
};

export default MyBookings;
