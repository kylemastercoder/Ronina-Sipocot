"use client";

import Container from "@/components/globals/container";
import { Form } from "@/components/ui/form";
import { User } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Step2FormValidation } from "@/lib/validators";
import CustomFormField from "@/components/globals/custom-form-field";
import { FormFieldType } from "@/constants";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Step2 = ({
  nextStep,
  prevStep,
  userData,
}: {
  nextStep: () => void;
  prevStep: () => void;
  userData: User | null;
}) => {
  const [isPending, setIsPending] = useState(false);
  console.log("userData", userData);

  // Check for localStorage data initially
  const savedData =
    typeof window !== "undefined" ? localStorage.getItem("step2Data") : null;

  const defaultValues = {
    firstName: userData?.firstName || "",
    lastName: userData?.lastName || "",
    email: userData?.email || "",
    phone: userData?.phone || "",
    address: userData?.address || "",
  };

  const form = useForm<z.infer<typeof Step2FormValidation>>({
    resolver: zodResolver(Step2FormValidation),
    mode: "onChange",
    defaultValues,
  });

  useEffect(() => {
    if (savedData) {
      form.reset(JSON.parse(savedData));
    }
  }, [savedData, form.reset, form]);

  useEffect(() => {
    const subscription = form.watch((value) => {
      localStorage.setItem("step2Data", JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [form, form.watch]);

  function onSubmit(values: z.infer<typeof Step2FormValidation>) {
    setIsPending(true);
    try {
      localStorage.setItem("step2Data", JSON.stringify(values));
      nextStep();
    } finally {
      setIsPending(false);
    }
  }
  return (
    <div className="mt-20 w-full">
      <Container>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.INPUT}
                type="text"
                disabled
                name="firstName"
                label="First Name"
                isRequired={true}
                placeholder="Enter your first name"
              />
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.INPUT}
                type="text"
                disabled
                name="lastName"
                label="Last Name"
                isRequired={true}
                placeholder="Enter your last name"
              />
            </div>
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              type="email"
              disabled
              name="email"
              label="Email Address"
              isRequired={true}
              placeholder="Enter your email address"
            />
            {!userData?.address || !userData?.phone ? (
              <div className="flex items-center gap-1">
                <div className="text-md text-gray-500">
                  Please provide your{" "}
                  <Link
                    href="/profile"
                    className="text-md underline text-orange-600"
                  >
                    complete address and phone number
                  </Link>{" "}
                  for delivery to proceed.
                </div>
              </div>
            ) : (
              <>
                <CustomFormField
                  control={form.control}
                  fieldType={FormFieldType.PHONE_INPUT}
                  name="phone"
                  disabled
                  label="Phone Number"
                  isRequired={true}
                  placeholder="Enter your phone number"
                />
                <CustomFormField
                  control={form.control}
                  fieldType={FormFieldType.INPUT}
                  name="address"
                  disabled
                  label="Complete Address"
                  isRequired={true}
                  placeholder="Enter your complete home address"
                />
              </>
            )}

            <div className="flex items-center justify-end gap-3">
              <Button
                disabled={isPending}
                type="button"
                variant="outline"
                onClick={prevStep}
              >
                Go Back
              </Button>
              <Button
                disabled={isPending || !userData?.address || !userData?.phone}
                type="submit"
              >
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </Container>
    </div>
  );
};

export default Step2;
