import React from "react";
import { motion } from "framer-motion";

const Progress = ({
  currIndex,
  length,
}: {
  currIndex: number;
  length: number;
}) => {
  return (
    <>
      <div className="flex h-[1px] flex-1 items-center rounded-full bg-white bg-opacity-50">
        <div
          style={{ width: (((currIndex + 1) / length) * 100).toString() + "%" }}
          className="h-[1px] rounded-full bg-yellow-400 bg-opacity-50"
        ></div>
      </div>
      <span
        key={currIndex}
        style={{ overflow: "hidden", display: "inline-block" }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={currIndex}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="flex items-center text-4xl font-medium"
        >
          0{currIndex + 1}
        </motion.div>
      </span>
    </>
  );
};

export default Progress;
