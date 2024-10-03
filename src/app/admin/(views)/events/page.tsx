import { buttonVariants } from "@/components/ui/button";
import Heading from "@/components/globals/heading";
import db from "@/lib/db";
import Link from "next/link";
import React from "react";
import EventClient from "./components/client";

const Events = async () => {
  const events = await db.events.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      inclusions: true,
      features: true,
      menus: true,
      addons: true,
    },
  });
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <Heading
          title={`Event Packages`}
          description="Here's a list of your event packages in your hotel!"
        />
        <div className="flex items-center space-x-2">
          <Link
            href="/admin/events/new"
            className={buttonVariants({ size: "sm" })}
          >
            + Add Event
          </Link>
        </div>
      </div>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
        {events.map((event, i) => (
          <EventClient key={i} index={i} data={event} />
        ))}
      </div>
    </div>
  );
};

export default Events;
