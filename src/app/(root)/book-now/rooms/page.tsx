import db from "@/lib/db";
import React from "react";
import RoomAppointmentForm from "@/components/forms/room-appointment-form";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const BookRooms = async ({ searchParams }: PageProps) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const id = Array.isArray(searchParams.id)
    ? searchParams.id[0]
    : searchParams.id || "";

  const room = await db.rooms.findUnique({
    where: {
      id,
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
