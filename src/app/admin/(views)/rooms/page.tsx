import db from "@/lib/db";
import RoomClient from "./components/client";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Heading from "@/components/globals/heading";

const Rooms = async () => {
  const rooms = await db.rooms.findMany({
    include: {
      amenities: true,
      features: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <Heading
          title={`Rooms Listing`}
          description="Here's a list of your rooms with amenities in your hotel!"
        />
        <div className="flex items-center space-x-2">
          <Link href="/admin/rooms/new" className={buttonVariants({size: "sm"})}>
            + Add Room
          </Link>
        </div>
      </div>
      <div className="grid md:grid-cols-4 grid-cols-1 gap-3">
        {rooms.map((room, i) => (
          <RoomClient key={i} index={i} data={room} />
        ))}
      </div>
    </div>
  );
};

export default Rooms;
