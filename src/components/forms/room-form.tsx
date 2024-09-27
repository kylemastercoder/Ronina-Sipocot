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
import { RoomFormValidation } from "@/lib/validators";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import ImageUpload from "@/components/ui/image-upload";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader, PlusCircle } from "lucide-react";
import { DynamicSelect } from "@/components/ui/dynamic-select";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { Label } from "../ui/label";
import { Amenities, RoomFeature, Rooms } from "@prisma/client";
import {
  createAmenities,
  createRoom,
  deleteRoom,
  updateRoom,
} from "@/actions/rooms";
import Heading from "../globals/heading";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface RoomsWithFeatures extends Rooms {
  features: RoomFeature[];
  amenities: Amenities[];
}

interface RoomFormProps {
  initialData: RoomsWithFeatures | null;
  amenitiesOptions: { label: string; value: string }[];
}

const RoomForm: React.FC<RoomFormProps> = ({
  initialData,
  amenitiesOptions,
}) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [features, setFeatures] = useState<
    { numberOfPerson: number; price: number }[]
  >([{ numberOfPerson: 0, price: 0 }]);
  const params = useParams();
  const router = useRouter();

  const addFeature = () => {
    setFeatures([...features, { numberOfPerson: 0, price: 0 }]);
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const title = initialData ? "Edit Room" : "Add Room";
  const description = initialData
    ? "Make sure to click save changes after you update the room."
    : "Please fill the required fields to add a new room.";
  const action = initialData ? "Save Changes" : "Save Room";
  const form = useForm<z.infer<typeof RoomFormValidation>>({
    resolver: zodResolver(RoomFormValidation),
    defaultValues: initialData
      ? {
          ...initialData,
          status:
            (initialData.status as "Available" | "Not Available") ||
            "Available",
          imagesUrl: initialData.imagesUrl || [],
          amenities: initialData.amenities.map((amenity) => amenity.id) || [],
          features: initialData.features.map((feature) => ({
            numberOfPerson: feature.numberOfPerson,
            price: feature.price,
          })),
        }
      : {
          name: "",
          type: "",
          description: "",
          status: "Available",
          imagesUrl: [],
          amenities: [],
          features: [{ numberOfPerson: 0, price: 0 }],
          isFeatured: false,
        },
  });

  useEffect(() => {
    //@ts-ignore
    form.setValue("features", features);
  }, [features, form]);

  async function onSubmit(values: z.infer<typeof RoomFormValidation>) {
    setIsLoading(true);
    if (initialData) {
      updateRoom(params.roomId as string, values)
        .then((data) => {
          if (data.success) {
            toast.success(data.success);
            router.push("/admin/rooms");
          } else {
            toast.error(data.error);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      createRoom(values)
        .then((data) => {
          if (data.success) {
            toast.success(data.success);
            router.push("/admin/rooms");
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
    deleteRoom(params.roomId as string)
      .then((data) => {
        if (data.success) {
          toast.success(data.success);
          setOpen(false);
          router.push("/admin/rooms");
        } else {
          toast.error(data.error);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onCreateAmenities = async (amenityName: string) => {
    createAmenities(amenityName).then((data) => {
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

  useEffect(() => {
    if (initialData) {
      // Set the features from initialData
      setFeatures(
        initialData.features.map((feature) => ({
          numberOfPerson: feature.numberOfPerson,
          price: feature.price,
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
                    <CardTitle>Room Details</CardTitle>
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
                                  placeholder="Room Name"
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
                                  placeholder="Room Type"
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
                                  placeholder="Room Description"
                                  className="min-h-20 "
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
                                    <SelectValue placeholder="Select Room Status" />
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
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          disabled={isLoading}
                          name="isFeatured"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Featured Room</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={(value) =>
                                    field.onChange(value === "true")
                                  }
                                  value={
                                    field.value !== undefined
                                      ? String(field.value)
                                      : undefined
                                  }
                                  className="flex items-center space-x-1"
                                >
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="true" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      Yes
                                    </FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="false" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      No
                                    </FormLabel>
                                  </FormItem>
                                </RadioGroup>
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
                    <CardTitle>Room Features</CardTitle>
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
                    <CardTitle>Room Images</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="imagesUrl"
                      disabled={isLoading}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <ImageUpload
                              className="mx-auto max-w-lg"
                              defaultValue={field.value || []}
                              onImageUpload={(urls) => field.onChange(urls)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
                <Card
                  x-chunk="dashboard-07-chunk-4"
                  className="bg-white dark:bg-neutral-950 h-[20rem]"
                >
                  <CardHeader>
                    <CardTitle>Room Amenities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="amenities"
                          disabled={isLoading}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Amenities</FormLabel>
                              <FormControl>
                                <DynamicSelect
                                  onChange={field.onChange}
                                  disabled={isLoading}
                                  placeholder="Select room amenities"
                                  options={amenitiesOptions}
                                  onCreate={(value) => onCreateAmenities(value)}
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

export default RoomForm;
