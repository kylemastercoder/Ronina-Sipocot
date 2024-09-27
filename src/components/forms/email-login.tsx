"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const EmailLogin = (props: {
  emailConnectionId: string | undefined;
  orgCode?: string;
  teamId?: string;
}) => {
  const [email, setEmail] = useState("");
  const router = useRouter();
  return (
    <>
      <div className="grid gap-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="someone@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              router.push(
                `/api/auth/login?connection_id=${
                  props.emailConnectionId
                }&login_hint=${email}${
                  props.orgCode ? `&org_code=${props.orgCode}` : ""
                }${props.teamId ? `&team_id=${props.teamId}` : ""}`
              );
            }
          }}
        />
      </div>
      <LoginLink
        authUrlParams={{
          connection_id: props.emailConnectionId!,
          login_hint: email,
        }}
      >
        <Button className="w-full">Sign in</Button>
      </LoginLink>
    </>
  );
};

export default EmailLogin;
