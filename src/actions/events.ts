/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import db from "@/lib/db";
import { EventFormValidation } from "@/lib/validators";
import { z } from "zod";

export const getAllEvents = async () => {
  try {
    const events = await db.events.findMany({
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

    return { success: "Events displayed successfully!", events };
  } catch (error: any) {
    return {
      error: `Failed to display events. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

export const getEventAppointment = async () => {
  try {
    const eventAppointment = await db.eventAppointments.findMany({
      include: {
        user: true,
        event: true,
      },
    });

    return {
      success: "Event appointments displayed successfully!",
      eventAppointment,
    };
  } catch (error: any) {
    return {
      error: `Failed to display event appointments. Please try again. ${
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
    await db.eventsInclusions.create({
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

export const createEvent = async (values: z.infer<typeof EventFormValidation>) => {
  const validatedField = EventFormValidation.safeParse(values);

  if (!validatedField.success) {
    const errors = validatedField.error.errors.map((err) => err.message);
    return { error: `Validation Error: ${errors.join(", ")}` };
  }

  const {
    name,
    type,
    status,
    menus,
    inclusions,
    features,
    addons = []
  } = validatedField.data;

  try {
    await db.events.create({
      data: {
        name,
        type,
        status,
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
        }
      },
    });

    return { success: "Event created successfully" };
  } catch (error: any) {
    return {
      error: `Failed to create event. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

export const updateEvent = async (eventId: string, values: z.infer<typeof EventFormValidation>) => {
  const validatedField = EventFormValidation.safeParse(values);

  if (!validatedField.success) {
    const errors = validatedField.error.errors.map((err) => err.message);
    return { error: `Validation Error: ${errors.join(", ")}` };
  }

  const {
    name,
    type,
    status,
    menus,
    inclusions,
    features,
    addons = []
  } = validatedField.data;

  try {
    await db.events.update({
      where: {
        id: eventId,
      },
      data: {
        name,
        type,
        status,
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
        }
      },
    });

    return { success: "Event updated successfully" };
  } catch (error: any) {
    return {
      error: `Failed to update event. Please try again. ${
        error.message || ""
      }`,
    };
  }
}

export const deleteEvent = async (eventId: string) => {
  try {
    await db.events.delete({
      where: {
        id: eventId,
      },
    });

    return { success: "Event deleted successfully" };
  } catch (error: any) {
    return {
      error: `Failed to delete event. Please try again. ${
        error.message || ""
      }`,
    };
  }
}
