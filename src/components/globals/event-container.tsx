"use client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Player } from "@lottiefiles/react-lottie-player";
import Placeholder from "@/components/globals/placeholder-card";
import Container from "./container";
import { getAllEvents } from "@/actions/events";
import EventCard, { EventCardProps } from "./event-card";


const EventContainer = () => {
  const [event, setEvent] = useState<EventCardProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    getAllEvents()
      .then((data) => {
        if (data.success) {
          const event: EventCardProps[] = data.events.map((event, index) => ({
            data: event,
            index: index,
          }));
          setEvent(event);
        } else {
          toast.error(data.error);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return (
    <Container className="mt-10">
      {isLoading ? (
        <>
          <Placeholder count={4} />
        </>
      ) : event.length === 0 ? (
        <div className="flex items-center justify-center mx-auto flex-col">
          <Player
            autoplay
            loop
            src="/empty.json"
            style={{ height: "300px", width: "300px" }}
          />
          <h3 className="font-semibold text-lg">No Event Found</h3>
          <p className="text-muted-foreground md:text-md text-sm text-center">
            It looks like we don&apos;t have any event to show right now.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {event.map((item, i) => (
            <EventCard
              index={i}
              key={`event-${i}`}
              data={item.data}
            />
          ))}
        </div>
      )}
    </Container>
  );
};

export default EventContainer;
