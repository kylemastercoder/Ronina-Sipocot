import BreadcrumbBanner from "@/components/globals/bread-crumb-banner";
import CateringContainer from "@/components/globals/catering-container";
import Container from "@/components/globals/container";
import Heading from "@/components/globals/heading";
import React from "react";

const Catering = () => {
  return (
    <>
      <BreadcrumbBanner image="catering.jpg" title="Catering" />
      <Container className="py-20 px-10 md:px-0">
        <Heading
          className="text-center"
          title="Catering Packages"
          description="Our catering packages are designed to make your special events truly unforgettable. Whether you're planning an intimate gathering or a large celebration, we offer a variety of menus that can be suit your budget."
        />
        <CateringContainer />
      </Container>
    </>
  );
};

export default Catering;
