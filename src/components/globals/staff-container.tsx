import db from "@/lib/db";
import Image from "next/image";
import React from "react";

const StaffContainer = async () => {
  const staff = await db.employees.findMany();
  return (
    <div className="mt-10 grid md:grid-cols-4 grid-cols-1">
      {staff.map((employee) => (
        <div key={employee.id} className="flex flex-col relative items-center">
          <div className="relative w-[350px] h-[400px]">
            <Image
              className="rounded-md w-full h-full object-cover"
              src={employee.imageUrl}
              alt={employee.firstName + " " + employee.lastName}
              fill
            />
            <div className="absolute w-full bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent"></div>
          </div>
          <div className="absolute bottom-5">
            <p className="mt-3 font-bold">
              {employee.firstName + " " + employee.lastName}
            </p>
            <p className="text-sm text-center text-muted-foreground">
              {employee.position}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StaffContainer;
