import db from "@/lib/db";
import React from "react";
import SpecificRoom from "@/components/homepage/specific-room";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const ViewRooms = async ({ searchParams }: PageProps) => {
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

  return (
    <div className="flex-1">
      <SpecificRoom room={room} menus={menus} />
    </div>
  );
};

export default ViewRooms;
