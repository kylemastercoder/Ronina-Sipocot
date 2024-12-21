import db from "@/lib/db";
import React from "react";
import { format } from "date-fns";
import { formatPrice } from "@/lib/utils";
import BookingClient from "./components/client";
import BreadcrumbBanner from "@/components/globals/bread-crumb-banner";
import Container from "@/components/globals/container";
import { auth } from "@clerk/nextjs/server";

const MyBookings = async () => {
  const { userId } = auth();
  const cateringBookings = await db.cateringAppointments.findMany({
    where: { userId: userId as string },
    orderBy: { createdAt: "desc" },
    include: { catering: true, user: true },
  });

  const roomBookings = await db.roomAppointments.findMany({
    where: { userId: userId as string },
    orderBy: { createdAt: "desc" },
    include: { room: true, user: true },
  });

  const eventBookings = await db.eventAppointments.findMany({
    where: { userId: userId as string },
    orderBy: { createdAt: "desc" },
    include: { event: true, user: true },
  });

  const allBookings = [
    ...cateringBookings.map((item) => ({
      id: item.id,
      type: "Catering",
      room: item.catering.name,
      guest: item.guest,
      checkIn: format(item.checkIn, "MMMM dd, yyyy"),
      checkOut: format(item.checkOut, "MMMM dd, yyyy"),
      totalPayment: formatPrice(Number(item.price)),
      createdAt: format(item.createdAt, "MMMM dd, yyyy"),
      status: item.status,
    })),
    ...roomBookings.map((item) => ({
      id: item.id,
      type: "Room",
      room: item.room.name,
      guest: item.guest,
      checkIn: format(item.checkIn, "MMMM dd, yyyy"),
      checkOut: format(item.checkOut, "MMMM dd, yyyy"),
      totalPayment: formatPrice(Number(item.price)),
      createdAt: format(item.createdAt, "MMMM dd, yyyy"),
      status: item.status,
    })),
    ...eventBookings.map((item) => ({
      id: item.id,
      type: "Event",
      room: item.event.name,
      guest: item.guest,
      checkIn: format(item.checkIn, "MMMM dd, yyyy"),
      checkOut: format(item.checkOut, "MMMM dd, yyyy"),
      totalPayment: formatPrice(Number(item.price)),
      createdAt: format(item.createdAt, "MMMM dd, yyyy"),
      status: item.status,
    })),
  ];

  return (
    <>
      <BreadcrumbBanner title="My Bookings" image="contact.webp" />
      <Container className="mt-6">
        <BookingClient data={allBookings} />
      </Container>
    </>
  );
};

export default MyBookings;
