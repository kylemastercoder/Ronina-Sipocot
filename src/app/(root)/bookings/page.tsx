import db from "@/lib/db";
import React from "react";
import { format } from "date-fns";
import { BookingColumn } from "./components/column";
import { formatPrice } from "@/lib/utils";
import BookingClient from "./components/client";
import BreadcrumbBanner from "@/components/globals/bread-crumb-banner";
import Container from "@/components/globals/container";
import { auth } from "@clerk/nextjs/server";

const MyBookings = async () => {
  const { userId } = auth();
  const bookings = await db.roomAppointments.findMany({
    where: {
      userId: userId as string,
    },
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
    room: item.room.name,
    guest: item.guest,
    checkIn: format(item.checkIn, "MMMM dd, yyyy"),
    checkOut: format(item.checkOut, "MMMM dd, yyyy"),
    totalPayment: formatPrice(Number(item.price)),
    createdAt: format(item.createdAt, "MMMM dd, yyyy"),
    status: item.status,
  }));
  return (
    <>
      <BreadcrumbBanner title="My Bookings" image="contact.webp" />
      <Container className="mt-6">
        <BookingClient data={formattedBookings} />
      </Container>
    </>
  );
};

export default MyBookings;
