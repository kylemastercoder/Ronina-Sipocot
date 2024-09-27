"use client";

import ImageSlider from "@/components/globals/image-slider";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn, formatPrice } from "@/lib/utils";
import { Food } from "@prisma/client";
import React, { useEffect, useState } from "react";

interface MenuCardProps {
  menu: Food | null;
  index: number;
}

const MenuCard: React.FC<MenuCardProps> = ({ menu, index }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 100);

    return () => clearTimeout(timer);
  }, [index]);

  const imageUrls = menu?.imagesUrl ?? [];

  if (!menu || !isVisible) return null;

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
            <h3 className="text-xl font-bold">{menu.name}</h3>
            <Badge>{menu.type}</Badge>
          </div>
          <p className="text-xs my-1">{formatPrice(menu.price)}</p>
          <p className="line-clamp-2 text-sm text-muted-foreground mt-1">
            {menu.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MenuCard;
