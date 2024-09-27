"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Modal } from "../ui/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ScheduleFormValidation } from "@/lib/validators";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import {
  DATE_DEFAULT_FORMAT,
  DATE_DISPLAY_FORMAT,
  DATE_YEAR_MIN,
} from "@/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createSchedule } from "@/actions/employees";
import { EmployeeColumn } from "@/app/admin/(views)/employees/components/column";
import { Calendar } from "../globals/custom-calendar";

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  data: EmployeeColumn;
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({
  isOpen,
  onClose,
  loading,
  data,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof ScheduleFormValidation>>({
    resolver: zodResolver(ScheduleFormValidation),
    defaultValues: {
      employee: data.name || "",
      room: "",
      scheduleDate: "",
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  async function onSubmit(values: z.infer<typeof ScheduleFormValidation>) {
    setIsLoading(true);
    createSchedule(values, data.id)
      .then((data) => {
        if (data.success) {
          toast.success(data.success);
          router.push("/admin/employees");
          onClose();
        } else {
          toast.error(data.error);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <Modal
      title="Add Schedule"
      description="Please fill the required fields to add a new schedule."
      isOpen={isOpen}
      onClose={onClose}
    >
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
            name="scheduleDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Scheduled Date</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "flex w-full pl-2 justify-start font-normal focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-4 h-4 w-4" />
                          {field.value ? (
                            format(field.value, DATE_DISPLAY_FORMAT)
                          ) : (
                            <span>Select Scheduled Date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent align="start" className=" w-auto p-0">
                      <Calendar
                        mode="single"
                        captionLayout="dropdown-buttons"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) =>
                          date &&
                          field.onChange(format(date, DATE_DEFAULT_FORMAT))
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
            name="room"
            disabled={isLoading}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assigned Room</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger
                      className={`${!field.value ? "text-zinc-400" : ""}`}
                    >
                      <SelectValue placeholder="Select Assigned Room" />
                    </SelectTrigger>
                    <SelectContent className="">
                      {data.rooms.map((room) => (
                        <SelectItem value={room.id} key={data.id}>
                          {room.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="pt-4 space-x-2 flex items-center justify-end w-full">
            <Button disabled={isLoading} type="submit">
              {isLoading && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
              Save Schedule
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default ScheduleModal;
