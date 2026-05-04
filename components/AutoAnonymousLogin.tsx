"use client";

import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";

export default function AutoAnonymousLogin() {
  useEffect(() => {
    async function ensureSession() {
      const { data: session } = await authClient.getSession();
      if (!session) {
        await authClient.signIn.anonymous();
      }
    }
    ensureSession();
  }, []);

  return null;
}
