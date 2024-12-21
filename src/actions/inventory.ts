/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import db from "@/lib/db";
import { InventoryFormValidation } from "@/lib/validators";
import { z } from "zod";

export const createInventory = async (
  values: z.infer<typeof InventoryFormValidation>
) => {
  const validatedField = InventoryFormValidation.safeParse(values);

  if (!validatedField.success) {
    const errors = validatedField.error.errors.map((err) => err.message);
    return { error: `Validation Error: ${errors.join(", ")}` };
  }

  const { name, type, stock, status } = validatedField.data;

  try {
    await db.inventory.create({
      data: {
        name,
        type,
        status,
        stock,
      },
    });

    return { success: "Inventory created successfully" };
  } catch (error: any) {
    return {
      error: `Failed to create inventory. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

export const updateInventory = async (
  inventoryId: string,
  values: z.infer<typeof InventoryFormValidation>
) => {
  const validatedField = InventoryFormValidation.safeParse(values);

  if (!validatedField.success) {
    const errors = validatedField.error.errors.map((err) => err.message);
    return { error: `Validation Error: ${errors.join(", ")}` };
  }

  const { name, type, stock, status } = validatedField.data;

  try {
    await db.inventory.update({
      where: {
        id: inventoryId,
      },
      data: {
        name,
        type,
        status,
        stock,
      },
    });

    return { success: "Inventory updated successfully" };
  } catch (error: any) {
    return {
      error: `Failed to update inventory. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

export const deleteInventory = async (inventoryId: string) => {
  try {
    await db.inventory.delete({
      where: {
        id: inventoryId,
      },
    });

    return { success: "Inventory deleted successfully" };
  } catch (error: any) {
    return {
      error: `Failed to delete inventory. Please try again. ${
        error.message || ""
      }`,
    };
  }
};
