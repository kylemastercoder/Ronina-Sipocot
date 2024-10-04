"use client";

import React, { useState } from "react";
import Container from "../globals/container";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { AnimatePresence } from "framer-motion";
import BackgroundImage from "./background-image";
import SlideInfo from "./slide-info";
import Slides from "./slides";
import Controls from "./controls";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { IconMenu } from "@tabler/icons-react";
import CTA from "./cta";
import UserAccount from "./user-account";
import { useUser } from "@clerk/nextjs";

const sliderData = [
  {
    image: "/images/slider/slider1.jpg",
    title: "Double Room",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    subtitle: "Available",
  },
  {
    image: "/images/slider/slider2.jpg",
    title: "Ballroom Suite",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    subtitle: "Available",
  },
  {
    image: "/images/slider/slider3.jpg",
    title: "Family Room",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    subtitle: "Available",
  },
  {
    image: "/images/slider/slider4.webp",
    title: "Pool View",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    subtitle: "Available",
  },
  {
    image: "/images/slider/slider5.jpg",
    title: "Hillside View",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    subtitle: "Available",
  },
];

const links = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Accomodations",
    href: "/accomodations",
  },
  {
    title: "Dining Menu",
    href: "/dining-menu",
  },
  {
    title: "Catering",
    href: "/catering",
  },
  {
    title: "Events",
    href: "/events",
  },
  {
    title: "Contact Us",
    href: "/contact-us",
  },
];

const initData = sliderData[0];

export type Data = {
  title: string;
  image: string;
  description: string;
  subtitle: string;
};

export type CurrentSlide = {
  data: Data;
  index: number;
};

const Navbar = () => {
  const { user } = useUser();
  const [data, setData] = useState<Data[]>(sliderData.slice(1));
  const [transitionData, setTransitionData] = useState<Data>(sliderData[0]);
  const [currentSlideData, setCurrentSlideData] = useState<CurrentSlide>({
    data: initData,
    index: 0,
  });
  const pathname = usePathname();
  if (pathname === "/") {
    return (
      <main className="relative min-h-screen select-none antialiased">
        <AnimatePresence>
          <BackgroundImage
            transitionData={transitionData}
            currentSlide={currentSlideData}
          />
          <div className="absolute z-20 h-full w-full">
            <Header />
            <div className="grid h-full w-full grid-cols-1 md:grid-cols-10">
              <div className="col-span-4 mb-3 h-full flex-1 flex flex-col justify-end px-5 md:mb-0 md:justify-center md:px-10">
                <SlideInfo
                  transitionData={transitionData}
                  currentSlide={currentSlideData}
                />
              </div>
              <div className="col-span-6 flex h-full flex-1 flex-col justify-start p-4 md:justify-center md:p-10">
                <Slides data={data} />
                <Controls
                  currentSlideData={currentSlideData}
                  data={data}
                  transitionData={transitionData}
                  initData={initData}
                  handleData={setData}
                  handleTransitionData={setTransitionData}
                  handleCurrentSlideData={setCurrentSlideData}
                  sliderData={sliderData}
                />
              </div>
            </div>
          </div>
        </AnimatePresence>
      </main>
    );
  } else {
    return (
      <header className="sticky z-50 bg-background inset-x-0 top-0 py-5 border-b">
        <Container>
          <div className="flex md:px-0 px-10 items-center justify-between">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={150}
                height={150}
              />
            </Link>
            <div className="md:flex hidden items-center gap-16">
              <nav className="flex items-center gap-5">
                {links.map((link, index) => (
                  <Link
                    className={`font-normal text-lg ${
                      pathname === link.href
                        ? "text-white font-semibold"
                        : "text-muted-foreground"
                    }`}
                    href={link.href}
                    key={index}
                  >
                    {link.title}
                  </Link>
                ))}
              </nav>
              {user ? (
                <UserAccount
                  email={user.emailAddresses[0].emailAddress}
                  name={user.firstName + " " + user.lastName}
                />
              ) : (
                <CTA />
              )}
            </div>
            <Sheet>
              <SheetTrigger className="md:hidden block">
                <Button size="icon">
                  <IconMenu />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex md:hidden flex-col items-center gap-16">
                  <nav className="flex items-center flex-col mt-40 gap-5">
                    {links.map((link, index) => (
                      <Link
                        className={`font-normal text-lg ${
                          pathname === link.href
                            ? "text-white font-semibold"
                            : "text-white"
                        }`}
                        href={link.href}
                        key={index}
                      >
                        {link.title}
                      </Link>
                    ))}
                  </nav>
                  {user ? (
                    <UserAccount
                      email={user.emailAddresses[0].emailAddress}
                      name={user.firstName + " " + user.lastName}
                    />
                  ) : (
                    <CTA />
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </Container>
      </header>
    );
  }
};

export const Header = () => {
  const pathname = usePathname();
  const { user } = useUser();
  return (
    <div className="sticky z-50 backdrop-blur inset-x-0 top-0 py-5">
      <Container>
        <div className="flex md:px-0 px-10 items-center justify-between">
          <Link href="/">
            <Image src="/images/logo.png" alt="Logo" width={150} height={150} />
          </Link>
          <div className="md:flex hidden items-center gap-16">
            <nav className="flex items-center gap-5">
              {links.map((link, index) => (
                <Link
                  className={`font-normal text-lg ${
                    pathname === link.href
                      ? "text-white font-semibold"
                      : "text-white"
                  }`}
                  href={link.href}
                  key={index}
                >
                  {link.title}
                </Link>
              ))}
            </nav>
            {user ? (
              <UserAccount
                email={user.emailAddresses[0].emailAddress}
                name={user.firstName + " " + user.lastName}
              />
            ) : (
              <CTA />
            )}
          </div>
          <Sheet>
            <SheetTrigger className="md:hidden block">
              <Button size="icon">
                <IconMenu />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex md:hidden flex-col items-center gap-16">
                <nav className="flex items-center flex-col mt-40 gap-5">
                  {links.map((link, index) => (
                    <Link
                      className={`font-normal text-lg ${
                        pathname === link.href
                          ? "text-white font-semibold"
                          : "text-white"
                      }`}
                      href={link.href}
                      key={index}
                    >
                      {link.title}
                    </Link>
                  ))}
                </nav>
                {user ? (
                  <UserAccount
                    email={user.emailAddresses[0].emailAddress}
                    name={user.firstName + " " + user.lastName}
                  />
                ) : (
                  <CTA />
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
