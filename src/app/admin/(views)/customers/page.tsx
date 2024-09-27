
import Heading from "@/components/globals/heading";
import db from "@/lib/db";
import React from "react";
import { format } from "date-fns";
import { ClientColumn } from "./components/column";
import CustomerClient from "./components/client";

const Customers = async () => {
  const customers = await db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCustomer: ClientColumn[] = customers.map((item) => ({
    id: item.id,
    name: item.firstName + " " + item.lastName,
    email: item.email,
    imageUrl: item.imageUrl ?? "",
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
    address: item.address ?? "--",
    phoneNumber: item.phone ?? "--",
    gender: item.sex ?? "--",
  }));
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <Heading
          title={`Customer Records`}
          description="Here's a list of your customers in your hotel!"
        />
      </div>
      <CustomerClient data={formattedCustomer} />
    </div>
  );
};

export default Customers;
