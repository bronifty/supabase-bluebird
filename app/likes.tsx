"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { RouteMatcher } from "next/dist/server/future/route-matchers/route-matcher";
import { useRouter } from "next/navigation";
export default function Likes({ tweet }: any) {
  const router = useRouter();
  console.log(tweet);
  // async function handleClick() {
  //   const supabase = createClientComponentClient<Database>();

  //   const {
  //     data: { user },
  //   } = await supabase.auth.getUser();
  //   if (user) {
  //     if (tweet.liked_by_user) {
  //       await supabase
  //         .from("likes")
  //         .delete()
  //         .match({ user_id: user.id, tweet_id: tweet.id });
  //       router.refresh();
  //     } else {
  //       await supabase
  //         .from("likes")
  //         .insert({ user_id: user.id, tweet_id: tweet.id });
  //     }
  //     router.refresh();
  //   }
  // }
  const handleClick = async () => {
    const supabase = createClientComponentClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      if (tweet.user_has_liked_tweet) {
        await supabase
          .from("likes")
          .delete()
          .match({ user_id: user.id, tweet_id: tweet.id });
      } else {
        await supabase
          .from("likes")
          .insert({ user_id: user.id, tweet_id: tweet.id });
      }
      router.refresh();
    }
  };
  return (
    <>
      <button onClick={handleClick}>{tweet.likes} Likes</button>
    </>
  );
}
