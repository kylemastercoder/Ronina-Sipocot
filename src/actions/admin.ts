"use server";

import db from "@/lib/db";
import * as jose from "jose";

export const signinUser = async (email: string, password: string) => {
    // read data
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
  
    // write data
    const user = await db.admin.findFirst({
      where: {
        email,
        password
      },
    });
  
    if (!user) {
      throw new Error("User not found");
    }
  
    //   create jwt token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const alg = "HS256";
  
    const jwt = await new jose.SignJWT({})
      .setProtectedHeader({ alg })
      .setExpirationTime("72h")
      .setSubject(user.id.toString())
      .sign(secret);
  
    return { token: jwt };
  };