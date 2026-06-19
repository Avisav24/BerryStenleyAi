// supabase.functions.invoke() returns a FunctionsHttpError for non-2xx
// responses, with the original Response on `.context`. Pull the JSON `error`
// message out of it so we can show the server's reason (e.g. rate limiting).
export async function readFunctionError(error: unknown, fallback: string): Promise<string> {
  try {
    const ctx = (error as { context?: Response })?.context;
    if (ctx && typeof ctx.json === "function") {
      const body = await ctx.json();
      if (body?.error) return body.error as string;
    }
  } catch {
    // ignore parse failures, fall through to fallback
  }
  return fallback;
}
