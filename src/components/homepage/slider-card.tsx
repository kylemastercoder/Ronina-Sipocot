/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { motion } from "framer-motion";

const SliderCard = ({ data }: { data: any }) => {
  return (
    <motion.div
      className="relative h-52 min-w-[250px] rounded-2xl md:h-80 shadow-md md:min-w-[250px]"
      layout
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        transition: {
          duration: 0.4,
        },
      }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 100,
      }}
    >
      <motion.img
        layoutId={data.image}
        alt="Transition Image"
        src={data.image}
        className="absolute w-full h-full rounded-xl object-cover brightness-75"
      />
      <motion.div layout className="absolute z-10 flex h-full items-end p-4">
        <motion.div>
          <motion.div layout className="mb-2 h-[2px] w-3 rounded-full bg-white"></motion.div>
          <motion.h1
            layoutId={data.title}
            className="text-xl leading-6 text-white"
          >
            {data.title}
          </motion.h1>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SliderCard;
