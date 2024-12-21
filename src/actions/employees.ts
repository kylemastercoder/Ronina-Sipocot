/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import db from "@/lib/db";
import {
  AttendanceFormValidation,
  EmployeeFormValidation,
  PayrollFormValidation,
} from "@/lib/validators";
import { z } from "zod";

export const getAllEmployees = async () => {
  try {
    const employees = await db.employees.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: "Employeed displayed successfully!", employees };
  } catch (error: any) {
    return {
      error: `Failed to display employee. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

export const createEmployee = async (
  values: z.infer<typeof EmployeeFormValidation>
) => {
  const validatedField = EmployeeFormValidation.safeParse(values);

  if (!validatedField.success) {
    const errors = validatedField.error.errors.map((err) => err.message);
    return { error: `Validation Error: ${errors.join(", ")}` };
  }

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    address,
    birthdate,
    age,
    sex,
    civilStatus,
    dateHired,
    position,
    status,
    imageUrl,
  } = validatedField.data;

  try {
    await db.employees.create({
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        birthdate,
        age,
        sex,
        civilStatus,
        dateHired,
        position,
        status,
        imageUrl,
      },
    });

    return { success: "Employee created successfully" };
  } catch (error: any) {
    return {
      error: `Failed to create employee. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

export const createPayroll = async (
  values: z.infer<typeof PayrollFormValidation>,
  employeeId: string
) => {
  const validatedField = PayrollFormValidation.safeParse(values);

  if (!validatedField.success) {
    const errors = validatedField.error.errors.map((err) => err.message);
    return { error: `Validation Error: ${errors.join(", ")}` };
  }

  const { daysPresent, salary, sss, philhealth, pagibig, bir, others } =
    validatedField.data;

  try {
    await db.payroll.create({
      data: {
        employeeId,
        daysPresent,
        salary,
        sss,
        philhealth,
        pagibig,
        bir,
        otherDeductions: others || 0,
      },
    });

    return { success: "Payroll created successfully" };
  } catch (error: any) {
    return {
      error: `Failed to create payroll. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

export const createAttendance = async (
  values: z.infer<typeof AttendanceFormValidation>,
  employeeId: string
) => {
  const validatedField = AttendanceFormValidation.safeParse(values);

  if (!validatedField.success) {
    const errors = validatedField.error.errors.map((err) => err.message);
    return { error: `Validation Error: ${errors.join(", ")}` };
  }

  const { attendanceDate, timeIn, timeOut } = validatedField.data;

  try {
    await db.attendance.create({
      data: {
        employeeId,
        date: attendanceDate,
        timeIn,
        timeOut,
      },
    });

    return { success: "Attendance created successfully" };
  } catch (error: any) {
    return {
      error: `Failed to create attendance. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

export const createSchedule = async (
  roomId: string,
  date: string,
  employeeId: string
) => {
  if (!roomId || !date || !employeeId) {
    return { error: "Please provide all required fields" };
  }

  try {
    await db.employeeSchedule.create({
      data: {
        employeeId,
        date: date,
        roomId: roomId,
        status: "Pending",
      },
    });

    return { success: "Schedule created successfully" };
  } catch (error: any) {
    return {
      error: `Failed to create schedule. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

export const updateSchedule = async (
  scheduleId: string,
  assignedRoom: string,
  date: string,
  employeeId: string
) => {
  try {
    await db.employeeSchedule.update({
      where: { id: scheduleId },
      data: {
        date,
        roomId: assignedRoom,
        employeeId,
      },
    });

    return { success: "Schedule updated successfully" };
  } catch (error: any) {
    return {
      error: `Failed to update schedule. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

export const getAllSchedules = async () => {
  try {
    const schedules = await db.employeeSchedule.findMany({
      include: {
        room: true,
        employee: true,
      },
    });

    return { success: "Schedules displayed successfully!", schedules };
  } catch (error: any) {
    return {
      error: `Failed to display schedules. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

export const updateEmployee = async (
  values: z.infer<typeof EmployeeFormValidation>,
  employeeId: string
) => {
  const validatedField = EmployeeFormValidation.safeParse(values);

  if (!validatedField.success) {
    const errors = validatedField.error.errors.map((err) => err.message);
    return { error: `Validation Error: ${errors.join(", ")}` };
  }

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    address,
    birthdate,
    age,
    sex,
    civilStatus,
    dateHired,
    position,
    status,
    imageUrl,
  } = validatedField.data;

  try {
    await db.employees.update({
      where: { id: employeeId },
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        birthdate,
        age,
        sex,
        civilStatus,
        dateHired,
        position,
        status,
        imageUrl,
      },
    });

    return { success: "Employee updated successfully" };
  } catch (error: any) {
    return {
      error: `Failed to update employee. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

export const deleteEmployee = async (employeeId: string) => {
  try {
    await db.employees.delete({ where: { id: employeeId } });

    return { success: "Employee deleted successfully" };
  } catch (error: any) {
    return {
      error: `Failed to delete employee. Please try again. ${
        error.message || ""
      }`,
    };
  }
};
