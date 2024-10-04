import db from "@/lib/db";
import React from "react";
import RoomAppointmentForm from "@/components/forms/room-appointment-form";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const BookRooms = async ({ params }: { params: { roomId: string } }) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

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

  const userData = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });

  return (
    <div className="flex-1">
      <RoomAppointmentForm room={room} menus={menus} userData={userData} />
    </div>
  );
};

export default BookRooms;
