import React from "react";
import db from "@/lib/db";
import EventForm from "@/components/forms/event-form";

const EventPage = async ({ params }: { params: { eventId: string } }) => {
  const event = await db.events.findUnique({
    where: {
      id: params.eventId,
    },
    include: {
      menus: true,
      inclusions: true,
      features: true,
      addons: true,
    },
  });

  const inclusions = await db.eventsInclusions.findMany();
  const inclusionOptions = inclusions.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const menus = await db.food.findMany();
  const menuOptions = menus.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <EventForm initialData={event} inclusionOptions={inclusionOptions} menuOptions={menuOptions} />
    </div>
  );
};

export default EventPage;
