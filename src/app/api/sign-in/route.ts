
import db from "@/lib/db";
import * as jose from "jose";

export async function POST(request: Request) {
  // Read data off req body
  const body = await request.json();
  const { email, password } = body;

  // Validate data
  if (!email || !password) {
    return Response.json(
      {
        error: "Email and password are required",
      },
      { status: 400 }
    );
  }

  // Lookup the user
  const user = await db.admin.findFirst({
    where: {
      email,
      password
    },
  });

  if (!user) {
    return Response.json(
      {
        error: "Invalid email or password",
      },
      { status: 400 }
    );
  }

  // Create jwt token
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const alg = "HS256";

  const jwt = await new jose.SignJWT({})
    .setProtectedHeader({ alg })
    .setExpirationTime("72h")
    .setSubject(user.id.toString())
    .sign(secret);

  // Respond with it
  return new Response(JSON.stringify({ token: jwt }), { status: 200 });
}