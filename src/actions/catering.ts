/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import db from "@/lib/db";
import { CateringFormValidation } from "@/lib/validators";
import { z } from "zod";

export const getAllCaterings = async () => {
  try {
    const caterings = await db.catering.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        features: true,
        menus: true,
        inclusions: true,
        addons: true,
      },
    });

    return { success: "Caterings displayed successfully!", caterings };
  } catch (error: any) {
    return {
      error: `Failed to display catering. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

export const getCateringAppointment = async () => {
  try {
    const cateringAppointment = await db.cateringAppointments.findMany({
      include: {
        user: true,
        catering: true,
      },
    });

    return {
      success: "Catering appointments displayed successfully!",
      cateringAppointment,
    };
  } catch (error: any) {
    return {
      error: `Failed to display catering appointments. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

export const createInclusions = async (inclusion: string) => {
  if (!inclusion) {
    return { error: "Inclusion is required" };
  }

  try {
    await db.inclusions.create({
      data: {
        name: inclusion,
      },
    });

    return { success: "Inclusion created successfully" };
  } catch (error: any) {
    return {
      error: `Failed to create inclusion. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

export const createCatering = async (
  values: z.infer<typeof CateringFormValidation>
) => {
  const validatedField = CateringFormValidation.safeParse(values);

  if (!validatedField.success) {
    const errors = validatedField.error.errors.map((err) => err.message);
    return { error: `Validation Error: ${errors.join(", ")}` };
  }

  const {
    name,
    type,
    stock,
    menus,
    inclusions,
    features,
    addons = [],
  } = validatedField.data;

  try {
    await db.catering.create({
      data: {
        name,
        type,
        stock,
        inclusions: {
          connectOrCreate: inclusions.map((inclusion) => ({
            where: { id: inclusion },
            create: { name: inclusion },
          })),
        },
        addons: {
          create: addons.map((addon) => ({
            name: addon.addOnName,
            price: addon.price,
          })),
        },
        features: {
          create: features.map((feature) => ({
            numberOfPerson: feature.numberOfPerson,
            price: feature.price,
          })),
        },
        menus: {
          connect: menus.map((menu) => ({ id: menu })),
        },
      },
    });

    return { success: "Catering created successfully" };
  } catch (error: any) {
    return {
      error: `Failed to create catering. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

export const updateCatering = async (
  cateringId: string,
  values: z.infer<typeof CateringFormValidation>
) => {
  const validatedField = CateringFormValidation.safeParse(values);

  if (!validatedField.success) {
    const errors = validatedField.error.errors.map((err) => err.message);
    return { error: `Validation Error: ${errors.join(", ")}` };
  }

  const {
    name,
    type,
    stock,
    menus,
    inclusions,
    features,
    addons = [],
  } = validatedField.data;

  try {
    await db.catering.update({
      where: { id: cateringId },
      data: {
        name,
        type,
        stock,
        inclusions: {
          connectOrCreate: inclusions.map((inclusion) => ({
            where: { id: inclusion },
            create: { name: inclusion },
          })),
        },
        addons: {
          create: addons.map((addon) => ({
            name: addon.addOnName,
            price: addon.price,
          })),
        },
        features: {
          create: features.map((feature) => ({
            numberOfPerson: feature.numberOfPerson,
            price: feature.price,
          })),
        },
        menus: {
          connect: menus.map((menu) => ({ id: menu })),
        },
      },
    });

    return { success: "Catering updated successfully" };
  } catch (error: any) {
    return {
      error: `Failed to update catering. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

export const deleteCatering = async (cateringId: string) => {
  if (!cateringId) {
    return { error: "Catering ID is required" };
  }

  try {
    await db.catering.delete({
      where: { id: cateringId },
    });

    return { success: "Catering deleted successfully" };
  } catch (error: any) {
    return {
      error: `Failed to delete catering. Please try again. ${
        error.message || ""
      }`,
    };
  }
};
