/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import React, { useEffect, useState } from "react";
import AlertModal from "../ui/alert-modal";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
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
import { CateringFormValidation } from "@/lib/validators";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader, PlusCircle } from "lucide-react";
import { DynamicSelect } from "@/components/ui/dynamic-select";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { Label } from "../ui/label";
import {
  AddOns,
  Catering,
  CateringFeature,
  Food,
  Inclusions,
} from "@prisma/client";
import { Checkbox } from "../ui/checkbox";
import {
  createCatering,
  createInclusions,
  deleteCatering,
  updateCatering,
} from "@/actions/catering";
import Heading from "../globals/heading";

interface CateringWithFeatures extends Catering {
  features: CateringFeature[];
  inclusions: Inclusions[];
  addons: AddOns[];
  menus: Food[];
}

interface CateringFormProps {
  initialData: CateringWithFeatures | null;
  inclusionOptions: { label: string; value: string }[];
  menuOptions: { label: string; value: string }[];
}

const CateringForm: React.FC<CateringFormProps> = ({
  initialData,
  inclusionOptions,
  menuOptions,
}) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [features, setFeatures] = useState<
    { numberOfPerson: number; price: number }[]
  >([{ numberOfPerson: 0, price: 0 }]);
  const [addOns, setAddOns] = useState<{ addOnName: string; price: number }[]>([
    { addOnName: "", price: 0 },
  ]);
  const params = useParams();
  const router = useRouter();

  const addFeature = () => {
    setFeatures([...features, { numberOfPerson: 0, price: 0 }]);
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const addAddOn = () => {
    setAddOns([...addOns, { addOnName: "", price: 0 }]);
  };

  const removeAddOn = (index: number) => {
    setAddOns(addOns.filter((_, i) => i !== index));
  };

  const title = initialData ? "Edit Catering" : "Add Catering";
  const description = initialData
    ? "Make sure to click save changes after you update the catering."
    : "Please fill the required fields to add a new catering.";
  const action = initialData ? "Save Changes" : "Save Catering";
  const form = useForm<z.infer<typeof CateringFormValidation>>({
    resolver: zodResolver(CateringFormValidation),
    defaultValues: initialData
      ? {
          ...initialData,
          inclusions:
            initialData.inclusions.map((inclusion) => inclusion.id) || [],
          features: initialData.features.map((feature) => ({
            numberOfPerson: feature.numberOfPerson,
            price: feature.price,
          })),
          addons: initialData.addons.map((addon) => ({
            addOnName: addon.name,
            price: addon.price,
          })),
          menus: initialData.menus.map((menu) => menu.id),
        }
      : {
          name: "",
          type: "",
          inclusions: [],
          features: [{ numberOfPerson: 0, price: 0 }],
          menus: [],
          addons: [{ addOnName: "", price: 0 }],
          stock: 0,
        },
  });

  useEffect(() => {
    // @ts-ignore
    form.setValue("features", features);
  }, [features, form]);

  useEffect(() => {
    // @ts-ignore
    form.setValue("addons", addOns);
  }, [addOns, form]);

  async function onSubmit(values: z.infer<typeof CateringFormValidation>) {
    setIsLoading(true);
    if (initialData) {
      updateCatering(params.cateringId as string, values)
        .then((data) => {
          if (data.success) {
            toast.success(data.success);
            router.push("/admin/catering");
          } else {
            toast.error(data.error);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      createCatering(values)
        .then((data) => {
          if (data.success) {
            toast.success(data.success);
            router.push("/admin/catering");
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
    deleteCatering(params.cateringId as string)
      .then((data) => {
        if (data.success) {
          toast.success(data.success);
          router.push("/admin/catering");
        } else {
          toast.error(data.error);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onCreateInclusions = async (inclusionName: string) => {
    createInclusions(inclusionName).then((data) => {
      if (data.success) {
        toast.success(data.success);
        router.refresh();
      } else {
        toast.error(data.error);
      }
    });
  };

  const handleFeatureChange = (
    index: number,
    key: keyof { numberOfPerson: number; price: number },
    value: string
  ) => {
    const newFeatures = [...features];
    (newFeatures[index] as { numberOfPerson: number; price: number })[key] =
      parseFloat(value);
    setFeatures(newFeatures);
  };

  const handleAddOnsChange = (
    index: number,
    key: keyof { addOnName: string; price: number },
    value: string
  ) => {
    console.log("Changed AddOn:", index, key, value); // Debugging log
    const newAddOns = [...addOns];
    if (key === "price") {
      newAddOns[index][key] = parseFloat(value);
    } else {
      newAddOns[index][key] = value;
    }
    setAddOns(newAddOns);
  };

  useEffect(() => {
    if (initialData) {
      // Set the features from initialData
      setFeatures(
        initialData.features.map((feature) => ({
          numberOfPerson: feature.numberOfPerson,
          price: feature.price,
        }))
      );
      setAddOns(
        initialData.addons.map((addon) => ({
          addOnName: addon.name,
          price: addon.price,
        }))
      );
    }
  }, [initialData]);

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
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card
                  x-chunk="dashboard-07-chunk-0"
                  className="bg-white dark:bg-neutral-950"
                >
                  <CardHeader>
                    <CardTitle>Catering Details</CardTitle>
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
                                  placeholder="Catering Name"
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
                                  placeholder="Catering Type"
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
                          name="stock"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Stock</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="Catering Stock"
                                  {...field}
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
                <Card
                  className="bg-white dark:bg-neutral-950"
                  x-chunk="dashboard-07-chunk-1"
                >
                  <CardHeader>
                    <CardTitle>Catering Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableBody>
                        {features.map((feature, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <Label
                                htmlFor={`pax-${index}`}
                                className="sr-only"
                              >
                                Pax
                              </Label>
                              <Input
                                id={`pax-${index}`}
                                type="number"
                                placeholder="Number of Person"
                                value={feature.numberOfPerson}
                                onChange={(e) =>
                                  handleFeatureChange(
                                    index,
                                    "numberOfPerson",
                                    e.target.value
                                  )
                                }
                              />
                            </TableCell>
                            <TableCell>
                              <Label
                                htmlFor={`price-${index}`}
                                className="sr-only"
                              >
                                Price
                              </Label>
                              <Input
                                id={`price-${index}`}
                                type="number"
                                placeholder="Price Per Pax"
                                value={feature.price}
                                onChange={(e) =>
                                  handleFeatureChange(
                                    index,
                                    "price",
                                    e.target.value
                                  )
                                }
                                min={0}
                              />
                            </TableCell>
                            <TableCell>
                              <Button
                                className="w-full dark:hover:bg-neutral-900 dark:bg-neutral-950"
                                variant="outline"
                                type="button"
                                onClick={() => removeFeature(index)}
                              >
                                Remove Feature
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter className="justify-center border-t p-4">
                    <Button
                      onClick={addFeature}
                      variant="ghost"
                      type="button"
                      className="gap-1"
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add New Feature
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card
                  x-chunk="dashboard-07-chunk-3"
                  className="bg-white dark:bg-neutral-950"
                >
                  <CardHeader>
                    <CardTitle>Other Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid grid-col-3 gap-3">
                        <FormLabel>Choose Menu</FormLabel>
                        {menuOptions.map((menu) => (
                          <FormField
                            key={menu.value}
                            control={form.control}
                            name="menus"
                            disabled={isLoading}
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(menu.value)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            menu.value,
                                          ])
                                        : field.onChange(
                                            field.value.filter(
                                              (value) => value !== menu.value
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {menu.label}
                                </FormLabel>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                      <Table>
                        <TableBody>
                          {addOns.map((addOn, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                <Label
                                  htmlFor={`addon-${index}`}
                                  className="sr-only"
                                >
                                  Add-on Name
                                </Label>
                                <Input
                                  id={`addon-${index}`}
                                  placeholder="Add-On Name"
                                  value={addOn.addOnName}
                                  onChange={(e) =>
                                    handleAddOnsChange(
                                      index,
                                      "addOnName",
                                      e.target.value
                                    )
                                  }
                                />
                              </TableCell>
                              <TableCell>
                                <Label
                                  htmlFor={`price-${index}`}
                                  className="sr-only"
                                >
                                  Price
                                </Label>
                                <Input
                                  id={`price-${index}`}
                                  type="number"
                                  placeholder="Price Per Pax"
                                  value={addOn.price}
                                  onChange={(e) =>
                                    handleAddOnsChange(
                                      index,
                                      "price",
                                      e.target.value
                                    )
                                  }
                                  min={0}
                                />
                              </TableCell>
                              <TableCell>
                                <Button
                                  className="w-full dark:hover:bg-neutral-900 dark:bg-neutral-950"
                                  variant="outline"
                                  type="button"
                                  onClick={() => removeAddOn(index)}
                                >
                                  Remove Add-On
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                  <CardFooter className="justify-center border-t p-4">
                    <Button
                      onClick={addAddOn}
                      variant="ghost"
                      type="button"
                      className="gap-1"
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Create New Add-On
                    </Button>
                  </CardFooter>
                </Card>
                <Card
                  x-chunk="dashboard-07-chunk-4"
                  className="bg-white dark:bg-neutral-950 h-[20rem]"
                >
                  <CardHeader>
                    <CardTitle>Catering Inclusions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="inclusions"
                          disabled={isLoading}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Inclusions</FormLabel>
                              <FormControl>
                                <DynamicSelect
                                  onChange={field.onChange}
                                  disabled={isLoading}
                                  placeholder="Select catering inclusions"
                                  options={inclusionOptions}
                                  onCreate={(value) =>
                                    onCreateInclusions(value)
                                  }
                                  value={field.value || []}
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

export default CateringForm;
