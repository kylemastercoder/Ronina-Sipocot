import BreadcrumbBanner from "@/components/globals/bread-crumb-banner";
import Container from "@/components/globals/container";
import Heading from "@/components/globals/heading";
import RoomContainer from "@/components/globals/room-container";
import { ColumnTypes, VariantTypes } from "@/lib/types";
import React from "react";

const Accomodations = () => {
  return (
    <>
      <BreadcrumbBanner image="accomodation.jpg" title="Accomodations" />
      <Container className="py-20 px-10 md:px-0">
        <Heading
          className="text-center"
          title="Our Rooms"
          description="Our rooms feature premium furnishings and decor that blend modern aesthetics with classic charm."
        />
        <RoomContainer
          variant={VariantTypes.ALL_ROOM}
          type={ColumnTypes.THREE_COLUMN}
        />
      </Container>
    </>
  );
};

export default Accomodations;
