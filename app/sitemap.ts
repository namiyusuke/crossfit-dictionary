import type { MetadataRoute } from "next";
import { getAllWods } from "@/lib/data/wods";
import { getAllMovements } from "@/lib/data/movements";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wodex.attcraft.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [wods, movements] = await Promise.all([getAllWods(), getAllMovements()]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  const wodRoutes: MetadataRoute.Sitemap = wods.map((wod) => ({
    url: `${siteUrl}/wod/${wod.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const movementRoutes: MetadataRoute.Sitemap = movements.map((movement) => ({
    url: `${siteUrl}/movement/${movement.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...wodRoutes, ...movementRoutes];
}
