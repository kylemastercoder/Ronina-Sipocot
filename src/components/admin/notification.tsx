import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { IconNotification } from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Notification = () => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full relative"
          >
            <IconNotification className="h-5 w-5" />
            <span className="sr-only">Toggle Notification</span>
            <span className="absolute bg-red-500 w-5 flex items-center justify-center h-5 rounded-full text-[10px] -top-1 -right-1">
              10
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[400px]" align="end">
          <DropdownMenuLabel>Notifications (10)</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="flex flex-col space-y-3 p-1">
            <div className="flex hover:bg-accent cursor-pointer items-start gap-2 border p-3 rounded-md">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="text-sm">
                  Caitlyn book an appointment in Poolside View
                </p>
                <p className="text-xs text-muted-foreground">
                  2 hours ago
                </p>
              </div>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Notification;
