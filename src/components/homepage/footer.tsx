import React from "react";
import Container from "../globals/container";
import {
  IconLocationFilled,
  IconMailFilled,
  IconPhoneFilled,
} from "@tabler/icons-react";
import Link from "next/link";
import { Separator } from "../ui/separator";

const Footer = () => {
  return (
    <div className="bg-black">
      <Container className="grid grid-cols-1 md:px-0 px-10 gap-10 md:gap-0 md:grid-cols-11 py-10">
        <div className="flex col-span-1 md:col-span-7 flex-col">
          <p className="text-xl font-bold">Contact Us</p>
          <div className="flex items-center gap-3 mt-2 md:mt-5">
            <IconLocationFilled />
            <p>Zone 4 Impig, Sipocot, Philippines</p>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <IconMailFilled />
            <p>roninas.eventsplace@gmail.com</p>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <IconPhoneFilled />
            <p>0931 055 7913</p>
          </div>
        </div>
        <div className="flex col-span-1 md:col-span-2 flex-col">
          <p className="text-xl font-bold mb-2 md:mb-5">Reservation</p>
          <Link href="/room-reservation">Rooms & Suites</Link>
          <Link href="/room-reservation">Events</Link>
          <Link href="/room-reservation">Catering</Link>
          <Link href="/room-reservation">Our Menus</Link>
        </div>
        <div className="flex col-span-1 md:col-span-2 flex-col">
          <p className="text-xl font-bold mb-2 md:mb-5">Other Links</p>
          <Link href="/room-reservation">Contact US</Link>
          <Link href="/room-reservation">FAQs</Link>
          <Link href="/room-reservation">Terms & Conditions</Link>
          <Link href="/room-reservation">Privacy Policy</Link>
        </div>
      </Container>
      <Separator />
      <div className="text-center py-3">
        © 2024 <span className="font-bold text-amber-600">Ronina&apos;s Sipocot</span>. All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
