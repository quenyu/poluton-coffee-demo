import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/menu", "/visit", "/preorder", "/privacy"].map((path) => ({ url: `${site.url}${path}`, lastModified: new Date("2026-08-13"), changeFrequency: path === "" ? "weekly" : "monthly", priority: path === "" ? 1 : 0.75 }));
}
