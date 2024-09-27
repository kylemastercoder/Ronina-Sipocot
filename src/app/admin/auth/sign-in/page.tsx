"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";
import loginAction from "../sign-in-action";

const AdminSignIn = () => {
  const [error, formAction] = useFormState(loginAction, undefined);
  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome Back, Admin!</DialogTitle>
          <DialogDescription>
            Please login your admin account to access the dashboard.
          </DialogDescription>
        </DialogHeader>
        <div>
          <form action={formAction} className="space-y-3">
            <Input type="email" name="email" placeholder="Email Address" />
            <Input type="password" name="password" placeholder="Password" />
            <Button className="w-full" type="submit">Sign In</Button>
          </form>
        </div>
        {error && <p className="text-center text-red-500">{error}</p>}
      </DialogContent>
    </Dialog>
  );
};

export default AdminSignIn;
