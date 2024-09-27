"use client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Player } from "@lottiefiles/react-lottie-player";
import Placeholder from "@/components/globals/placeholder-card";
import { Food } from "@prisma/client";
import { getAllMenus } from "@/actions/menus";
import MenuCard from "@/components/globals/menu-card";
import Container from "./container";

const MenuContainer = () => {
  const [menus, setMenus] = useState<Food[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    getAllMenus()
      .then((data) => {
        if (data.success) {
          const menus: Food[] = data.menus.map((menu) => ({
            ...menu,
          }));
          setMenus(menus);
        } else {
          toast.error(data.error);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return (
    <Container className="mt-10">
      {isLoading ? (
        <>
          <Placeholder count={4} />
        </>
      ) : menus.length === 0 ? (
        <div className="flex items-center justify-center mx-auto flex-col">
          <Player
            autoplay
            loop
            src="/empty.json"
            style={{ height: "300px", width: "300px" }}
          />
          <h3 className="font-semibold text-lg">No Menus Found</h3>
          <p className="text-muted-foreground md:text-md text-sm text-center">
            It looks like we don&apos;t have any menus to show right now.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {menus.map((menu, i) => (
            <MenuCard
              index={i}
              key={`menu-${i}`}
              menu={{
                ...menu,
              }}
            />
          ))}
        </div>
      )}
    </Container>
  );
};

export default MenuContainer;
