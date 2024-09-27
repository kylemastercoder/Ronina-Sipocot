import db from "@/lib/db";
import React from "react";
import SpecificCatering from "@/components/homepage/specific-catering";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const ViewCatering = async ({ searchParams }: PageProps) => {
  const id = Array.isArray(searchParams.id)
    ? searchParams.id[0]
    : searchParams.id || "";

  const catering = await db.catering.findUnique({
    where: {
      id,
    },
    include: {
      inclusions: true,
      features: true,
      menus: true,
      addons: true,
    },
  });

  return (
    <div className="flex-1">
      <SpecificCatering catering={catering} />
    </div>
  );
};

export default ViewCatering;
