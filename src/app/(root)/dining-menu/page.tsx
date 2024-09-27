import BreadcrumbBanner from "@/components/globals/bread-crumb-banner";
import Container from "@/components/globals/container";
import Heading from "@/components/globals/heading";
import MenuContainer from "@/components/globals/menu-container";
import React from "react";

const DiningMenu = () => {
  return (
    <>
      <BreadcrumbBanner image="menu.jpg" title="Dining Menu" />
      <Container className="py-20 px-10 md:px-0">
        <Heading
          className="text-center"
          title="Our Dining Menu"
          description="Indulge in our wide array of culinary delights carefully crafted to satisfy every plate. Whether you're in the mood for a hearty breakfast, a light snack, or a full-course dinner."
        />
        <MenuContainer />
      </Container>
    </>
  );
};

export default DiningMenu;
