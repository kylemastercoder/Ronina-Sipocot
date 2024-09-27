import React from "react";
import db from "@/lib/db";
import MenuForm from "@/components/forms/menu-form";

const MenuPage = async ({ params }: { params: { menuId: string } }) => {
  const menu = await db.food.findUnique({
    where: {
      id: params.menuId,
    },
  });

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <MenuForm initialData={menu} />
    </div>
  );
};

export default MenuPage;
