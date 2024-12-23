"use client";

import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { CircleUser, Menu, Package2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import { useClerk } from "@clerk/nextjs";

const Navbar = () => {
  const { signOut } = useClerk();
  const pathname = usePathname();
  const navLinks = [
    { href: "/admin/dashboard", label: "Overview" },
    { href: "/admin/rooms", label: "Rooms" },
    { href: "/admin/catering", label: "Catering" },
    { href: "/admin/menu", label: "Menus" },
    { href: "/admin/events", label: "Events" },
    { href: "/admin/customers", label: "Customers" },
    { href: "/admin/employees", label: "Employees" },
    { href: "/admin/appointments", label: "Appointments" },
    { href: "/admin/menu-order", label: "Orders" },
    { href: "/admin/inventory", label: "Inventory" },
  ];
  return (
    <header className="sticky top-0 flex h-16 z-50 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Ronina&apos;s Sipocot</span>
        </Link>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${
              pathname === link.href
                ? "text-foreground"
                : "text-muted-foreground"
            } transition-colors hover:text-foreground`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Ronina&apos;s Sipocot</span>
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${
                  pathname === link.href || pathname.includes(link.href)
                    ? "text-foreground"
                    : "text-muted-foreground"
                } transition-colors hover:text-foreground`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search rooms..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Messages</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => signOut({ redirectUrl: "/admin/auth/sign-in" })}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
