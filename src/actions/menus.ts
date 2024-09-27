/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import db from "@/lib/db";
import { MenuFormValidation } from "@/lib/validators";
import { z } from "zod";

export const getAllMenus = async () => {
  try {
    const menus = await db.food.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: "Menus displayed successfully!", menus };
  } catch (error: any) {
    return {
      error: `Failed to display menu. Please try again. ${error.message || ""}`,
    };
  }
};

export const createMenus = async (
  values: z.infer<typeof MenuFormValidation>
) => {
  const validatedField = MenuFormValidation.safeParse(values);

  if (!validatedField.success) {
    const errors = validatedField.error.errors.map((err) => err.message);
    return { error: `Validation Error: ${errors.join(", ")}` };
  }

  const {
    name,
    description = "",
    type,
    price,
    imagesUrl,
    stock,
  } = validatedField.data;

  try {
    await db.food.create({
      data: {
        name,
        description,
        type,
        price,
        imagesUrl,
        stock,
      },
    });

    return { success: "Menu created successfully" };
  } catch (error: any) {
    return {
      error: `Failed to create menu. Please try again. ${error.message || ""}`,
    };
  }
};

export const updateMenus = async (
  menuId: string,
  values: z.infer<typeof MenuFormValidation>
) => {
  const validatedField = MenuFormValidation.safeParse(values);

  if (!validatedField.success) {
    const errors = validatedField.error.errors.map((err) => err.message);
    return { error: `Validation Error: ${errors.join(", ")}` };
  }

  const {
    name,
    description = "",
    type,
    price,
    imagesUrl,
    stock,
  } = validatedField.data;

  try {
    await db.food.update({
      where: {
        id: menuId,
      },
      data: {
        name,
        description,
        type,
        price,
        imagesUrl,
        stock,
      },
    });

    return { success: "Menu updated successfully" };
  } catch (error: any) {
    return {
      error: `Failed to update menu. Please try again. ${error.message || ""}`,
    };
  }
};

export const deleteMenus = async (menuId: string) => {
  try {
    await db.food.delete({
      where: {
        id: menuId,
      },
    });

    return { success: "Menu deleted successfully" };
  } catch (error: any) {
    return {
      error: `Failed to delete menu. Please try again. ${error.message || ""}`,
    };
  }
};
