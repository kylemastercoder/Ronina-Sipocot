"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Events,
  EventsAddOns,
  EventsFeature,
  EventsInclusions,
  Food,
} from "@prisma/client";
import { cn, formatPrice } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ExtendedEvents extends Events {
  features: EventsFeature[];
  inclusions: EventsInclusions[];
  menus: Food[];
  addons: EventsAddOns[];
}

export interface EventCardProps {
  data: ExtendedEvents;
  index: number;
}

const EventCard: React.FC<EventCardProps> = ({ data, index }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 100);

    return () => clearTimeout(timer);
  }, [index]);
  const router = useRouter();
  return (
    <>
      <Card
        className={cn(
          "relative image-border shadow-none border-0 invisible group/main",
          {
            "visible animate-in fade-in-5": isVisible,
          }
        )}
      >
        <CardContent className="flex flex-col p-0">
          <div className="px-4 pb-4">
            <div className="flex items-center mt-4 gap-x-2">
              <h3 className="text-xl font-bold">
                {data.type}: {data.name}
              </h3>
              <Badge variant="secondary">Available</Badge>
            </div>
            <p className="text-sm my-1">
              From {formatPrice(data.features[0]?.price)} good for{" "}
              {data.features[0]?.numberOfPerson} pax <br />
              <span className="capitalize font-semibold">
                additional pax:
              </span>{" "}
              {formatPrice(data.features[1]?.price)}/pax
            </p>
            <Separator className="my-2" />
            <ul>
              <p className="font-semibold">Inclusions: </p>
              {data.inclusions.map((inclusion) => (
                <li className="text-sm" key={inclusion.id}>
                  • {inclusion.name}
                </li>
              ))}
            </ul>
            <Button
              onClick={() => router.push(`/view-event?id=${data.id}`)}
              className="w-full mt-4"
              variant="default"
              size="sm"
            >
              View More &rarr;
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default EventCard;
