import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthButtonServer from "@/app/auth-button-server";
import { redirect } from "next/navigation";
import NewTweet from "@/app/new-tweet";
import Likes from "@/app/likes";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    redirect("/login");
  }
  const { data } = await supabase
    .from("tweets")
    .select("*, profiles(*), likes(user_id)");

  const tweets =
    data?.map((tweet) => ({
      ...tweet,
      user_has_liked_tweet: !!tweet.likes.find(
        (like) => like.user_id === session.user.id
      ),
      likes: tweet.likes.length,
    })) ?? [];
  // const tweets = data?.map((tweet) => ({
  //   ...tweet,
  //   liked_by_user: tweet.user_id === session.user.id,
  //   likes: tweet.likes.length,
  // }));

  console.log(`in Home data from tweets ${JSON.stringify(tweets, null, 2)}`);

  return (
    <>
      <AuthButtonServer />
      <NewTweet />
      {tweets?.map((tweet) => (
        <div key={tweet.id}>
          <div>{tweet.tweet}</div>
          <Likes tweet={tweet} />
        </div>
      ))}
    </>
  );
}
