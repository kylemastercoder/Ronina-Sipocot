/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import db from "@/lib/db";
import { UpdateProfileValidation, UserSchema } from "@/lib/validators";
import { z } from "zod";
import bcryptjs from "bcryptjs";

export const createUser = async (
  values: z.infer<typeof UserSchema>,
  clerkId: string
) => {
  const validatedField = UserSchema.safeParse(values);

  if (!validatedField.success) {
    const errors = validatedField.error.errors.map((err) => err.message);
    return { error: `Validation Error: ${errors.join(", ")}` };
  }

  const {
    firstName,
    lastName,
    email,
    password,
  } = validatedField.data;

  const hashedPassword = await bcryptjs.hash(password, 10);

  try {
    await db.user.create({
      data: {
        id: clerkId,
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });
    return { success: "User created successfully" };
  } catch (error: any) {
    return {
      error: `Failed to create user. Please try again. ${error.message || ""}`,
    };
  }
};

export const updateProfile = async (
  values: z.infer<typeof UpdateProfileValidation>,
  id: string
) => {

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
