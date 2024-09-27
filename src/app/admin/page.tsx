import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as jose from "jose";

export default async function Admin() {
  // Check for cookie
  const cookie = cookies().get("Authorization");
  
  // If no cookie, redirect to sign-in page
  if (!cookie) {
    return redirect("/admin/auth/sign-in");
  }

  // Validate the JWT
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const jwt = cookie.value;

  try {
    const { payload } = await jose.jwtVerify(jwt, secret, {});
    console.log(payload); // If needed, handle payload or add user context
  } catch (err) {
    console.log(err);
    // If verification fails, redirect to sign-in page
    return redirect("/admin/auth/sign-in");
  }

  // Fallback redirect if the JWT is not valid or any other case
  return redirect("/admin/auth/sign-in");
}
