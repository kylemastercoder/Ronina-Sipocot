/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import db from "@/lib/db";
import { UpdateProfileValidation } from "@/lib/validators";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import axios from "axios";
import { z } from "zod";

export const createUser = async (
  email: string,
  familyName: string,
  givenName: string,
  orgCode: string
) => {
  try {
    const response = await axios.post(
      `${process.env.KINDE_ISSUER_URL}/api/v1/user`,
      {
        profile: {
          given_name: givenName,
          family_name: familyName,
        },
        organization_code: orgCode,
        identities: [
          {
            type: "email",
            details: {
              email: email,
            },
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${process.env.KINDE_ACCESS_TOKEN}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Error:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data?.message || "Registration failed. Please try again."
      );
    } else {
      console.log(error);
      throw new Error("An unexpected error occurred.");
    }
  }
};

export const updateProfile = async (
  values: z.infer<typeof UpdateProfileValidation>,
  id: string
) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return { error: "No user found!" };
  }

  const validatedField = UpdateProfileValidation.safeParse(values);

  if (!validatedField.success) {
    const errors = validatedField.error.errors.map((err) => err.message);
    return { error: `Validation Error: ${errors.join(", ")}` };
  }

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    dateOfBirth,
    gender,
    houseNumber,
    region,
    province,
    municipality,
    barangay,
  } = validatedField.data;

  const address =
    houseNumber +
    ", " +
    barangay +
    ", " +
    municipality +
    ", " +
    province +
    ", " +
    region;

  try {
    await db.user.update({
      data: {
        firstName,
        lastName,
        email,
        phone: phoneNumber,
        birthdate: dateOfBirth,
        address,
        sex: gender,
      },
      where: {
        id,
      },
    });

    return { success: "Profile updated successfully" };
  } catch (error: any) {
    return {
      error: `Failed to update profile. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

export const deleteUser = async (id: string) => {
  try {
    await db.user.delete({
      where: {
        id,
      },
    });

    return { success: "User deleted successfully" };
  } catch (error: any) {
    return {
      error: `Failed to delete user. Please try again. ${
        error.message || ""
      }`,
    };
  }
}
