/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { getConnections } from "@/actions/misc";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import Link from "next/link";
import EmailLogin from "@/components/forms/email-login";

const SignIn = async (props: {
  searchParams: { orgCode?: string; team_id?: string };
}) => {
  const connections = await getConnections();
  const emailConnectionId = connections?.find(
    (conn: any) => conn.strategy === "email:otp"
  )?.id;
  console.log(connections);
  return (
    <div className="flex flex-col w-full">
      <h2 className="md:text-4xl text-2xl font-bold">Sign In</h2>
      <p className="text-muted-foreground text-sm">
        Enter all the informations associated with your registered account.
      </p>
      <div className="grid gap-4 w-full mt-5">
        <EmailLogin
          emailConnectionId={emailConnectionId}
          orgCode={props.searchParams.orgCode}
          teamId={props.searchParams.team_id}
        />
        <div className="flex items-center gap-4 justify-center">
          <div className="flex-1 border-t border-gray-500"></div>
          <span>Or continue with</span>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>
        <div className="flex items-center gap-2 w-full">
          {connections
            ?.filter((conn: any) => conn.strategy.includes("oauth2"))
            ?.map((connection: any) => (
              <LoginLink
                className="w-full flex-1"
                key={connection.id}
                orgCode={props.searchParams.orgCode}
                postLoginRedirectURL={`/profile`}
                authUrlParams={{
                  connection_id: connection.id,
                }}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <SignInButtonIcon strategy={connection.strategy} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>{connection.display_name}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </LoginLink>
            ))}
        </div>
      </div>
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/auth/sign-up" className="underline">
          Sign up
        </Link>
      </div>
    </div>
  );
};

const SignInButtonIcon = (props: { strategy: string }) => {
  switch (props.strategy) {
    case "oauth2:facebook":
      return (
        <div className="flex items-center gap-x-2">
          <Image src="/icons/fb.png" alt="Facebook" width="20" height="20" />
        </div>
      );
    case "oauth2:google":
      return (
        <div className="flex items-center gap-x-2">
          <Image src="/icons/google.png" alt="Google" width="20" height="20" />
        </div>
      );
    case "oauth2:microsoft":
      return (
        <div className="flex items-center gap-x-2">
          <Image
            src="/icons/microsoft.png"
            alt="Microsoft"
            width="20"
            height="20"
          />
        </div>
      );
    default:
      return null;
  }
};

export default SignIn;
