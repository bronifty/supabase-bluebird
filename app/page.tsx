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
  const { data: tweets } = await supabase
    .from("tweets")
    .select("*, profiles(*), likes(*)");

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
