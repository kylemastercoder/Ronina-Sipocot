import db from "@/lib/db";
import React from "react";
import { auth } from "@clerk/nextjs/server";
import CateringAppointmentForm from "@/components/forms/catering-appointment-form";

const BookCatering = async ({ params }: { params: { cateringId: string } }) => {
  const { userId } = auth();

  const catering = await db.catering.findUnique({
    where: {
      id: params.cateringId,
    },
    include: {
      addons: true,
      inclusions: true,
      features: true,
    },
  });

  const menus = await db.food.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const userData = await db.user.findUnique({
    where: {
      id: userId as string,
    },
  });

  return (
    <div className="flex-1">
      <CateringAppointmentForm catering={catering} menus={menus} userData={userData} />
    </div>
  );
};

export default BookCatering;
