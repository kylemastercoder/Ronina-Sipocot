import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Placeholder = ({ count = 3 }: { count?: number }) => {
  return (
    <div
      className={`grid w-full grid-cols-2 mt-10 gap-10`}
    >
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex flex-col">
          <Skeleton className="w-full h-[230px]" />
          <div className="flex flex-col mt-2 gap-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>
          <Skeleton className="w-full h-10 mt-5" />
        </div>
      ))}
    </div>
  );
};

export default Placeholder;
