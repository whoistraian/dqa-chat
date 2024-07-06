import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    REMOTE_RUNNABLE_URL: z.string().url(),
    API_REWRITE_DESTINATION_URL: z.string().url(),
  },
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {
    NEXT_PUBLIC_OPENAPI_BASE_PATH: z.string().url(),
  },
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    REMOTE_RUNNABLE_URL: process.env.REMOTE_RUNNABLE_URL,
    API_REWRITE_DESTINATION_URL: process.env.API_REWRITE_DESTINATION_URL,
    NEXT_PUBLIC_OPENAPI_BASE_PATH: process.env.NEXT_PUBLIC_OPENAPI_BASE_PATH,
  },
});