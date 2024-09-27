"use client";

import React, { useEffect, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { Rooms } from "@prisma/client";
import { toast } from "sonner";
import { ColumnTypes, VariantTypes } from "@/lib/types";
import { getAllRooms, getFeaturedRooms } from "@/actions/rooms";
import RoomCard from "./room-card";
import Placeholder from "./placeholder-card";

interface RoomWithFeaturesAndAmenities extends Rooms {
  features: {
    id: string;
    numberOfPerson: number;
    price: number;
    roomId: string;
  }[];
  amenities: { id: string; name: string; createdAt: Date; updatedAt: Date }[];
}

type VariantProps = {
  type: ColumnTypes;
  variant: VariantTypes;
};

const RoomContainer = ({ type, variant }: VariantProps) => {
  const [rooms, setRooms] = useState<RoomWithFeaturesAndAmenities[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    if (variant === VariantTypes.ALL_ROOM) {
      getAllRooms()
        .then((data) => {
          if (data.success) {
            // Ensure data.rooms has features and amenities
            const roomsWithFeaturesAndAmenities: RoomWithFeaturesAndAmenities[] =
              data.rooms.map((room) => ({
                ...room,
                features: room.features ?? [], // Ensure features are included
                amenities: room.amenities ?? [], // Ensure amenities are included
              }));
            setRooms(roomsWithFeaturesAndAmenities);
          } else {
            toast.error(data.error);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      getFeaturedRooms()
        .then((data) => {
          if (data.success) {
            // Ensure data.rooms has features and amenities
            const roomsWithFeaturesAndAmenities: RoomWithFeaturesAndAmenities[] =
              data.rooms.map((room) => ({
                ...room,
                features: room.features ?? [], // Ensure features are included
                amenities: room.amenities ?? [], // Ensure amenities are included
              }));
            setRooms(roomsWithFeaturesAndAmenities);
          } else {
            toast.error(data.error);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [variant]);
  return (
    <div className="flex flex-col">
      {isLoading ? (
        <Placeholder count={2} />
      ) : rooms.length === 0 ? (
        <div className="flex items-center justify-center mx-auto flex-col">
          <Player
            autoplay
            loop
            src="/empty.json"
            style={{ height: "300px", width: "300px" }}
          />
          <h3 className="font-semibold text-lg">No Rooms Found</h3>
          <p className="text-muted-foreground md:text-md text-sm">
            It looks like we don&apos;t have any rooms to show right now.
          </p>
        </div>
      ) : (
        <div
          className={`w-full gap-5 mt-10 grid-cols-1 grid ${
            type === ColumnTypes.THREE_COLUMN
              ? "md:grid-cols-3"
              : type === ColumnTypes.TWO_COLUMN
              ? "md:grid-cols-2"
              : "md:grid-cols-1"
          }`}
        >
          {rooms.map((room, i) => (
            <RoomCard
              index={i}
              key={`room-${i}`}
              room={{
                ...room,
                features: room.features ?? [],
                amenities: room.amenities ?? [],
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomContainer;
