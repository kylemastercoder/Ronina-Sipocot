import React from "react";
import { CurrentSlide, Data } from "./navbar";
import { motion } from "framer-motion";

const BackgroundImage = ({
  transitionData,
  currentSlide,
}: {
  transitionData: Data;
  currentSlide: CurrentSlide;
}) => {
  return (
    <>
      {transitionData && (
        <motion.img
          key={transitionData.image}
          layoutId={transitionData.image}
          alt="Slider"
          transition={{
            opacity: { ease: "linear" },
            layout: { duration: 0.6 },
          }}
          className="absolute left-0 top-0 z-10 h-full w-full object-cover brightness-50"
          src={transitionData.image}
        />
      )}
      <motion.img
        alt="Current Slide"
        key={currentSlide.data.image + "transition"}
        src={currentSlide.data.image}
        className="absolute left-0 top-0 h-full w-full object-cover brightness-50"
      />
    </>
  );
};

export default BackgroundImage;
