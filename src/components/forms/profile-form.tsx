/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CustomFormField from "@/components/globals/custom-form-field";
import { User } from "@prisma/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UpdateProfileValidation } from "@/lib/validators";
import { FormFieldType } from "@/constants";
import { Form } from "@/components/ui/form";
import { useAddressData } from "@/lib/address-selection";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateProfile } from "@/actions/user";
import { Loader2 } from "lucide-react";
import { parseAddress } from "@/lib/utils";

const ProfileForm = ({ data }: { data: User }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const addressComponents = parseAddress(data.address ?? "");

  const form = useForm<z.infer<typeof UpdateProfileValidation>>({
    resolver: zodResolver(UpdateProfileValidation),
    defaultValues: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phone ?? "",
      dateOfBirth: data.birthdate ?? "",
      gender: data.sex ?? "",
      houseNumber: addressComponents.houseNumber ?? "",
      region: addressComponents.region ?? "",
      province: addressComponents.province ?? "",
      municipality: addressComponents.municipality ?? "",
      barangay: addressComponents.barangay ?? "",
    },
  });

  function onSubmit(values: z.infer<typeof UpdateProfileValidation>) {
    setIsLoading(true);
    updateProfile(values, data.id)
      .then((data) => {
        if (data?.success) {
          toast.success(data.success);
          router.refresh();
        } else {
          toast.error(data.error);
        }
      })
      .catch((error: any) => {
        toast.error(`An unexpected error occurred: ${error.message}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-5 gap-3">
          <div className="flex flex-col space-y-3">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
              <CustomFormField
                label="First Name"
                name="firstName"
                placeholder="Juan"
                isRequired
                type="text"
                fieldType={FormFieldType.INPUT}
                control={form.control}
                disabled={isLoading}
              />
              <CustomFormField
                label="Last Name"
                name="lastName"
                placeholder="Dela Cruz"
                isRequired
                type="text"
                fieldType={FormFieldType.INPUT}
                control={form.control}
                disabled={isLoading}
              />
            </div>
            <CustomFormField
              label="Email Address"
              name="email"
              placeholder="someone@example.com"
              isRequired
              type="email"
              fieldType={FormFieldType.INPUT}
              control={form.control}
              disabled
            />
            <CustomFormField
              label="Phone Number"
              name="phoneNumber"
              type="phone"
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              disabled={isLoading}
              isRequired
            />
            <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
              <CustomFormField
                label="Date of Birth"
                name="dateOfBirth"
                placeholder="dd/mm/yyyy"
                isRequired
                type="date"
                fieldType={FormFieldType.DATE_PICKER}
                control={form.control}
                disabled={isLoading}
              />
              <CustomFormField
                label="Gender"
                name="gender"
                placeholder="Select your gender"
                isRequired
                fieldType={FormFieldType.SELECT}
                control={form.control}
                options={["Male", "Female"]}
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <CustomFormField
              label="House/Unit/Block No., Street, Subdivision/Village"
              name="houseNumber"
              placeholder="Blk 1 Lot 2 Phase 3"
              isRequired
              fieldType={FormFieldType.INPUT}
              type="text"
              control={form.control}
              disabled={isLoading}
            />
            <CustomFormField
              label="Region"
              name="region"
              placeholder="Select your region"
              isRequired
              fieldType={FormFieldType.SELECT}
              control={form.control}
              options={regionOptions}
              disabled={isLoading}
            />
            <CustomFormField
              label="Province"
              name="province"
              placeholder="Select your province"
              isRequired
              fieldType={FormFieldType.SELECT}
              control={form.control}
              options={provinceOptions}
              disabled={isLoading}
            />
            <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
              <CustomFormField
                label="Municipality"
                name="municipality"
                placeholder="Select your municipality"
                isRequired
                fieldType={FormFieldType.SELECT}
                control={form.control}
                options={municipalityOptions}
                disabled={isLoading}
              />
              <CustomFormField
                label="Barangay"
                name="barangay"
                placeholder="Select your barangay"
                isRequired
                fieldType={FormFieldType.SELECT}
                control={form.control}
                options={barangayOptions}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end mt-5">
          <div className="space-x-3">
            <Button
              type="button"
              onClick={() => router.push("/")}
              variant="outline"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
              Save Changes
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
