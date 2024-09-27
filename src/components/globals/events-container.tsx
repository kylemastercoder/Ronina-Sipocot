import { IconCalendar } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";

const EventsContainer = () => {
  return (
    <div>
      <p className="text-2xl font-bold">Recent Events</p>
      <div className="flex flex-col mt-3 space-y-4">
        <div className="flex items-center gap-2">
          <Image
            src="/images/feature.jpg"
            alt="Event"
            width={100}
            height={100}
            className="rounded-lg"
          />
          <div>
            <p>David and Karen&apos;s Wedding</p>
            <div className="flex items-center gap-2">
              <IconCalendar />
              <p>September 20, 2024</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Image
            src="/images/feature.jpg"
            alt="Event"
            width={100}
            height={100}
            className="rounded-lg"
          />
          <div>
            <p>David and Karen&apos;s Wedding</p>
            <div className="flex items-center gap-2">
              <IconCalendar />
              <p>September 20, 2024</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsContainer;
