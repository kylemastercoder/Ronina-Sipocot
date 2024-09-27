"use client";

import React, { useState } from "react";
import AlertModal from "../ui/alert-modal";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EmployeeFormValidation } from "@/lib/validators";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { CalendarIcon, Loader } from "lucide-react";
import { Employees } from "@prisma/client";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import {
  DATE_DEFAULT_FORMAT,
  DATE_DISPLAY_FORMAT,
  DATE_YEAR_MIN,
} from "@/constants";
import { cn } from "@/lib/utils";
import {
  createEmployee,
  deleteEmployee,
  updateEmployee,
} from "@/actions/employees";
import Heading from "../globals/heading";
import { Calendar } from "../globals/custom-calendar";
import SingleImageUpload from "../globals/single-image-upload";

interface EmployeeFormProps {
  initialData: Employees | null;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const router = useRouter();

  const title = initialData ? "Edit Employee" : "Add Employee";
  const description = initialData
    ? "Make sure to click save changes after you update the employee."
    : "Please fill the required fields to add a new employee.";
  const action = initialData ? "Save Changes" : "Save Employee";
  const form = useForm<z.infer<typeof EmployeeFormValidation>>({
    resolver: zodResolver(EmployeeFormValidation),
    defaultValues: initialData
      ? {
          ...initialData,
        }
      : {
          firstName: "",
          lastName: "",
          address: "",
          birthdate: "",
          age: "",
          sex: "",
          civilStatus: "",
          email: "",
          phoneNumber: "",
          position: "",
          status: "",
          dateHired: "",
          imageUrl: "",
        },
  });

  async function onSubmit(values: z.infer<typeof EmployeeFormValidation>) {
    setIsLoading(true);
    if (initialData) {
      updateEmployee(values, params.employeeId as string)
        .then((data) => {
          if (data.success) {
            toast.success(data.success);
            router.push("/admin/employees");
          } else {
            toast.error(data.error);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      createEmployee(values)
        .then((data) => {
          if (data.success) {
            toast.success(data.success);
            router.push("/admin/employees");
          } else {
            toast.error(data.error);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  const onDelete = async () => {
    setIsLoading(true);
    deleteEmployee(params.employeeId as string)
      .then((data) => {
        if (data.success) {
          toast.success(data.success);
          setOpen(false);
          router.push("/admin/employees");
        } else {
          toast.error(data.error);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        loading={isLoading}
        onConfirm={onDelete}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between">
            <Heading title={title} description={description} />
            <div className="md:flex hidden items-center space-x-2">
              {initialData && (
                <Button
                  onClick={() => setOpen(true)}
                  variant="outline"
                  size="sm"
                  type="button"
                >
                  Discard
                </Button>
              )}
              <Button type="submit" disabled={isLoading} size="sm">
                {isLoading && <Loader className="animate-spin w-4 h-4 mr-2" />}
                {action}
              </Button>
            </div>
          </div>
          <div className="mx-auto mt-3 grid flex-1 auto-rows-max gap-4">
            <div className="grid gap-4 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card
                  x-chunk="dashboard-07-chunk-0"
                  className="bg-white dark:bg-neutral-950"
                >
                  <CardHeader>
                    <CardTitle>Employee Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3">
                      <div className="grid grid-cols-2 gap-3">
                        <FormField
                          control={form.control}
                          name="firstName"
                          disabled={isLoading}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter First Name"
                                  className=""
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="lastName"
                          disabled={isLoading}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter Last Name"
                                  className=""
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="email"
                          disabled={isLoading}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="Enter Email Address"
                                  className=""
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <FormField
                          control={form.control}
                          name="birthdate"
                          disabled={isLoading}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Birthdate</FormLabel>
                              <FormControl>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "flex w-full pl-2 justify-start font-normal focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed",
                                          !field.value &&
                                            "text-muted-foreground"
                                        )}
                                      >
                                        <CalendarIcon className="mr-4 h-4 w-4" />
                                        {field.value ? (
                                          format(
                                            field.value,
                                            DATE_DISPLAY_FORMAT
                                          )
                                        ) : (
                                          <span>Enter Birthdate</span>
                                        )}
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    align="start"
                                    className=" w-auto p-0"
                                  >
                                    <Calendar
                                      mode="single"
                                      captionLayout="dropdown-buttons"
                                      selected={
                                        field.value
                                          ? new Date(field.value)
                                          : undefined
                                      }
                                      onSelect={(date) =>
                                        date &&
                                        field.onChange(
                                          format(date, DATE_DEFAULT_FORMAT)
                                        )
                                      }
                                      fromYear={DATE_YEAR_MIN}
                                      toYear={new Date().getFullYear()}
                                      disabled={(date) => date > new Date()}
                                    />
                                  </PopoverContent>
                                </Popover>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="age"
                          disabled={isLoading}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Age</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="Enter Age"
                                  className=""
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <FormField
                          control={form.control}
                          name="sex"
                          disabled={isLoading}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Gender</FormLabel>
                              <FormControl>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger
                                    className={`${
                                      !field.value ? "text-zinc-400" : ""
                                    }`}
                                  >
                                    <SelectValue placeholder="Select Gender" />
                                  </SelectTrigger>
                                  <SelectContent className="">
                                    <SelectItem value="Male">Male</SelectItem>
                                    <SelectItem value="Female">
                                      Female
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="civilStatus"
                          disabled={isLoading}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Civil Status</FormLabel>
                              <FormControl>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger
                                    className={`${
                                      !field.value ? "text-zinc-400" : ""
                                    }`}
                                  >
                                    <SelectValue placeholder="Select Civil Status" />
                                  </SelectTrigger>
                                  <SelectContent className="">
                                    <SelectItem value="Single">
                                      Single
                                    </SelectItem>
                                    <SelectItem value="Married">
                                      Married
                                    </SelectItem>
                                    <SelectItem value="Separated">
                                      Separated
                                    </SelectItem>
                                    <SelectItem value="Widowed">
                                      Widowed
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <FormField
                          control={form.control}
                          name="phoneNumber"
                          disabled={isLoading}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="Enter Phone Number"
                                  className=""
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="status"
                          disabled={isLoading}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Status</FormLabel>
                              <FormControl>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger
                                    className={`${
                                      !field.value ? "text-zinc-400" : ""
                                    }`}
                                  >
                                    <SelectValue placeholder="Select Status" />
                                  </SelectTrigger>
                                  <SelectContent className="">
                                    <SelectItem value="Active">
                                      Active
                                    </SelectItem>
                                    <SelectItem value="Inactive">
                                      Inactive
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <FormField
                          control={form.control}
                          name="dateHired"
                          disabled={isLoading}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Date Hired</FormLabel>
                              <FormControl>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "flex w-full pl-2 justify-start font-normal focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed",
                                          !field.value &&
                                            "text-muted-foreground"
                                        )}
                                      >
                                        <CalendarIcon className="mr-4 h-4 w-4" />
                                        {field.value ? (
                                          format(
                                            field.value,
                                            DATE_DISPLAY_FORMAT
                                          )
                                        ) : (
                                          <span>Enter Date Hired</span>
                                        )}
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    align="start"
                                    className=" w-auto p-0"
                                  >
                                    <Calendar
                                      mode="single"
                                      captionLayout="dropdown-buttons"
                                      selected={
                                        field.value
                                          ? new Date(field.value)
                                          : undefined
                                      }
                                      onSelect={(date) =>
                                        date &&
                                        field.onChange(
                                          format(date, DATE_DEFAULT_FORMAT)
                                        )
                                      }
                                      fromYear={DATE_YEAR_MIN}
                                      toYear={new Date().getFullYear()}
                                      disabled={(date) => date > new Date()}
                                    />
                                  </PopoverContent>
                                </Popover>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="position"
                          disabled={isLoading}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Position</FormLabel>
                              <FormControl>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger
                                    className={`${
                                      !field.value ? "text-zinc-400" : ""
                                    }`}
                                  >
                                    <SelectValue placeholder="Select Position" />
                                  </SelectTrigger>
                                  <SelectContent className="">
                                    <SelectItem value="Secretary">
                                      Secretary
                                    </SelectItem>
                                    <SelectItem value="Waiter/Waitress">
                                      Waiter/Waitress
                                    </SelectItem>
                                    <SelectItem value="Front Desk">
                                      Front Desk
                                    </SelectItem>
                                    <SelectItem value="Security Guard">
                                      Security Guard
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          disabled={isLoading}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Enter Address"
                                  className="min-h-20 "
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid-gap-3">
                        <FormField
                          control={form.control}
                          name="imageUrl"
                          disabled={isLoading}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Images</FormLabel>
                              <FormControl>
                                <SingleImageUpload
                                  className="w-full"
                                  defaultValue={field.value || ""}
                                  onImageUpload={(urls) => field.onChange(urls)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="flex items-center gap-2 md:hidden">
              {initialData && (
                <Button
                  onClick={() => setOpen(true)}
                  variant="outline"
                  size="sm"
                  type="button"
                >
                  Discard
                </Button>
              )}
              <Button type="submit" disabled={isLoading} size="sm">
                {isLoading && <Loader className="animate-spin w-4 h-4 mr-2" />}
                {action}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default EmployeeForm;
