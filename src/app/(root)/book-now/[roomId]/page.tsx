import db from "@/lib/db";
import React from "react";
import RoomAppointmentForm from "@/components/forms/room-appointment-form";
import { auth } from "@clerk/nextjs/server";

const BookRooms = async ({ params }: { params: { roomId: string } }) => {
  const { userId } = auth();

  const room = await db.rooms.findUnique({
    where: {
      id: params.roomId,
    },
    include: {
      amenities: true,
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
      <RoomAppointmentForm room={room} menus={menus} userData={userData} />
    </div>
  );
};

export default BookRooms;
