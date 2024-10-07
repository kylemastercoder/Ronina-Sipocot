/* eslint-disable @typescript-eslint/no-explicit-any */
import EmailRegister from "@/components/forms/email-register";
import React from "react";
import Link from "next/link";

const SignUp = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="grid gap-4 w-full mt-5">
        <EmailRegister />
      </div>
      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link href="/sign-in" className="underline">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
