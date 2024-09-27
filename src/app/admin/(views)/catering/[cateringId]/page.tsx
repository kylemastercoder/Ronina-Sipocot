import React from "react";
import db from "@/lib/db";
import CateringForm from "@/components/forms/catering-form";

const CateringPage = async ({ params }: { params: { cateringId: string } }) => {
  const catering = await db.catering.findUnique({
    where: {
      id: params.cateringId,
    },
    include: {
      menus: true,
      inclusions: true,
      features: true,
      addons: true,
    },
  });

  const inclusions = await db.inclusions.findMany();
  const inclusionOptions = inclusions.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const menus = await db.food.findMany();
  const menuOptions = menus.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <CateringForm initialData={catering} inclusionOptions={inclusionOptions} menuOptions={menuOptions} />
    </div>
  );
};

export default CateringPage;
