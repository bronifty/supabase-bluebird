import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  console.log(
    "in app/middleware.ts refreshing the session token and setting the cookie"
  );
  await supabase.auth.getSession();
  return res;
}
