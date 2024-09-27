import { buttonVariants } from "@/components/ui/button";
import Heading from "@/components/globals/heading";
import db from "@/lib/db";
import Link from "next/link";
import React from "react";
import FoodClient from "./components/client";

const Menu = async () => {
  const menus = await db.food.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <Heading
          title={`Dining Menu`}
          description="Here's a list of your dining menus in your hotel!"
        />
        <div className="flex items-center space-x-2">
          <Link
            href="/admin/menu/new"
            className={buttonVariants({ size: "sm" })}
          >
            + Add Menu
          </Link>
        </div>
      </div>
      <div className="grid md:grid-cols-4 grid-cols-1 gap-3">
        {menus.map((menu, i) => (
          <FoodClient key={i} index={i} data={menu} />
        ))}
      </div>
    </div>
  );
};

export default Menu;
