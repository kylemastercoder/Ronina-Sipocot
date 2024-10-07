
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import db from "@/lib/db";

import React from "react";
import ProfileForm from "@/components/forms/profile-form";
import BreadcrumbBanner from "@/components/globals/bread-crumb-banner";
import { auth } from "@clerk/nextjs/server";

const Profile = async () => {
  const {userId} = auth();
  const data = await db.user.findFirst({
    where: {
      id: userId as string,
    },
  });
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
            {data ? <ProfileForm data={data} /> : <p>Loading...</p>}
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  );
};

export default Profile;
