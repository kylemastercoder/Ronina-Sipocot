import db from "@/lib/db";
import React from "react";
import SpecificEvent from "@/components/homepage/specific-event";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const ViewEvent = async ({ searchParams }: PageProps) => {
  const id = Array.isArray(searchParams.id)
    ? searchParams.id[0]
    : searchParams.id || "";

  const event = await db.events.findUnique({
    where: {
      id,
    },
    include: {
      inclusions: true,
      features: true,
      menus: true,
      addons: true,
    },
  });

  return (
    <div className="flex-1">
      <SpecificEvent event={event} />
    </div>
  );
};

export default ViewEvent;
