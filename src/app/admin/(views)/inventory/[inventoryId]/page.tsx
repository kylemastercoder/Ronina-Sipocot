import React from "react";
import db from "@/lib/db";
import InventoryForm from "@/components/forms/inventory-form";

const InventoryPage = async ({ params }: { params: { inventoryId: string } }) => {
  const inventory = await db.inventory.findUnique({
    where: {
      id: params.inventoryId,
    },
  });

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <InventoryForm initialData={inventory} />
    </div>
  );
};

export default InventoryPage;
