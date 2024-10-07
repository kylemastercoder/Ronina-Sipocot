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

export const orderMenu = async (
  menuId: string,
  quantity: number,
  price: number,
  userId: string
) => {
  if (!menuId || !quantity || !userId) {
    return { error: "Menu ID, quantity, and user ID are required" };
  }

  try {
    const order = await db.orderFood.create({
      data: {
        quantity,
        price,
        foodId: menuId,
        userId,
      },
    });

    return { success: true, order };
  } catch (error) {
    console.error("Error placing order:", error);
    return {
      error:
        "An error occurred while placing the order. Please try again later.",
    };
  }
};

export const deleteOrderMenu = async (orderMenuId: string) => {
  try {
    await db.orderFood.delete({
      where: {
        id: orderMenuId,
      },
    });

    return { success: "Order menu deleted successfully" };
  } catch (error: any) {
    return {
      error: `Failed to delete order menu. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

export const approveOrderMenu = async (id: string, quantity: number) => {
  try {
    // Step 1: Approve the order menu and retrieve the foodId
    const orderMenu = await db.orderFood.update({
      where: {
        id: id,
      },
      data: {
        status: "Confirmed",
      },
    });

    // Step 2: Retrieve the current stock of the food item
    const foodItem = await db.food.findUnique({
      where: {
        id: orderMenu.foodId,
      },
    });

    if (!foodItem) {
      throw new Error("Food item not found.");
    }

    // Step 3: Deduct the quantity from the current stock
    const updatedStock = foodItem.stock - quantity;

    // Step 4: Ensure stock doesn't go negative
    if (updatedStock < 0) {
      throw new Error("Insufficient stock to approve this order.");
    }

    // Step 5: Update the stock in the database
    await db.food.update({
      where: {
        id: orderMenu.foodId,
      },
      data: {
        stock: updatedStock,
      },
    });

    return {
      success: "Order menu approved successfully!",
      orderMenu,
    };
  } catch (error: any) {
    return {
      error: `Failed to approve order menu. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

export const declineOrderMenu = async (id: string) => {
  try {
    const orderMenu = await db.orderFood.update({
      where: {
        id: id,
      },
      data: {
        status: "Declined",
      },
    });

    return {
      success: "Order menu declined successfully!",
      orderMenu,
    };
  } catch (error: any) {
    return {
      error: `Failed to decline order menu. Please try again. ${
        error.message || ""
      }`,
    };
  }
};
