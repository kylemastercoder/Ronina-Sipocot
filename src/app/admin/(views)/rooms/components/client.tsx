"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Rooms } from "@prisma/client";
import { cn, formatPrice } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ImageSlider from "@/components/globals/image-slider";

interface RoomFeatures {
  price: number;
  numberOfPerson: number;
}

interface ExtendedRooms extends Rooms {
  features: RoomFeatures[];
}

interface RoomClientProps {
  data: ExtendedRooms;
  index: number;
}

const RoomClient: React.FC<RoomClientProps> = ({ data, index }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 100);

    return () => clearTimeout(timer);
  }, [index]);
  const router = useRouter();
  return (
    <Card
      className={cn("rounded-lg relative invisible group/main", {
        "visible animate-in fade-in-5": isVisible,
      })}
    >
      <CardContent className="flex flex-col p-0">
        <ImageSlider urls={data.imagesUrl} />
        <div className="px-4 pb-4">
          <div className="flex items-center mt-4 gap-x-2">
            <h3 className="text-xl font-bold">{data.name}</h3>
            <Badge variant={data.status === "Available" ? "default" : "secondary"}>{data.status}</Badge>
          </div>
          <p className="text-xs my-1">
            From {formatPrice(data.features[0].price)} per{" "}
            {data.features[0].numberOfPerson} pax
          </p>
          <p className="line-clamp-2 text-sm text-muted-foreground mt-1">
            {data.description}
          </p>
          <Button onClick={() => router.push(`/admin/rooms/${data.id}`)} className="w-full mt-4" variant="default" size="sm">View More &rarr;</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomClient;
