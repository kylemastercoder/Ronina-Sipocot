/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import db from "@/lib/db";
import { RoomFormValidation } from "@/lib/validators";
import { z } from "zod";

export const getAllRooms = async () => {
  try {
    const rooms = await db.rooms.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        amenities: true,
        features: true,
      },
    });

    return { success: "Rooms displayed successfully!", rooms };
  } catch (error: any) {
    return {
      error: `Failed to display room. Please try again. ${error.message || ""}`,
    };
  }
};

export const getAllRoomsWithoutFeatures = async () => {
  try {
    const rooms = await db.rooms.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: "Rooms displayed successfully!", rooms };
  } catch (error: any) {
    return {
      error: `Failed to display room. Please try again. ${error.message || ""}`,
    };
  }
};

export const getFeaturedRooms = async () => {
  try {
    const rooms = await db.rooms.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        isFeatured: true,
      },
      include: {
        amenities: true,
        features: true,
      },
    });

    return { success: "Rooms displayed successfully!", rooms };
  } catch (error: any) {
    return {
      error: `Failed to display room. Please try again. ${error.message || ""}`,
    };
  }
};

export const createAmenities = async (amenity: string) => {
  if (!amenity) {
    return { error: "Amenity is required" };
  }

  try {
    await db.amenities.create({
      data: {
        name: amenity,
      },
    });

    return { success: "Amenity created successfully" };
  } catch (error: any) {
    return {
      error: `Failed to create amenity. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

export const createRoom = async (
  values: z.infer<typeof RoomFormValidation>
) => {
  const validatedField = RoomFormValidation.safeParse(values);

  if (!validatedField.success) {
    const errors = validatedField.error.errors.map((err) => err.message);
    return { error: `Validation Error: ${errors.join(", ")}` };
  }

  const {
    name,
    description = "",
    type,
    status,
    imagesUrl,
    amenities,
    features,
    isFeatured,
  } = validatedField.data;

  try {
    const room = await db.rooms.create({
      data: {
        name,
        description,
        type,
        status,
        imagesUrl,
        isFeatured,
        amenities: {
          connectOrCreate: amenities.map((amenity) => ({
            where: { id: amenity },
            create: { name: amenity },
          })),
        },
        features: {
          create: features.map((feature) => ({
            numberOfPerson: feature.numberOfPerson,
            price: feature.price,
          })),
        },
      },
    });

    return { success: "Room created successfully", room };
  } catch (error: any) {
    return {
      error: `Failed to create room. Please try again. ${error.message || ""}`,
    };
  }
};

export const updateRoom = async (
  roomId: string,
  values: z.infer<typeof RoomFormValidation>
) => {
  const validatedField = RoomFormValidation.safeParse(values);

  if (!validatedField.success) {
    const errors = validatedField.error.errors.map((err) => err.message);
    return { error: `Validation Error: ${errors.join(", ")}` };
  }

  const {
    name,
    description = "",
    type,
    status,
    imagesUrl,
    amenities,
    features,
    isFeatured
  } = validatedField.data;

  try {
    const room = await db.rooms.update({
      where: {
        id: roomId,
      },
      data: {
        name,
        description,
        type,
        status,
        imagesUrl,
        isFeatured,
        amenities: {
          connectOrCreate: amenities.map((amenity) => ({
            where: { id: amenity },
            create: { name: amenity },
          })),
        },
        features: {
          create: features.map((feature) => ({
            numberOfPerson: feature.numberOfPerson,
            price: feature.price,
          })),
        },
      },
    });

    return { success: "Room updated successfully", room };
  } catch (error: any) {
    return {
      error: `Failed to update room. Please try again. ${error.message || ""}`,
    };
  }
};

export const deleteRoom = async (roomId: string) => {
  try {
    await db.roomFeature.deleteMany({
      where: {
        roomId,
      },
    });

    await db.employeeSchedule.deleteMany({
      where: {
        roomId,
      },
    });

    await db.rooms.delete({
      where: {
        id: roomId,
      },
    });

    return { success: "Room deleted successfully" };
  } catch (error: any) {
    return {
      error: `Failed to delete room. Please try again. ${error.message || ""}`,
    };
  }
};
