import db from "@/lib/db";
import React from "react";
import Marquee from "../magic-ui/marquee";
import { cn } from "@/lib/utils";
import {
  IconAirConditioning,
  IconBarbellFilled,
  IconBathFilled,
  IconBottleFilled,
  IconCoffee,
  IconDeviceRemoteFilled,
  IconPackage,
  IconParkingCircleFilled,
  IconShieldLockFilled,
  IconSwimming,
  IconToiletPaper,
  IconWifi,
  IconWind,
} from "@tabler/icons-react";

const amenityIcons: { [key: string]: JSX.Element } = {
  "24/7 CCTV": <IconShieldLockFilled />,
  "Free Parking": <IconParkingCircleFilled />,
  "Wifi Access": <IconWifi />,
  "Air-conditioned Rooms": <IconAirConditioning />,
  "Hair Dryer": <IconWind />,
  Minibar: <IconBottleFilled />,
  "Towels & Toiletries": <IconToiletPaper />,
  "Free Gym": <IconBarbellFilled />,
  "Pool Access": <IconSwimming />,
  "Safe Box": <IconPackage />,
  "Daily Breakfast": <IconCoffee />,
  "En Suite Bathroom": <IconBathFilled />,
  "Smart TV with Cable": <IconDeviceRemoteFilled />,
};

const AmenityCard = ({ name }: { name: string }) => {
  const icon = amenityIcons[name] || (
    <IconShieldLockFilled className="text-gray-900 dark:text-gray-100" />
  );
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-4">
        <div className="rounded-full p-2 bg-gray-200 dark:bg-orange-600">
          {icon}
        </div>
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
        </div>
      </div>
    </figure>
  );
};

const AmenitiesContainer = async () => {
  const amenities = await db.amenities.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });
  return (
    <div className="relative flex h-[200px] w-full flex-col items-center justify-center overflow-hidden rounded-lg">
      <Marquee pauseOnHover className="[--duration:120s]">
        {amenities.map((amenity) => (
          <AmenityCard key={amenity.id} {...amenity} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
};

export default AmenitiesContainer;
