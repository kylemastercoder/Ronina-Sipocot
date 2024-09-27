import React from "react";
import { CurrentSlide, Data } from "./navbar";
import { motion } from "framer-motion";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import OtherInfo from "./other-info";

const SlideInfo = ({
  transitionData,
  currentSlide,
}: {
  transitionData: Data;
  currentSlide: CurrentSlide;
}) => {
  return (
    <>
      <OtherInfo data={transitionData ? transitionData : currentSlide.data} />
      <motion.div layout className="mt-5 flex items-center gap-3">
        <button className="flex h-[41px] w-[41px] items-center justify-center rounded-full bg-yellow-500 text-xs transition duration-300 ease-in-out hover:opacity-80">
          <BookmarkFilledIcon />
        </button>
        <button className="w-fit rounded-full border-[1px] border-[#ffffff8f] px-6 py-3 text-[10px] font-thin transition duration-300 ease-in-out hover:bg-white hover:text-black">
          DISCOVER ROOM
        </button>
      </motion.div>
    </>
  );
};

export default SlideInfo;
