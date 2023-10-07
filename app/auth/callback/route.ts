import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
export async function GET(request: NextRequest) {
  const requestURL = new URL(request.url);
  const code = requestURL.searchParams.get("code");

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    console.log("in app/auth/callback/route.ts setting the session cookie");
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(requestURL.origin);
}
