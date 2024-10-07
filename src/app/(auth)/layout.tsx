
import Image from "next/image";
import React from "react";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full lg:grid min-h-screen lg:grid-cols-3">
      <div className="flex col-span-1 items-center justify-center py-12">
        <div className="mx-auto grid w-full md:px-14 px-5 gap-6">
          {children}
        </div>
      </div>
      <div className="hidden col-span-2 bg-muted lg:block">
        <Image
          src="/images/slider-2.png"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover brightness-[0.5]"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
