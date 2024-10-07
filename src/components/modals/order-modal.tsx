/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";

import { useRouter } from "next/navigation";

import { Food } from "@prisma/client";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  data: Food;
  onSubmit: (values: { quantity: number }) => void;
}

const formSchema = z.object({
  quantity: z.coerce
    .number()
    .min(1, { message: "Quantity must be at least 1" }),
});

const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  loading,
  data,
  onSubmit,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: 1,
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title={`Order ${data.name}`}
      description="Please input how many item/s you order."
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Quantity"
                    min={1}
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="pt-4 space-x-2 flex items-center justify-end w-full">
            <Button disabled={loading} type="submit">
              {loading && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
              Submit Order
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default OrderModal;
