import React from "react";
import { Data } from "./navbar";
import SliderCard from "./slider-card";

const Slides = ({ data }: { data: Data[] }) => {
  return (
    <div className="flex w-full gap-6">
      {data.map((data) => (
        <SliderCard key={data.image} data={data} />
      ))}
    </div>
  );
};

export default Slides;
