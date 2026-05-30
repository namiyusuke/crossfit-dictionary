"use client";

import { useRouter } from "next/navigation";
import GlobalMenu, { MenuKey } from "./GlobalMenu";

export default function GlobalMenuNav({ active }: { active: MenuKey }) {
  const router = useRouter();

  const handleMenuChange = (key: MenuKey) => {
    if (key === "種目辞典") {
      router.push("/");
    } else if (key === "WOD") {
      router.push("/?section=WOD");
    }
  };

  return <GlobalMenu active={active} onChange={handleMenuChange} />;
}
