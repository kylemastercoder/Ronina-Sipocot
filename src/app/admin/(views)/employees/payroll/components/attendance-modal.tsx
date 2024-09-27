"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AttendanceFormValidation,
} from "@/lib/validators";
import { Employees } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createAttendance } from "@/actions/employees";
import { format } from "date-fns";

interface PayrollFormValues {
  employees: Employees[];
}

const AttendanceModal: React.FC<PayrollFormValues> = ({ employees }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);
  const router = useRouter();
  const form = useForm<z.infer<typeof AttendanceFormValidation>>({
    resolver: zodResolver(AttendanceFormValidation),
    defaultValues: {
      employee: employees[0].firstName + " " + employees[0].lastName || "",
      attendanceDate: format(new Date(), "MMMM dd, yyyy"),
      timeIn: "",
      timeOut: "",
    },
  });

  async function onSubmit(values: z.infer<typeof AttendanceFormValidation>) {
    setIsLoading(true);
    createAttendance(values, employees[0].id)
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

  if (!isMounted) return null;
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">+ Add Attendance</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Attendance</DialogTitle>
          <DialogDescription>
            Make changes to your attendance here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="employee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employee</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Employee" disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="attendanceDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Attendance Date</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Attendance Date"
                      disabled
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="timeIn"
                disabled={isLoading}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time In</FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        {...field}
                        className="placeholder:text-muted-foreground"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="timeOut"
                disabled={isLoading}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time Out</FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        {...field}
                        className="placeholder:text-muted-foreground"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Save Attendance
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AttendanceModal;
