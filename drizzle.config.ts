import { type Config } from "drizzle-kit";

import { env } from "@fluffy-happiness/env";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["fluffy-happiness_*"],
} satisfies Config;
