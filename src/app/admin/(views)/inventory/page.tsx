import Heading from "@/components/globals/heading";
import db from "@/lib/db";
import React from "react";
import { format } from "date-fns";
import { InventoryColumn } from "./components/column";
import InventoryClient from "./components/client";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const Inventory = async () => {
  const inventory = await db.inventory.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCustomer: InventoryColumn[] = inventory.map((item) => ({
    id: item.id,
    name: item.name,
    type: item.type,
    stock: item.stock,
    status: item.status,
    createdAt: format(item.createdAt, "MMM dd, yyyy"),
  }));
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <Heading
          title={`Inventory Records`}
          description="Here's a list of your inventories in your hotel!"
        />
        <Link
          href="/admin/inventory/new"
          className={buttonVariants({ size: "sm" })}
        >
          + Add Supply
        </Link>
      </div>
      <InventoryClient data={formattedCustomer} />
    </div>
  );
};

export default Inventory;
