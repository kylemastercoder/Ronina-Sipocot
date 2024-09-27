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
import { MenuFormValidation } from "@/lib/validators";
import ImageUpload from "@/components/ui/image-upload";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { Food } from "@prisma/client";
import { createMenus, deleteMenus, updateMenus } from "@/actions/menus";
import Heading from "../globals/heading";

interface MenuFormProps {
  initialData: Food | null;
}

const MenuForm: React.FC<MenuFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const router = useRouter();

  const title = initialData ? "Edit Menu" : "Add Menu";
  const description = initialData
    ? "Make sure to click save changes after you update the menu."
    : "Please fill the required fields to add a new menu.";
  const action = initialData ? "Save Changes" : "Save Menu";
  const form = useForm<z.infer<typeof MenuFormValidation>>({
    resolver: zodResolver(MenuFormValidation),
    defaultValues: initialData
      ? {
          ...initialData,
          stock: Number(initialData.stock),
        }
      : {
          name: "",
          type: "",
          description: "",
          imagesUrl: [],
          stock: 0,
          price: 0,
        },
  });

  async function onSubmit(values: z.infer<typeof MenuFormValidation>) {
    setIsLoading(true);
    if (initialData) {
      updateMenus(params.menuId as string, values)
        .then((data) => {
          if (data.success) {
            toast.success(data.success);
            router.push("/admin/menu");
          } else {
            toast.error(data.error);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      createMenus(values)
        .then((data) => {
          if (data.success) {
            toast.success(data.success);
            router.push("/admin/menu");
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
    deleteMenus(params.menuId as string)
      .then((data) => {
        if (data.success) {
          toast.success(data.success);
          setOpen(false);
          router.push("/admin/menu");
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
                    <CardTitle>Menu Details</CardTitle>
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
                                  placeholder="Menu Name"
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
                                  placeholder="Menu Type"
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
                          name="price"
                          disabled={isLoading}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Price</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="Menu Price"
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
                                  placeholder="Menu Stock"
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
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Menu Description"
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
                          name="imagesUrl"
                          disabled={isLoading}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Images</FormLabel>
                              <FormControl>
                                <ImageUpload
                                  className="w-full"
                                  defaultValue={field.value || []}
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

export default MenuForm;
