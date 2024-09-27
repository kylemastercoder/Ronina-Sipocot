"use client";
import React from "react";
import VideoDialog from "../magic-ui/video-dialog";

const VideoShowcase = () => {
  return (
    <div className="flex relative items-center bg-[url('/images/feature.jpg')] bg-cover bg-center md:py-0 py-20 md:px-40 px-10 md:h-[50vh] h-full w-full">
      <div className="absolute inset-0 w-full h-full bg-black/80 backdrop-blur" />
      <div className="flex items-center md:flex-row flex-col md:gap-40 gap-5">
        <div className="relative md:mt-20">
          <VideoDialog
            className="block md:w-[600px] md:h-[480px] w-full h-full"
            animationStyle="from-center"
            videoSrc="https://www.facebook.com/plugins/video.php?height=280&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F441416348719815%2F&show_text=false&width=500&t=0"
            thumbnailSrc="/images/slider-1.jpg"
            thumbnailAlt="Hero Video"
          />
        </div>
        <div className="flex flex-col z-10">
          <p className="text-lg font-semibold">
            <span className="text-orange-500">Ronina&apos;s</span> Sipocot
          </p>
          <p className="text-4xl font-bold">
            Discover Comfort and Convenience with Our Hotel Booking
          </p>
          <p className="text-lg mt-3">
            Welcome to our exclusive hotel booking platform, where comfort meets
            convenience. Whether you&apos;re traveling for leisure or business, we
            provide a seamless and personalized booking experience for every
            guest. Our user-friendly interface allows you to explore a variety
            of room options, from luxurious suites to cozy budget rooms,
            tailored to your needs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoShowcase;
