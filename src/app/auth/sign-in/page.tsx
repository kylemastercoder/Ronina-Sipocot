/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import EmailLogin from "@/components/forms/email-login";

const SignIn = () => {
  return (
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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="w-full">
                  <SignInButtonIcon strategy={"oauth2:facebook"} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Facebook</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="w-full">
                  <SignInButtonIcon strategy={"oauth2:google"} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Facebook</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="w-full">
                  <SignInButtonIcon strategy={"oauth2:microsoft"} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Facebook</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/auth/sign-up" className="underline">
          Sign up
        </Link>
      </div>
    </div>
  );
};

const SignInButtonIcon = (props: { strategy: string }) => {
  switch (props.strategy) {
    case "oauth2:facebook":
      return (
        <div className="flex items-center gap-x-2">
          <Image src="/icons/fb.png" alt="Facebook" width="20" height="20" />
        </div>
      );
    case "oauth2:google":
      return (
        <div className="flex items-center gap-x-2">
          <Image src="/icons/google.png" alt="Google" width="20" height="20" />
        </div>
      );
    case "oauth2:microsoft":
      return (
        <div className="flex items-center gap-x-2">
          <Image
            src="/icons/microsoft.png"
            alt="Microsoft"
            width="20"
            height="20"
          />
        </div>
      );
    default:
      return null;
  }
};

export default SignIn;
