/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useSignIn } from "@clerk/nextjs";
import { UserLoginSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Form } from "../ui/form";
import CustomFormField from "../globals/custom-form-field";
import { FormFieldType } from "@/constants";
import { Loader2 } from "lucide-react";

const EmailLogin = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof UserLoginSchema>>({
    resolver: zodResolver(UserLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Submit login data
  const onSubmit = async (values: z.infer<typeof UserLoginSchema>) => {
    if (!isLoaded) return;

    try {
      setIsPending(true);
      const signInAttempt = await signIn.create({
        identifier: values.email,
        password: values.password,
      });

      // If sign-in process is complete, set the created session as active and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.push("/");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (error: any) {
      console.error(JSON.stringify(error, null, 2));
      toast.error(
        error.message || "No user found with the provided credentials."
      );
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="grid gap-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3">
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
            {isPending && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EmailLogin;
