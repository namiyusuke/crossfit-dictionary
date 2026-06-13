// READ-ONLY production diagnostic. Loads creds from .env.prod (gitignored).
// Runs only SELECT / PRAGMA — no writes, no migrations.
import dotenv from "dotenv";
import { createClient } from "@libsql/client";

dotenv.config({ path: ".env.prod" });

const url = process.env.TURSO_DATABASE_URL || "";
const authToken = process.env.TURSO_AUTH_TOKEN || "";

console.log("URL scheme:", url.split("://")[0] || "(none)");
console.log("TOKEN present:", authToken.length > 0);
if (!url) {
  console.error("\n>>> .env.prod に TURSO_DATABASE_URL が無い。作成して再実行してください。");
  process.exit(2);
}

const client = createClient({ url, ...(authToken && { authToken }) });

try {
  const mig = await client.execute(
    "SELECT count(*) AS c, max(created_at) AS last FROM __drizzle_migrations"
  );
  console.log("applied migrations count:", Number(mig.rows[0].c), "(expected 6 if fully migrated)");

  const cols = await client.execute("PRAGMA table_info(movements)");
  const names = cols.rows.map((r) => r.name);
  console.log("movements has movement_pattern:", names.includes("movement_pattern"));
  console.log("movements has video_source:", names.includes("video_source"));

  const cnt = await client.execute("SELECT count(*) AS c FROM movements");
  console.log("movements row count:", Number(cnt.rows[0].c));

  const t = await client.execute(
    "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name"
  );
  console.log("tables:", t.rows.map((r) => r.name).join(", "));
} catch (e) {
  console.error("READ ERROR:", e.message);
} finally {
  client.close();
}
