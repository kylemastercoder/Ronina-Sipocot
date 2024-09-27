"use client";

import BreadcrumbBanner from "@/components/globals/bread-crumb-banner";
import Container from "@/components/globals/container";
import Heading from "@/components/globals/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  IconBrandFacebookFilled,
  IconLocationFilled,
  IconMailFilled,
  IconPhoneFilled,
} from "@tabler/icons-react";
import React from "react";

const ContactUs = () => {
  return (
    <>
      <BreadcrumbBanner image="contact.webp" title="Contact Us" />
      <Container className="py-20 px-10 md:px-0">
        <Heading
          className="text-center"
          title="Contact Us"
          description="We’re here to assist you with any questions or inquiries you may have. Whether you need more information about our services, want to schedule a consultation, or simply have feedback, feel free to reach out to us."
        />
        <div className="mt-10 grid grid-cols-5">
          <div className="col-span-2">
            <p className="text-2xl font-semibold">Contact Details</p>
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
            <div className="flex items-center gap-3 mt-2">
              <IconBrandFacebookFilled />
              <p>https://www.facebook.com/RoninasSipocot</p>
            </div>
          </div>
          <div className="col-span-3">
            <form>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label>Full Name</Label>
                  <Input placeholder="Juan Dela Cruz" />
                </div>
                <div className="space-y-1">
                  <Label>Email Address</Label>
                  <Input type="email" placeholder="jdelacruz@gmail.com" />
                </div>
              </div>
              <div className="space-y-1 mt-2">
                <Label>Subject</Label>
                <Input placeholder="Enter Subject" />
              </div>
              <div className="space-y-1 mt-2">
                <Label>Message</Label>
                <Textarea placeholder="Enter Message" />
              </div>
              <Button className="mt-4 float-right">Send Message</Button>
            </form>
          </div>
        </div>
        <iframe className="mt-10 w-full rounded-lg" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3874.980528703189!2d122.97847367586542!3d13.780047296637361!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a21b277f34924b%3A0x4fe138cc571a4f34!2sRonina&#39;s%20Hotel%20Sipocot!5e0!3m2!1sen!2sph!4v1727331674521!5m2!1sen!2sph" width="600" height="450" allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </Container>
    </>
  );
};

export default ContactUs;
