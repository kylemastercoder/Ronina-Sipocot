"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { formatPrice } from "@/lib/utils";
import { Events, EventsAddOns, EventsFeature, EventsInclusions, Food } from "@prisma/client";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { StarHalfIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

interface EventsWithFeatures extends Events {
  features: EventsFeature[];
  inclusions: EventsInclusions[];
  addons: EventsAddOns[];
  menus: Food[];
}

interface SpecificEventProps {
  event: EventsWithFeatures | null;
}

const SpecificEvent: React.FC<SpecificEventProps> = ({ event }) => {
  return (
    <div className="flex flex-col h-full w-full xl:px-80 lg:px-20 md:px-20 px-10 py-10">
      <div className="flex justify-between mb-3">
        <div>
          <div className="flex items-center gap-x-1 mb-2 text-yellow-400">
            <StarFilledIcon className="w-3 h-3" />
            <StarFilledIcon className="w-3 h-3" />
            <StarFilledIcon className="w-3 h-3" />
            <StarFilledIcon className="w-3 h-3" />
            <StarFilledIcon className="w-3 h-3" />
          </div>
          <div className="flex items-center gap-x-2">
            <p className="font-bold text-2xl">{event?.name}</p>
            <Badge>{event?.type}</Badge>
          </div>
        </div>
        <Button onClick={() => window.location.assign(`/event-booking/${event?.id}`)}>Book Now</Button>
      </div>
      <Carousel className="w-full mt-5">
        <p className="text-lg font-semibold mb-2">Inclusions</p>
        <CarouselContent className="-ml-1">
          {event?.inclusions.map((inclusion) => (
            <CarouselItem
              key={inclusion.id}
              className="pl-1 basis-1/2 lg:basis-1/5"
            >
              <div className="p-1">
                <Card>
                  <CardContent className="flex w-full h-[50px] items-center justify-center p-6">
                    <span className="text-sm text-center font-semibold">
                      {inclusion.name}
                    </span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="md:inline-block hidden">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 mt-5 gap-4">
        <div className="md:col-span-3 flex flex-col">
          <p className="text-lg font-semibold mb-2 mt-2">Dining Menu</p>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
            {event?.menus.map((menu) => (
              <Card key={menu.id}>
                <CardContent className="flex w-full gap-x-3 items-center p-5">
                  <div className="relative w-[300px] h-[100px]">
                    <Image
                      src={menu.imagesUrl[0]}
                      alt="Menu"
                      fill
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center mb-1 gap-x-1">
                      <p className="text-md font-bold">{menu.name} - </p>
                      <p className="border p-1 bg-primary-foreground rounded-md border-zinc-400 dark:border-zinc-700 text-sm font-bold">
                        {formatPrice(menu.price)}
                      </p>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {menu.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-lg font-semibold mb-2 mt-4">Catering Add Ons</p>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
            {event?.addons.map((addon) => (
              <Card key={addon.id}>
                <CardContent className="flex w-full gap-x-3 items-center p-5">
                  <div className="flex flex-col">
                    <div className="flex items-center mb-1 gap-x-1">
                      <p className="text-md font-bold">{addon.name} - </p>
                      <p className="border p-1 bg-primary-foreground rounded-md border-zinc-400 dark:border-zinc-700 text-sm font-bold">
                        {formatPrice(addon.price)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div className="bg-zinc-100 max-h-[260px] mt-[45px] w-full dark:bg-zinc-900 rounded-md p-5">
          <p className="font-semibold text-lg">Catering Higlights</p>
          <p className="text-sm">Status: {event?.status}</p>
          <ul>
            {event?.features.map((feature) => (
              <li key={feature.id} className="text-sm">
                • {feature.numberOfPerson} PAX - {formatPrice(feature.price)}
              </li>
            ))}
          </ul>
          <p className="text-sm mb-2 mt-3">
            Mode of Payment: <br />
            50% Downpayment <br />
            50% One week before the event
          </p>
          <p className="text-sm text-red-600 italic mb-2 mt-3">
            * PRICES ARE SUBJECT TO CHANGE WITHOUT PRIOR NOTICE
          </p>
        </div>
      </div>
      <div className="mt-3 pb-10">
        <p className="font-semibold mb-3">
          See what customers loved the most:{" "}
        </p>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
          <Card>
            <CardContent className="flex w-full gap-3 items-start p-6">
              <div className="relative w-[50px] h-[30px]">
                <Image
                  src={"/images/slider-2.png"}
                  alt="Menu"
                  fill
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center mb-1 gap-x-2">
                  <p className="text-md font-bold">Kyle Andre Lim</p>
                  <div className="flex items-center text-yellow-400">
                    <StarFilledIcon className="w-3 h-3" />
                    <StarFilledIcon className="w-3 h-3" />
                    <StarFilledIcon className="w-3 h-3" />
                    <StarFilledIcon className="w-3 h-3" />
                    <StarHalfIcon className="w-3 h-3" />
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">
                  &quot;Loved the room upgrade, gym was amazing, harbour view
                  was awesome&quot;
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        <Button size="sm" className="mt-4">
          + Add Review
        </Button>
      </div>
    </div>
  );
};

export default SpecificEvent;
