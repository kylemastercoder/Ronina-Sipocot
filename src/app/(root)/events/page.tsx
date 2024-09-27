import BreadcrumbBanner from "@/components/globals/bread-crumb-banner";
import Container from "@/components/globals/container";
import EventContainer from "@/components/globals/event-container";
import Heading from "@/components/globals/heading";
import React from "react";

const Events = () => {
  return (
    <>
      <BreadcrumbBanner image="event.jpg" title="Events" />
      <Container className="py-20 px-10 md:px-0">
        <Heading
          className="text-center"
          title="Events Packages"
          description="Our Events packages are designed to make your special events truly unforgettable. Whether you're planning an intimate gathering or a large celebration, we offer a variety of menus that can be suit your budget."
        />
        <EventContainer />
      </Container>
    </>
  );
};

export default Events;
