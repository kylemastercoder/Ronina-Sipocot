/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect } from "react";
import { CurrentSlide, Data } from "./navbar";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import Progress from "./progress";

type Props = {
  currentSlideData: CurrentSlide;
  sliderData: Data[];
  data: Data[];
  transitionData: Data;
  handleData: React.Dispatch<React.SetStateAction<Data[]>>;
  handleTransitionData: React.Dispatch<React.SetStateAction<Data>>;
  handleCurrentSlideData: React.Dispatch<React.SetStateAction<CurrentSlide>>;
  initData: Data;
};

const Controls = ({
  currentSlideData,
  sliderData,
  data,
  initData,
  transitionData,
  handleData,
  handleCurrentSlideData,
  handleTransitionData,
}: Props) => {
  const autoplayInterval = 5000;
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, autoplayInterval);
    return () => clearInterval(interval);
  }, [currentSlideData]);
  const handlePrev = () => {
    handleData((prevData) => [
      transitionData ? transitionData : initData,
      ...prevData.slice(0, prevData.length - 1),
    ]);
    handleCurrentSlideData({
      data: transitionData ? transitionData : sliderData[0],
      index: sliderData.findIndex(
        (ele) => ele.image === data[data.length - 1].image
      ),
    });
    handleTransitionData(data[data.length - 1]);
  };

  const handleNext = () => {
    handleData((prev) => prev.slice(1));
    handleCurrentSlideData({
      data: transitionData ? transitionData : initData,
      index: sliderData.findIndex((ele) => ele.image === data[0].image),
    });
    handleTransitionData(data[0]);
    setTimeout(() => {
      handleData((newData) => [
        ...newData,
        transitionData ? transitionData : initData,
      ]);
    }, 500);
  };

  return (
    <div className="flex items-center gap-3 px-0 py-3 md:px-1 md:py-5">
      <SliderButton handleClick={handlePrev}>
        <ChevronLeftIcon className="w-10 h-10" />
      </SliderButton>
      <SliderButton handleClick={handleNext}>
        <ChevronRightIcon className="w-10 h-10" />
      </SliderButton>
      <Progress currIndex={currentSlideData.index} length={sliderData.length} />
    </div>
  );
};

export default Controls;

const SliderButton = ({
  children,
  handleClick,
}: {
  children: React.ReactNode;
  handleClick: () => void;
}) => {
  return (
    <button
      onClick={handleClick}
      className="flex h-14 w-14 items-center justify-center rounded-full border-1 border-[#fdfdfd5f] transition duration-300 ease-in-out hover:bg-white hover:text-black"
    >
      {children}
    </button>
  );
};
