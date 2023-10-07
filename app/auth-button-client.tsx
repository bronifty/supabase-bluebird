"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Session } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React from "react";

export default function AuthButtonClient({
  session,
}: {
  session: Session | null;
}) {
  const supabase = createClientComponentClient();
  // const [session, setSession] = React.useState();
  // React.useEffect(() => {
  //   async function getSession() {
  //     const { data } = await supabase.auth.getSession();
  //     setSession(data.session);
  //   }
  //   getSession();
  // }, []);
  const router = useRouter();
  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });
  };
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };
  return session ? (
    <button onClick={handleSignOut}>Log Out</button>
  ) : (
    <button onClick={handleSignIn}>Log In</button>
  );
}
