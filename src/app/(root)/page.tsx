import AmenitiesContainer from "@/components/globals/amenities-container";
import Container from "@/components/globals/container";
import EventsContainer from "@/components/globals/events-container";
import Heading from "@/components/globals/heading";
import RoomContainer from "@/components/globals/room-container";
import StaffContainer from "@/components/globals/staff-container";
import Testimonials from "@/components/globals/testimonials";
import VideoShowcase from "@/components/homepage/video-showcase";
import { ColumnTypes, VariantTypes } from "@/lib/types";

export default function Home() {
  return (
    <div>
      <VideoShowcase />
      {/* FEATURED ROOMS */}
      <Container className="py-20 md:px-0 px-10">
        <Heading
          className="text-center"
          title="Our Best Rooms"
          description="Our best rooms feature premium furnishings and decor that blend modern aesthetics with classic charm."
        />
        <RoomContainer
          variant={VariantTypes.FEATURED_ROOM}
          type={ColumnTypes.THREE_COLUMN}
        />
      </Container>
      {/* AMENITIES */}
      <Container className="md:px-0 px-10">
        <Heading
          className="text-center"
          title="Room Amenities"
          description="Experience comfort and convenience in our thoughtfully designed rooms, where modern amenities meet a cozy atmosphere."
        />
        <AmenitiesContainer />
      </Container>
      {/* EVENTS AND TESTIMONIALS */}
      <Container className="md:mt-20 mt-10 md:px-0 px-10">
        <div className="grid md:grid-cols-5 md:gap-0 gap-20 grid-cols-1">
          <div className="md:col-span-2 col-span-1">
            <EventsContainer />
          </div>
          <div className="md:col-span-3 col-span-1">
            <Testimonials />
          </div>
        </div>
      </Container>
      {/* STAFF */}
      <Container className="py-20 md:px-0 px-10">
        <Heading
          className="text-center"
          title="Our Staff"
          description="From our highly trained customer support to our skilled professionals behind the scenes, every individual is committed to excellence."
        />
        <StaffContainer />
      </Container>
    </div>
  );
}
