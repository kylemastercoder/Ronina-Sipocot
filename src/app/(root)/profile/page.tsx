
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import db from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import React from "react";
import ProfileForm from "@/components/forms/profile-form";
import { redirect } from "next/navigation";
import BreadcrumbBanner from "@/components/globals/bread-crumb-banner";

async function getData(userId: string) {
  const data = await db.user.findFirst({
    where: {
      id: userId,
    },
  });

  return data;
}

const Profile = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || !user?.id) {
    redirect("/");
  }
  const data = await getData(user?.id as string);
  if (!data) {
    redirect("/");
  }

  return (
    <>
    <BreadcrumbBanner image="contact.webp" title="Profile" />
    <div className="flex flex-col py-10 md:px-80 px-10">
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription>
              Please finish setting up your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileForm data={data} />
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  );
};

export default Profile;
