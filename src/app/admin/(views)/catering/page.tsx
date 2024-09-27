import { buttonVariants } from "@/components/ui/button";
import Heading from "@/components/globals/heading";
import db from "@/lib/db";
import Link from "next/link";
import React from "react";
import CateringClient from "./components/page";

const Catering = async () => {
  const caterings = await db.catering.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      inclusions: true,
      features: true,
      menus: true,
      addons: true,
    },
  });
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <Heading
          title={`Catering Packages`}
          description="Here's a list of your catering packages in your hotel!"
        />
        <div className="flex items-center space-x-2">
          <Link
            href="/admin/catering/new"
            className={buttonVariants({ size: "sm" })}
          >
            + Add Catering
          </Link>
        </div>
      </div>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
        {caterings.map((catering, i) => (
          <CateringClient key={i} index={i} data={catering} />
        ))}
      </div>
    </div>
  );
};

export default Catering;
