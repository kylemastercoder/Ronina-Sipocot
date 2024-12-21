import db from "@/lib/db";
import React from "react";
import { auth } from "@clerk/nextjs/server";
import EventAppointmentForm from "@/components/forms/event-appointment-form";

const BookEvent = async ({ params }: { params: { eventId: string } }) => {
  const { userId } = auth();

  const event = await db.events.findUnique({
    where: {
      id: params.eventId,
    },
    include: {
      addons: true,
      inclusions: true,
      features: true,
    },
  });

  const menus = await db.food.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const userData = await db.user.findUnique({
    where: {
      id: userId as string,
    },
  });

  return (
    <div className="flex-1">
      <EventAppointmentForm event={event} menus={menus} userData={userData} />
    </div>
  );
};

export default BookEvent;
