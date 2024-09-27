import React from "react";
import db from "@/lib/db";
import RoomForm from "@/components/forms/room-form";

const RoomPage = async ({ params }: { params: { roomId: string } }) => {
  const room = await db.rooms.findUnique({
    where: {
      id: params.roomId,
    },
    include: {
      features: true,
      amenities: true,
    },
  });

  const amenities = await db.amenities.findMany();
  const amenitiesOptions = amenities.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <RoomForm initialData={room} amenitiesOptions={amenitiesOptions} />
    </div>
  );
};

export default RoomPage;
