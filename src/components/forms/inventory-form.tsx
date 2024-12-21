"use client";

import React, { useState } from "react";
import AlertModal from "../ui/alert-modal";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
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
import { InventoryFormValidation } from "@/lib/validators";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { Inventory } from "@prisma/client";
import Heading from "../globals/heading";
import {
  createInventory,
  deleteInventory,
  updateInventory,
} from "@/actions/inventory";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface InventoryFormProps {
  initialData: Inventory | null;
}

const InventoryForm: React.FC<InventoryFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();

  const title = initialData ? "Edit Inventory" : "Add Inventory";
  const description = initialData
    ? "Make sure to click save changes after you update the inventory."
    : "Please fill the required fields to add a new inventory.";
  const action = initialData ? "Save Changes" : "Save Inventory";
  const form = useForm<z.infer<typeof InventoryFormValidation>>({
    resolver: zodResolver(InventoryFormValidation),
    defaultValues: initialData
      ? {
          ...initialData,
        }
      : {
          name: "",
          type: "",
          stock: "",
          status: "",
        },
  });

  async function onSubmit(values: z.infer<typeof InventoryFormValidation>) {
    setIsLoading(true);
    if (initialData) {
      updateInventory(params.inventoryId as string, values)
        .then((data) => {
          if (data.success) {
            toast.success(data.success);
            window.location.assign("/admin/inventory");
          } else {
            toast.error(data.error);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      createInventory(values)
        .then((data) => {
          if (data.success) {
            toast.success(data.success);
            window.location.assign("/admin/inventory");
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
    deleteInventory(params.inventoryId as string)
      .then((data) => {
        if (data.success) {
          toast.success(data.success);
          setOpen(false);
          window.location.assign("/admin/menu");
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
                    <CardTitle>Inventory Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3">
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="name"
                          disabled={isLoading}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Name"
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
                          name="type"
                          disabled={isLoading}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Type</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Type"
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
                          name="stock"
                          disabled={isLoading}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Stock</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="Stock"
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
                          disabled={isLoading}
                          name="status"
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
                                    <SelectItem value="Available">
                                      Available
                                    </SelectItem>
                                    <SelectItem value="Not Available">
                                      Not Available
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
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

export default InventoryForm;
