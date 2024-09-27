/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import db from "@/lib/db";

export const getRoomAppointment = async () => {
  try {
    const roomAppointment = await db.roomAppointments.findMany({
      include: {
        user: true,
        room: true,
      },
    });

    return {
      success: "Room appointments displayed successfully!",
      roomAppointment,
    };
  } catch (error: any) {
    return {
      error: `Failed to display room appointments. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

export const createRoomAppointment = async (
  checkIn: string,
  checkOut: string,
  guest: string,
  userId: string,
  roomId: string,
  price: string,
) => {
  if (!checkIn || !checkOut || !guest || !userId || !roomId || !price) {
    return {
      error: "All fields are required!",
    };
  }

  try {
    const roomAppointment = await db.roomAppointments.create({
      data: {
        checkIn: checkIn,
        checkOut: checkOut,
        guest: guest,
        userId: userId,
        roomId: roomId,
        price: parseFloat(price),
      },
    });

    return {
      success: "Room appointment created successfully!",
      roomAppointment,
    };
  } catch (error: any) {
    return {
      error: `Failed to create room appointment. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

export const approveAppointment = async (id: string) => {
  try {
    const roomAppointment = await db.roomAppointments.update({
      where: {
        id: id,
      },
      data: {
        status: "Confirmed",
      },
    });

    const room = await db.rooms.update({
      where: {
        id: roomAppointment.roomId,
      },
      data: {
        status: "Not Available"
      }
    });

    return {
      success: "Appointment approved successfully!",
      roomAppointment,
    };
  } catch (error: any) {
    return {
      error: `Failed to approve appointment. Please try again. ${
        error.message || ""
      }`,
    };
  }
}

export const declineAppointment = async (id: string) => {
  try {
    const roomAppointment = await db.roomAppointments.update({
      where: {
        id: id,
      },
      data: {
        status: "Declined",
      },
    });

    return {
      success: "Appointment declined successfully!",
      roomAppointment,
    };
  } catch (error: any) {
    return {
      error: `Failed to decline appointment. Please try again. ${
        error.message || ""
      }`,
    };
  }
}
