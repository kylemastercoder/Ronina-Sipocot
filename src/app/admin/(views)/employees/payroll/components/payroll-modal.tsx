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
import { PayrollFormValidation } from "@/lib/validators";
import { Attendance, Employees } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createPayroll } from "@/actions/employees";

interface PayrollModalProps extends Employees {
  attendance: Attendance[];
}

interface PayrollFormValues {
  employees: PayrollModalProps[];
}

const PayrollModal: React.FC<PayrollFormValues> = ({ employees }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);
  const router = useRouter();
  const form = useForm<z.infer<typeof PayrollFormValidation>>({
    resolver: zodResolver(PayrollFormValidation),
    defaultValues: {
      employee: employees[0].firstName + " " + employees[0].lastName || "",
      daysPresent: employees[0].attendance.length.toString() || "",
      salary: 0,
      sss: 0,
      philhealth: 0,
      pagibig: 0,
      bir: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof PayrollFormValidation>) {
    setIsLoading(true);
    createPayroll(values, employees[0].id)
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
        <Button>+ Add Payroll</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Payroll</DialogTitle>
          <DialogDescription>
            Make changes to your payroll here. Click save when you&apos;re done.
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
              name="daysPresent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Days Present</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Employee" disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="salary"
              disabled={isLoading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Net Salary (Day)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter Net Salary"
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
                name="sss"
                disabled={isLoading}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SSS Deduction</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter SSS Deduction"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="philhealth"
                disabled={isLoading}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Philhealth Deduction</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter Philhealth Deduction"
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
                name="pagibig"
                disabled={isLoading}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pag-ibig Deduction</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter Pag-ibig Deduction"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bir"
                disabled={isLoading}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>BIR Deduction</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter BIR Deduction"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="others"
              disabled={isLoading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Other Deduction (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Other Deduction" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Save Payroll
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PayrollModal;
