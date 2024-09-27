"use client";

import Container from "@/components/globals/container";
import { Form } from "@/components/ui/form";
import { User } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Step2FormValidation } from "@/lib/validators";
import { parseAddress } from "@/lib/utils";
import CustomFormField from "@/components/globals/custom-form-field";
import { FormFieldType } from "@/constants";
import { useAddressData } from "@/lib/address-selection";
import { Button } from "@/components/ui/button";

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
  const { houseNumber, barangay, municipality, province, region } =
    parseAddress(userData?.address || "");

  // Check for localStorage data initially
  const savedData =
    typeof window !== "undefined" ? localStorage.getItem("step2Data") : null;

  const defaultValues = savedData
    ? JSON.parse(savedData)
    : {
        firstName: userData?.firstName || "",
        lastName: userData?.lastName || "",
        email: userData?.email || "",
        phoneNumber: userData?.phone || "",
        houseNumber: houseNumber || "",
        region: region || "",
        province: province || "",
        municipality: municipality || "",
        barangay: barangay || "",
      };
  const form = useForm<z.infer<typeof Step2FormValidation>>({
    resolver: zodResolver(Step2FormValidation),
    mode: "onChange",
    defaultValues,
  });

  const selectedRegionName = form.watch("region");
  const selectedProvinceName = form.watch("province");
  const selectedMunicipalityName = form.watch("municipality");

  const {
    regionOptions,
    provinceOptions,
    municipalityOptions,
    barangayOptions,
  } = useAddressData(
    selectedRegionName,
    selectedProvinceName,
    selectedMunicipalityName
  );

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
                disabled={isPending}
                name="firstName"
                label="First Name"
                isRequired={true}
                placeholder="Enter your first name"
              />
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.INPUT}
                type="text"
                disabled={isPending}
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
              disabled={isPending}
              name="email"
              label="Email Address"
              isRequired={true}
              placeholder="Enter your email address"
            />
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.PHONE_INPUT}
              name="phoneNumber"
              disabled={isPending}
              label="Phone Number"
              isRequired={true}
              placeholder="Enter your phone number"
            />
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name="houseNumber"
              disabled={isPending}
              label="House/Unit/Block No., Street, Subdivision/Village"
              isRequired={true}
              placeholder="Enter your complete home address"
            />
            <div className="grid grid-cols-2 gap-3">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.SELECT}
                name="region"
                label="Region"
                disabled={isPending}
                options={selectedRegionName ? regionOptions : []}
                isRequired={true}
                placeholder="Select your region"
              />
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.SELECT}
                name="province"
                label="Province"
                disabled={isPending}
                options={selectedProvinceName ? provinceOptions : []}
                isRequired={true}
                placeholder="Select your province"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.SELECT}
                name="municipality"
                disabled={isPending}
                label="Municipality"
                options={selectedMunicipalityName ? municipalityOptions : []}
                isRequired={true}
                placeholder="Select your municipality"
              />
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.SELECT}
                name="barangay"
                disabled={isPending}
                label="Barangay"
                options={selectedMunicipalityName ? barangayOptions : []}
                isRequired={true}
                placeholder="Select your barangay"
              />
            </div>
            <div className="flex items-center justify-end gap-3">
              <Button disabled={isPending} type="button" variant="outline" onClick={prevStep}>
                Go Back
              </Button>
              <Button disabled={isPending} type="submit">Continue</Button>
            </div>
          </form>
        </Form>
      </Container>
    </div>
  );
};

export default Step2;
