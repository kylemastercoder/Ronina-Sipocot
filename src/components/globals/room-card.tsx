"use client";

import ImageSlider from "@/components/globals/image-slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn, formatPrice } from "@/lib/utils";
import { Amenities, RoomFeature, Rooms } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export interface RoomCardFeatures extends Rooms {
  features: RoomFeature[];
  amenities: Amenities[];
}

interface RoomCardProps {
  room: RoomCardFeatures | null;
  index: number;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, index }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 100);

    return () => clearTimeout(timer);
  }, [index]);

  const imageUrls = room?.imagesUrl ?? [];

  if (!room || !isVisible) return null;

  const firstFeature = room.features[0] ?? {};
  const price = firstFeature.price ?? 0;
  const numberOfPerson = firstFeature.numberOfPerson ?? 0;

  return (
    <Card
      className={cn("rounded-lg relative invisible group/main", {
        "visible animate-in fade-in-5": isVisible,
      })}
    >
      <CardContent className="flex flex-col p-0">
        <ImageSlider urls={imageUrls} />
        <div className="px-4 pb-4">
          <div className="flex items-center mt-4 gap-x-2">
            <h3 className="text-xl font-bold">{room.name}</h3>
            <Badge>{room.type}</Badge>
          </div>
          <p className="text-xs my-1">
            From {formatPrice(price)} per {numberOfPerson} pax
          </p>
          <p className="line-clamp-2 text-sm text-muted-foreground mt-1">
            {room.description}
          </p>
          <Button
            onClick={() => router.push(`/view-rooms?id=${room.id}`)}
            className="w-full mt-4"
            size="sm"
          >
            View More {" "} &rarr;
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomCard;
