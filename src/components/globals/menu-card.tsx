"use client";

import ImageSlider from "@/components/globals/image-slider";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn, formatPrice } from "@/lib/utils";
import { Food } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import useCart from "@/hooks/use-cart";
import OrderModal from "../modals/order-modal";
import { toast } from "sonner";
import { orderMenu } from "@/actions/menus";
import { useUser } from "@clerk/nextjs";

interface MenuCardProps {
  menu: Food | null;
  index: number;
}

const MenuCard: React.FC<MenuCardProps> = ({ menu, index }) => {
  const { user } = useUser();
  const addToCart = useCart((state) => state.addItem);
  const [open, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 100);

    return () => clearTimeout(timer);
  }, [index]);

  const imageUrls = menu?.imagesUrl ?? [];

  const handleAddToCart = () => {
    addToCart({
      id: menu?.id as string,
      name: menu?.name as string,
      price: menu?.price as number,
      quantity: 1,
      category: menu?.type as string,
      image: menu?.imagesUrl[0] as string,
      description: menu?.description as string,
    });
    setIsOpen(true);
  };

  const onSubmit = async (values: { quantity: number }) => {
    setLoading(true);

    const items = useCart.getState().items;
    const item = items.find((i) => i.id === menu?.id);

    if (!item) {
      toast.error("Error: Menu item not found.");
      setLoading(false);
      return;
    }

    try {
      const response = await orderMenu(
        item.id, // ID of the food item being ordered
        values.quantity, // Quantity of items ordered
        item.price * values.quantity, // Calculate total price
        user?.id as string // User ID from Clerk authentication
      );

      if (response?.error) {
        toast.error(response.error);
      } else {
        useCart.getState().removeAll(); // Clear the cart on successful order
        toast.success(`Order placed successfully`);
        setIsOpen(false); // Close modal on success
      }
    } catch (error) {
      console.error(error);
      toast.error("Error placing order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!menu || !isVisible) return null;

  return (
    <>
      <OrderModal
        isOpen={open}
        onClose={() => setIsOpen(false)}
        loading={loading}
        onSubmit={onSubmit}
        data={menu}
      />
      <Card
        className={cn("rounded-lg relative invisible group/main", {
          "visible animate-in fade-in-5": isVisible,
        })}
      >
        <CardContent className="flex flex-col p-0">
          <ImageSlider urls={imageUrls} />
          <div className="px-4 pb-4">
            <div className="flex items-center mt-4 gap-x-2">
              <h3 className="text-xl font-bold">{menu.name}</h3>
              <Badge>{menu.type}</Badge>
            </div>
            <p className="text-xs my-1">{formatPrice(menu.price)}</p>
            <p className="line-clamp-2 text-sm text-muted-foreground mt-1">
              {menu.description}
            </p>
            <Button onClick={handleAddToCart} className="mt-3 w-full" size="sm">
              Order Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default MenuCard;
