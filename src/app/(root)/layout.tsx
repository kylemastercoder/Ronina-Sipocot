import Footer from "@/components/homepage/footer";
import Navbar from "@/components/homepage/navbar";
import db from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";

async function getData(userId: string) {
  const data = await db.user.findFirst({
    where: {
      id: userId,
    },
  });

  return data;
}

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  let fullname = "";
  let email = "";
  let userId: string | undefined = undefined;

  if (user && user.id) {
    const data = await getData(user.id as string);

    if (!data) {
      await db.user.create({
        data: {
          id: user.id,
          email: user.email!,
          firstName: user.given_name!,
          lastName: user.family_name!,
        },
      });
    } else {
      fullname = data.firstName + " " + data.lastName;
      email = data.email;
      userId = user.id; // Assign the user ID to a variable
    }
  }

  return (
    <div className="w-full h-screen overflow-x-hidden">
      {/* Only pass userId if it exists */}
      <Navbar fullName={fullname} email={email} id={userId} />
      {children}
      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default RootLayout;
