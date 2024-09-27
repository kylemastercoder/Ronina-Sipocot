/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createUser } from "@/actions/user";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const EmailRegister = (props: {
  emailConnectionId: string | undefined;
  orgCode?: string;
  teamId?: string;
}) => {
  const [email, setEmail] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [givenName, setGivenName] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleRegister = () => {
    startTransition(async () => {
      try {
        await createUser(email, familyName, givenName, props.orgCode ?? "");
        toast.success("Registration successful! You will be redirected to sign in page.");
        setTimeout(() => {
          router.push("/sign-in");
        }, 2000);
      } catch (error: any) {
        toast.error(
          error.message || "An unexpected error occurred. Please try again."
        );
      }
    });
  };
  return (
    <>
      <div className="grid w-full space-y-4">
        <div className="flex md:flex-row flex-col items-center w-full gap-4">
          <div className="w-full flex flex-col space-y-2">
            <Label htmlFor="givenName">First Name</Label>
            <Input
              id="givenName"
              type="text"
              placeholder="Juan"
              required
              disabled={isPending}
              value={givenName}
              onChange={(e) => setGivenName(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="w-full flex flex-col space-y-2">
            <Label htmlFor="familyName">Last Name</Label>
            <Input
              id="familyName"
              type="text"
              placeholder="Dela Cruz"
              required
              disabled={isPending}
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
        <div className="w-full flex flex-col space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="someone@example.com"
            required
            disabled={isPending}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <Button disabled={isPending} className="w-full" onClick={handleRegister}>
        {isPending && <Loader2 className="animate-spin w-4 h-4 mr-2" />}
        Create Account
      </Button>
    </>
  );
};

export default EmailRegister;
