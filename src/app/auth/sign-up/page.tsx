/* eslint-disable @typescript-eslint/no-explicit-any */
import EmailRegister from "@/components/forms/email-register";
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

const SignUp = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="grid gap-4 w-full mt-5">
        <EmailRegister />
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
                  <SignUpButtonIcon strategy={"oauth2:facebook"} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Facebook</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="w-full">
                  <SignUpButtonIcon strategy={"oauth2:google"} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Facebook</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="w-full">
                  <SignUpButtonIcon strategy={"oauth2:microsoft"} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Facebook</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link href="/auth/sign-in" className="underline">
          Sign in
        </Link>
      </div>
    </div>
  );
};

const SignUpButtonIcon = (props: { strategy: string }) => {
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

export default SignUp;
