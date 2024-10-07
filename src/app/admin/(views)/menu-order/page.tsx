import Heading from "@/components/globals/heading";
import db from "@/lib/db";
import React from "react";
import { format } from "date-fns";
import { MenuOrderColumn } from "./components/column";
import { formatPrice } from "@/lib/utils";
import MenuOrderClient from "./components/client";

const MenuOrder = async () => {
  const orderMenu = await db.orderFood.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      food: true,
      user: true,
    },
  });

  const formattedOrderMenu: MenuOrderColumn[] = orderMenu.map((item) => ({
    id: item.id,
    name: item.user.firstName + " " + item.user.lastName,
    email: item.user.email,
    imageUrl: item.user.imageUrl ?? "",
    menu: item.food.name,
    quantity: item.quantity,
    price: formatPrice(Number(item.price)),
    createdAt: format(item.createdAt, "MMMM dd, yyyy"),
    status: item.status,
  }));
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <Heading
          title={`Menu Orders`}
          description="Here's a list of your menu orders in your hotel!"
        />
      </div>
      <MenuOrderClient data={formattedOrderMenu} />
    </div>
  );
};

export default MenuOrder;
