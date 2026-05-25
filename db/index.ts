import { drizzle } from "drizzle-orm/libsql/web";
import * as authSchema from "./schemas/auth";
import * as practiceSchema from "./schemas/practice";
import * as movementsSchema from "./schemas/movements";
import * as wodsSchema from "./schemas/wods";

export const db = drizzle({
  connection: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
  schema: {
    ...authSchema,
    ...practiceSchema,
    ...movementsSchema,
    ...wodsSchema,
  },
});
