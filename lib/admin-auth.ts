import { auth } from "./auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function requireAdmin() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/admin/login");
  }

  if (session.user.isAnonymous || session.user.role !== "admin") {
    redirect("/admin/login");
  }

  return session;
}
