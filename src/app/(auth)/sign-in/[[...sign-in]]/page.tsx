/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import EmailLogin from "@/components/forms/email-login";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";

const SignInPage = () => {
  return (
    <SignIn.Root>
      <div className="flex flex-col w-full">
        <h2 className="md:text-4xl text-2xl font-bold">Sign In</h2>
        <p className="text-muted-foreground text-sm">
          Enter all the informations associated with your registered account.
        </p>
        <div className="grid gap-4 w-full mt-5">
          <EmailLogin />
          <div className="flex items-center gap-4 justify-center">
            <div className="flex-1 border-t border-gray-500"></div>
            <span>Or continue with</span>
            <div className="flex-1 border-t border-gray-500"></div>
          </div>
          <div className="flex items-center gap-2 w-full">
            <Clerk.Connection name="google" className="w-full" asChild>
              <Button variant="outline" type="button">
                <Image
                  src="/icons/google.png"
                  alt="Google"
                  width="20"
                  height="20"
                  className="mr-2"
                />
                Google
              </Button>
            </Clerk.Connection>
            <Clerk.Connection name="facebook" className="w-full" asChild>
              <Button variant="outline" type="button">
                <Image
                  src="/icons/fb.png"
                  alt="Facebook"
                  width="20"
                  height="20"
                  className="mr-2"
                />
                Facebook
              </Button>
            </Clerk.Connection>
          </div>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="underline">
            Sign up
          </Link>
        </div>
      </div>
    </SignIn.Root>
  );
};

export default SignInPage;
