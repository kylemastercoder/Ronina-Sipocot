/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { createUser } from "@/actions/user";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { EmailVerificationSchema, UserSchema } from "@/lib/validators";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUp } from "@clerk/nextjs";
import { z } from "zod";
import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";
import { maskEmail } from "@/lib/utils";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { Form } from "../ui/form";
import CustomFormField from "../globals/custom-form-field";
import { FormFieldType } from "@/constants";

const EmailRegister = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [isPending, setIsPending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState("");
  const router = useRouter();

  // User registration form
  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  // Email verification form (OTP)
  const form2 = useForm<z.infer<typeof EmailVerificationSchema>>({
    resolver: zodResolver(EmailVerificationSchema),
    defaultValues: {
      otpCode: "",
    },
  });

  // Submit registration data
  const onSubmit = async (values: z.infer<typeof UserSchema>) => {
    if (!isLoaded) return;
    try {
      setIsPending(true);
      await signUp.create({
        emailAddress: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
      });

      // Send OTP to email
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Transition to verification step
      setVerifying(true);
    } catch (error: any) {
      console.error(JSON.stringify(error, null, 2));
      toast.error(error.message || "Failed to sign up.");
    } finally {
      setIsPending(false);
    }
  };

  // Handle OTP verification and user creation in the database
  const onVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      setIsPending(true);

      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });

        // Capture form data and insert into the database
        const registrationData = form.getValues(); // Get values from the first form
        await createUser(
          registrationData,
          completeSignUp.createdUserId ?? ""
        ).then((data) => {
          if (data.error) {
            toast.error(data.error);
          } else {
            toast.success(data.success);
            router.push("/");
          }
        });
      } else {
        toast.error("Failed to verify OTP. Please try again.");
      }
    } catch (err: any) {
      console.error("Error:", JSON.stringify(err, null, 2));
      toast.error(err.message || "Failed to verify OTP.");
    } finally {
      setIsPending(false);
    }
  };

  if (verifying) {
    return (
      <div className="w-full grid gap-6">
        <div className="grid gap-2">
          <h1 className="text-3xl font-bold">Enter The OTP Code</h1>
          <p className="text-balance text-muted-foreground">
            Enter the OTP code that we sent to your email <br />
            <span className="font-bold text-green-400">
              {maskEmail(form.watch("email"))}
            </span>{" "}
            and be careful not to share the code with anyone.
          </p>
        </div>
        <form
          onSubmit={onVerify}
          className="flex items-center justify-center flex-col"
        >
          <InputOTP
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            className="shad-otp"
            value={code}
            onChange={(text) => setCode(text)}
          >
            <InputOTPSlot index={0} className="shad-otp-slot" />
            <InputOTPSlot index={1} className="shad-otp-slot" />
            <InputOTPSlot index={2} className="shad-otp-slot" />
            <InputOTPSlot index={3} className="shad-otp-slot" />
            <InputOTPSlot index={4} className="shad-otp-slot" />
            <InputOTPSlot index={5} className="shad-otp-slot" />
          </InputOTP>
          <Button className="mt-5 w-full" disabled={isPending}>
            {isPending && <Loader2 className="animate-spin w-4 h-4 mr-2" />}
            Continue
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full grid gap-6">
      <div className="grid gap-2">
        <h1 className="text-3xl font-bold">Create Account</h1>
        <p className="text-balance text-muted-foreground">
          Enter your information below to create an account
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
            <CustomFormField
              control={form.control}
              name="firstName"
              placeholder="Juan"
              disabled={isPending}
              isRequired
              label="First Name"
              fieldType={FormFieldType.INPUT}
            />
            <CustomFormField
              control={form.control}
              name="lastName"
              placeholder="Dela Cruz"
              disabled={isPending}
              isRequired
              label="Last Name"
              fieldType={FormFieldType.INPUT}
            />
          </div>
          <div className="grid gap-2">
            <CustomFormField
              control={form.control}
              name="email"
              placeholder="jdelacruz@gmail.com"
              disabled={isPending}
              isRequired
              label="Email Address"
              fieldType={FormFieldType.INPUT}
            />
          </div>
          <div className="grid gap-2">
            <CustomFormField
              control={form.control}
              name="password"
              placeholder="********"
              disabled={isPending}
              isRequired
              type="password"
              label="Password"
              fieldType={FormFieldType.INPUT}
            />
          </div>
          <Button disabled={isPending}>
            {isPending && <Loader2 className="animate-spin w-4 h-4 mr-2" />}
            Sign Up
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EmailRegister;
