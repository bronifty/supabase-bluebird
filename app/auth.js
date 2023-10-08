const token_hash =
  dcc4362965e4fb6033694827773cb3bf21e904cc7f30cc1fb168cdb97233cc532a32eed68a000a648b74e9ff5a4e12d5ccca738066c72691;

const { data, error } = await supabase.auth.verifyOtp({
  token_hash,
  type: "email",
});
