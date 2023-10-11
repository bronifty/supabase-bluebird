"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
export default function Likes({ tweet }: any) {
  console.log(tweet);
  async function handleClick(event) {
    const supabase = createClientComponentClient<Database>();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    await supabase
      .from("likes")
      .insert({ user_id: user.id, tweet_id: tweet.id });
  }

  return (
    <>
      <button onClick={handleClick}>{tweet.likes.length} Likes</button>
    </>
  );
}
