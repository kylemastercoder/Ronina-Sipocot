/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Container from "@/components/globals/container";
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
import { Food } from "@prisma/client";
import { StarFilledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CateringWithFeatures } from "../catering-appointment-form";

const Step1 = ({
  nextStep,
  cateringData,
  menuData,
}: {
  nextStep: () => void;
  cateringData: CateringWithFeatures | null;
  menuData: Food[];
}) => {
  const [step1Data, setStep1Data] = useState<CateringWithFeatures | null>(null);

  // Check for existing data in localStorage on component mount
  useEffect(() => {
    const savedStep1Data = localStorage.getItem("step1Data");
    if (savedStep1Data) {
      setStep1Data(JSON.parse(savedStep1Data));
    } else {
      setStep1Data(cateringData); // Set the initial cateringData if nothing is stored
    }
  }, [cateringData]);

  const handleSaveAndContinue = () => {
    // Save current room data into localStorage before moving to the next step
    localStorage.setItem("step1Data", JSON.stringify(cateringData));

    // Proceed to the next step
    nextStep();
  };
  return (
    <div className="mt-20">
      <Container>
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
              <p className="font-bold text-2xl">{cateringData?.name}</p>
              <Badge>{cateringData?.type}</Badge>
            </div>
          </div>
          <Button onClick={handleSaveAndContinue}>Continue</Button>
        </div>
        <Carousel className="w-full mt-5">
          <p className="text-lg font-semibold mb-2">Inclusions</p>
          <CarouselContent className="md:-ml-1 ml-0">
            {cateringData?.inclusions.map((amenity) => (
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
        <div className="grid grid-cols-1 mt-5 gap-4">
          <div className="flex flex-col">
            <p className="text-lg font-semibold mb-2 mt-2">Room Highlights</p>
            <p className="text-sm">Status: {cateringData?.status}</p>
            <ul>
              {cateringData?.features.map((feature) => (
                <li key={feature.id} className="text-sm">
                  • {feature.numberOfPerson} PAX - {formatPrice(feature.price)}
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground mb-2">
              Your stay can be extended until 3:00 PM maximum. Extension rate
              per hour is {formatPrice("250")}
            </p>
            <p className="text-lg font-semibold mb-2 mt-2">Dining Menu</p>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
              {menuData.map((menu) => (
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
        </div>
      </Container>
    </div>
  );
};

export default Step1;
