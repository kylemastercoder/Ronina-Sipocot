"use client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Player } from "@lottiefiles/react-lottie-player";
import Placeholder from "@/components/globals/placeholder-card";
import { getAllCaterings } from "@/actions/catering";
import Container from "./container";
import CateringCard, { CateringCardProps } from "./catering-card";


const CateringContainer = () => {
  const [catering, setCatering] = useState<CateringCardProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    getAllCaterings()
      .then((data) => {
        if (data.success) {
          const catering: CateringCardProps[] = data.caterings.map((catering, index) => ({
            data: catering,
            index: index,
          }));
          setCatering(catering);
        } else {
          toast.error(data.error);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return (
    <Container className="mt-10">
      {isLoading ? (
        <>
          <Placeholder count={4} />
        </>
      ) : catering.length === 0 ? (
        <div className="flex items-center justify-center mx-auto flex-col">
          <Player
            autoplay
            loop
            src="/empty.json"
            style={{ height: "300px", width: "300px" }}
          />
          <h3 className="font-semibold text-lg">No Catering Found</h3>
          <p className="text-muted-foreground md:text-md text-sm text-center">
            It looks like we don&apos;t have any catering to show right now.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {catering.map((item, i) => (
            <CateringCard
              index={i}
              key={`catering-${i}`}
              data={item.data}
            />
          ))}
        </div>
      )}
    </Container>
  );
};

export default CateringContainer;
