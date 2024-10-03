"use client";

import { LayoutGrid } from "@/components/magic-ui/layout-grid";
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
import { Amenities, Food, RoomFeature, Rooms } from "@prisma/client";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { StarHalfIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import Container from "../globals/container";
import { useRouter } from "next/navigation";

interface RoomWithFeatures extends Rooms {
  features: RoomFeature[];
  amenities: Amenities[];
}

interface SpecificRoomProps {
  room: RoomWithFeatures | null;
  menus: Food[];
}

const SpecificRoom: React.FC<SpecificRoomProps> = ({ room, menus }) => {
  const router = useRouter();
  const cards = [
    {
      id: 1,
      className: "md:col-span-2",
      thumbnail: room?.imagesUrl[0] ?? "",
    },
    {
      id: 2,
      className: "col-span-1",
      thumbnail: room?.imagesUrl[1] ?? "",
    },
    {
      id: 3,
      className: "col-span-1",
      thumbnail: room?.imagesUrl[2] ?? "",
    },
    {
      id: 4,
      className: "md:col-span-2",
      thumbnail: room?.imagesUrl[3] ?? "",
    },
  ];
  return (
    <div className="flex flex-col w-full h-full">
      <Container className="py-10 px-10 md:px-0">
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
              <p className="font-bold text-2xl">{room?.name}</p>
              <Badge>{room?.type}</Badge>
            </div>
          </div>
          {room?.status === "Available" ? (
            <Button
              onClick={() => router.push(`/book-now?id=${room?.id}`)}
              size="sm"
            >
              Book Now
            </Button>
          ) : (
            <Button variant="destructive" disabled>Not Available</Button>
          )}
        </div>
        <div className="h-full">
          <LayoutGrid cards={cards} />
        </div>
        <Carousel className="w-full mt-5">
          <p className="text-lg font-semibold mb-2">Amenities</p>
          <CarouselContent className="md:-ml-1 ml-0">
            {room?.amenities.map((amenity) => (
              <CarouselItem
                key={amenity.id}
                className="md:pl-1 basis-1/2 lg:basis-1/5"
              >
                <div className="md:p-1">
                  <Card>
                    <CardContent className="flex w-full h-[50px] items-center justify-center p-6">
                      <span className="text-sm text-center font-semibold">
                        {amenity.name}
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
        <div className="grid md:grid-cols-4 grid-cols-1 mt-5 gap-4">
          <div className="md:col-span-3 flex flex-col">
            <p>{room?.description}</p>
            <p className="text-lg font-semibold mb-2 mt-2">Dining Menu</p>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
              {menus.map((menu) => (
                <Card key={menu.id}>
                  <CardContent className="flex w-full gap-x-3 items-center p-5">
                    <div className="relative w-[300px] h-[100px]">
                      <Image
                        src={menu.imagesUrl[0]}
                        alt="Menu"
                        fill
                        className="w-full h-full object-contain"
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
          </div>
          <div className="bg-zinc-100 w-full dark:bg-zinc-900 rounded-md p-5">
            <p className="font-semibold text-lg">Room Higlights</p>
            <p className="text-sm">Status: {room?.status}</p>
            <ul>
              {room?.features.map((feature) => (
                <li key={feature.id} className="text-sm">
                  • {feature.numberOfPerson} PAX - {formatPrice(feature.price)}
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground mb-2">
              Your stay can be extended until 3:00 PM maximum. Extension rate
              per hour is {formatPrice("250")}
            </p>
            <Badge className="text-sm inline-block mb-1" variant="default">
              Check In: 2:00 PM
            </Badge>
            <Badge className="text-sm inline-block mx-2" variant="default">
              Check Out: 12:00 NN
            </Badge>
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
                    src={room?.imagesUrl[0] || ""}
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
            <Card>
              <CardContent className="flex w-full gap-3 items-start p-6">
                <div className="relative w-[50px] h-[30px]">
                  <Image
                    src={room?.imagesUrl[0] || ""}
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
            <Card>
              <CardContent className="flex w-full gap-3 items-start p-6">
                <div className="relative w-[50px] h-[30px]">
                  <Image
                    src={room?.imagesUrl[0] || ""}
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
      </Container>
    </div>
  );
};

export default SpecificRoom;
