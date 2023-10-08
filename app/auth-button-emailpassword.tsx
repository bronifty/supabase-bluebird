"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Session } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React from "react";
const email = "bronifty@gmail.com";
const password = "password";

export default function AuthButtonEmailPassword({
  session,
}: {
  session: Session | null;
}) {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const signUpWithEmailAndPassword = async () => {
    let { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      console.log(error);
      return;
    }
    console.log(data);
  };
  const signInWithEmailAndPassword = async () => {
    let { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log(error);
      return;
    }
    console.log(data);
  };

  const handleSignUp = async () => {
    signUpWithEmailAndPassword();
  };

  const handleSignIn = async () => {
    signInWithEmailAndPassword();
  };

  const signInWithOTPEmail = async () => {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "http://localhost:3000/auth/callback",
      },
    });

    if (error) {
      console.log(error);
      return;
    }
    console.log(data);
  };

  const verifyOTPEmailHash = async () => {
    const token_hash =
      "31240901bc2372b4c8d9c2c4d1ddde49d81ae51917e23ca2ca747b3e98dc36180cb99ff207d584cd8a0bb4924b43611b3af64daf0c1cc3fc";
    console.log(`verify token_hash ${token_hash}`);

    const { data, error } = await supabase.auth.verifyOtp({
      token_hash,
      type: "email",
    });

    if (error) {
      console.log(error);
      return;
    }
    console.log(data);
  };
  const handleSignInWithOTPEmail = async () => {
    signInWithOTPEmail();
  };
  const handleverifyOTPEmailHash = async () => {
    verifyOTPEmailHash();
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };
  return session ? (
    <button onClick={handleSignOut}>Log Out</button>
  ) : (
    <>
      <button onClick={handleSignUp}>Sign Up With Email and password</button>
      <div></div>
      <button onClick={handleSignIn}>Sign In With Email and password</button>
      <div></div>
      <button onClick={handleSignInWithOTPEmail}>Sign In With OTP Email</button>
      <div></div>
      <button onClick={handleverifyOTPEmailHash}>Verify OTP Email</button>
    </>
  );
}
