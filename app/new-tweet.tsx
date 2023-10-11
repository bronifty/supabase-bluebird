import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default function NewTweet() {
  const addTweet = async (formData: FormData) => {
    "use server";
    const tweet = String(formData.get("tweet"));
    const supabase = createServerActionClient<Database>({ cookies });
    const {
      data: { user },
    } = await supabase.auth.getUser();
    //     insert into
    //   public.tweets (tweet, user_id)
    // values
    //   ('test 2', 'cf36173e-a72a-42f5-a5a5-338d9040e182')
    if (user) {
      const { data, error } = await supabase
        .from("tweets")
        .insert([
          {
            tweet,
            user_id: user.id,
          },
        ])
        .select();
    }
  };

  return (
    <form action={addTweet}>
      <input name="tweet" className="bg-inherit" />
    </form>
  );
}
