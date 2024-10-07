import { ZodType, z } from "zod";

export type UserRegistrationProps = {
  type: string;
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  otp: string;
  sex: string;
  region: string;
  province: string;
  municipality: string;
  barangay: string;
  houseNumber: string;
  dateOfBirth: string;
  phoneNumber: string;
};

export const UserSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z
    .string()
    .email({ message: "Enter a valid email address" })
    .min(1, { message: "Email address is required" }),
  password: z
    .string()
    .min(8, { message: "Your password must be atleast 8 characters long" })
    .max(64, {
      message: "Your password can not be longer then 64 characters long",
    })
    .refine(
      (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ""),
      "password should contain only alphabets and numbers"
    ),
});

export const UserLoginSchema = z.object({
  email: z.string().min(1, {
    message: "Email address is required.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

export const EmailVerificationSchema = z.object({
  otpCode: z.string().min(1, {
    message: "OTP code is required.",
  }),
});

export const UserRegistrationSchema: ZodType<UserRegistrationProps> = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "Your first name must be atleast 2 characters long" }),
    lastName: z
      .string()
      .min(2, { message: "Your last name must be atleast 2 characters long" }),
    type: z.string().min(1),
    email: z.string().email({ message: "Incorrect email format" }),
    confirmEmail: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Your password must be atleast 8 characters long" })
      .max(64, {
        message: "Your password can not be longer then 64 characters long",
      })
      .refine(
        (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ""),
        "password should contain only alphabets and numbers"
      ),
    confirmPassword: z.string(),
    region: z.string().min(2, { message: "Please select your region" }),
    province: z.string().min(2, { message: "Please select your province" }),
    municipality: z
      .string()
      .min(2, { message: "Please select your municipality" }),
    barangay: z.string().min(2, { message: "Please select your barangay" }),
    sex: z.string().min(2, { message: "Please select your gender" }),
    dateOfBirth: z
      .string()
      .min(2, { message: "Please select your date of birth" }),
    phoneNumber: z.string().min(2, { message: "Phone number is required" }),
    houseNumber: z.string().min(2, { message: "House number is required" }),
    otp: z.string().min(6, { message: "You must enter a 6 digit code" }),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((schema) => schema.email === schema.confirmEmail, {
    message: "Your emails not match",
    path: ["confirmEmail"],
  });

export type UserLoginProps = {
  email: string;
  password: string;
};

export const UpdateProfileValidation = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().min(1, { message: "Email address is required" }),
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
  gender: z.string().min(1, { message: "Gender is required" }),
  houseNumber: z.string().min(1, { message: "House number is required" }),
  region: z.string().min(1, { message: "Region is required" }),
  province: z.string().min(1, { message: "Province is required" }),
  municipality: z.string().min(1, { message: "Municipality is required" }),
  barangay: z.string().min(1, { message: "Barangay is required" }),
});

export const RoomFormValidation = z.object({
  name: z.string().min(1, { message: "Room name is required" }),
  description: z.string().optional(),
  type: z.string().min(1, { message: "Room type is required" }),
  status: z.enum(["Available", "Not Available"], {
    message: "Status must be either Available or Not Available",
  }),
  imagesUrl: z
    .array(z.string().url({ message: "Invalid image URL" }))
    .nonempty({ message: "At least one image is required" }),
  amenities: z
    .array(z.string())
    .nonempty({ message: "At least one amenity is required" }),
  features: z
    .array(
      z.object({
        numberOfPerson: z
          .number()
          .min(1, { message: "Number of person must be at least 1" }),
        price: z.number().min(0, { message: "Price must be at least 0" }),
      })
    )
    .nonempty({ message: "At least one feature is required" }),
  isFeatured: z.boolean().optional(),
});

export const MenuFormValidation = z.object({
  name: z.string().min(1, { message: "Menu name is required" }),
  description: z.string().optional(),
  type: z.string().min(1, { message: "Menu type is required" }),
  price: z.coerce.number().min(1, { message: "Price is required" }),
  imagesUrl: z
    .array(z.string().url({ message: "Invalid image URL" }))
    .nonempty({ message: "At least one image is required" }),
  stock: z.coerce.number().min(1, { message: "Stock is required" }),
});

export const CateringFormValidation = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  type: z.string().min(1, { message: "Type is required" }),
  stock: z.coerce.number().min(1, { message: "Stock is required" }),
  inclusions: z
    .array(z.string())
    .nonempty({ message: "At least one inclusion is required" }),
  menus: z
    .array(z.string())
    .nonempty({ message: "At least one menu is required" }),
  features: z
    .array(
      z.object({
        numberOfPerson: z
          .number()
          .min(1, { message: "Number of person must be at least 1" }),
        price: z.number().min(0, { message: "Price must be at least 0" }),
      })
    )
    .nonempty({ message: "At least one feature is required" }),
  addons: z
    .array(
      z.object({
        addOnName: z.string().min(1, { message: "Add on name is required" }),
        price: z.number().min(0, { message: "Price must be at least 0" }),
      })
    )
    .nonempty({ message: "At least one add on is required" })
    .optional(),
});

export const EventFormValidation = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  type: z.string().min(1, { message: "Type is required" }),
  status: z.string().min(1, { message: "Status is required" }),
  inclusions: z
    .array(z.string())
    .nonempty({ message: "At least one inclusion is required" }),
  menus: z
    .array(z.string())
    .nonempty({ message: "At least one menu is required" }),
  features: z
    .array(
      z.object({
        numberOfPerson: z
          .number()
          .min(1, { message: "Number of person must be at least 1" }),
        price: z.number().min(0, { message: "Price must be at least 0" }),
      })
    )
    .nonempty({ message: "At least one feature is required" }),
  addons: z
    .array(
      z.object({
        addOnName: z.string().min(1, { message: "Add on name is required" }),
        price: z.number().min(0, { message: "Price must be at least 0" }),
      })
    )
    .nonempty({ message: "At least one add on is required" })
    .optional(),
});

export const EmployeeFormValidation = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  birthdate: z.string().min(1, { message: "Birthdate is required" }),
  age: z.string().min(1, { message: "Age is required" }),
  sex: z.string().min(1, { message: "Gender is required" }),
  civilStatus: z.string().min(1, { message: "Civil status is required" }),
  email: z.string().min(1, { message: "Email address is required" }),
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
  position: z.string().min(1, { message: "Position is required" }),
  status: z.string().min(1, { message: "Status is required" }),
  dateHired: z.string().min(1, { message: "Date hired is required" }),
  imageUrl: z.string().min(1, { message: "Image is required" }),
});

export const PayrollFormValidation = z.object({
  employee: z.string().min(1, { message: "Employee is required" }),
  daysPresent: z.string().min(1, { message: "Days present is required" }),
  salary: z.coerce.number().min(1, { message: "Daily salary is required" }),
  sss: z.coerce.number().min(1, { message: "SSS deduction is required" }),
  philhealth: z.coerce
    .number()
    .min(1, { message: "Philhealth deduction is required" }),
  pagibig: z.coerce
    .number()
    .min(1, { message: "Pag-ibig deduction is required" }),
  bir: z.coerce.number().min(1, { message: "BIR deduction is required" }),
  others: z.coerce.number().optional(),
});

export const AttendanceFormValidation = z.object({
  employee: z.string().min(1, { message: "Employee is required" }),
  attendanceDate: z.string().min(1, { message: "Attendance date is required" }),
  timeIn: z.string().min(1, { message: "Time in is required" }),
  timeOut: z.string().min(1, { message: "Time out is required" }),
});

export const ScheduleFormValidation = z.object({
  employee: z.string().min(1, { message: "Employee is required" }),
  scheduleDate: z.string().min(1, { message: "Schedule date is required" }),
  room: z.string().min(1, { message: "Room is required" }),
});

export const Step2FormValidation = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().min(1, { message: "Email address is required" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  address: z.string().min(1, { message: "Address is required" }),
});
