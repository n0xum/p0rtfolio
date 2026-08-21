import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";

export const dynamic = "force-static";

const BASE_URL = "https://alexander-kruska.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const homeEntry: MetadataRoute.Sitemap[number] = {
    url: `${BASE_URL}/`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1.0,
  };

  const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${BASE_URL}/projects/${project.slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [homeEntry, ...projectEntries];
}
