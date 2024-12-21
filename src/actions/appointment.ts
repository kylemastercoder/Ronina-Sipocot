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

export const getRoomAppointmentComplete = async () => {
  try {
    const roomAppointment = await db.roomAppointments.findMany({
      include: {
        user: true,
        room: true,
      },
      where: {
        status: "Confirmed",
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
  paymentMethod: string,
  paymentNumber: string
) => {
  if (
    !checkIn ||
    !checkOut ||
    !guest ||
    !userId ||
    !roomId ||
    !price ||
    !paymentMethod ||
    !paymentNumber
  ) {
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
        paymentMethod: paymentMethod,
        proofOfPayment: paymentNumber,
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

export const createCateringAppointment = async (
  checkIn: string,
  checkOut: string,
  guest: string,
  userId: string,
  cateringId: string,
  price: string,
  paymentMethod: string,
  paymentNumber: string
) => {

  console.log("user", userId);
  try {
    const cateringAppointment = await db.cateringAppointments.create({
      data: {
        checkIn: checkIn,
        checkOut: checkOut,
        guest: guest,
        userId: userId,
        cateringId: cateringId,
        price: parseFloat(price),
        paymentMethod: paymentMethod,
        proofOfPayment: paymentNumber,
      },
    });

    return {
      success: "Catering appointment created successfully!",
      cateringAppointment,
    };
  } catch (error: any) {
    console.error("Error creating catering appointment:", error);
    return {
      error: `Failed to create catering appointment. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

export const createEventAppointment = async (
  checkIn: string,
  checkOut: string,
  guest: string,
  userId: string,
  eventId: string,
  price: string,
  paymentMethod: string,
  paymentNumber: string
) => {

  console.log("user", userId);
  try {
    const eventAppointment = await db.eventAppointments.create({
      data: {
        checkIn: checkIn,
        checkOut: checkOut,
        guest: guest,
        userId: userId,
        eventId: eventId,
        price: parseFloat(price),
        paymentMethod: paymentMethod,
        proofOfPayment: paymentNumber,
      },
    });

    return {
      success: "Event appointment created successfully!",
      eventAppointment,
    };
  } catch (error: any) {
    console.error("Error creating event appointment:", error);
    return {
      error: `Failed to create event appointment. Please try again. ${
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

    await db.rooms.update({
      where: {
        id: roomAppointment.roomId,
      },
      data: {
        status: "Not Available",
      },
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
};

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
};

export const fetchSalesByMonth = async () => {
  try {
    // Fetch all orders
    const orders = await db.roomAppointments.findMany({
      where: {
        status: "Confirmed",
      },
    });

    // Group by month
    const salesByMonth = orders.reduce<Record<string, number>>((acc, order) => {
      const month = new Date(order.createdAt).toLocaleString("default", {
        month: "long",
      });
      if (!acc[month]) {
        acc[month] = 0;
      }
      acc[month] += order.price || 0;
      return acc;
    }, {});

    // Format the result to match the structure you need
    const formattedData = Object.keys(salesByMonth).map((month) => ({
      month,
      sales: salesByMonth[month],
    }));

    return formattedData;
  } catch (error) {
    console.error("Error fetching sales data:", error);
  }
};
