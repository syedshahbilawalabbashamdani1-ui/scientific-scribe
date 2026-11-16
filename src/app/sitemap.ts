import type { MetadataRoute } from "next";

import { resources } from "@/lib/resources";
import { pillars } from "@/lib/services";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { path: "", priority: 1, changeFrequency: "monthly" as const },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/match", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/estimate", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/resources", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.6, changeFrequency: "yearly" as const },
    { path: "/contact", priority: 0.7, changeFrequency: "yearly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  ].map((entry) => ({
    url: `${site.url}${entry.path}`,
    lastModified: now,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));

  const pillarRoutes: MetadataRoute.Sitemap = pillars.map((pillar) => ({
    url: `${site.url}/services/${pillar.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = pillars.flatMap((pillar) =>
    pillar.services.map((service) => ({
      url: `${site.url}/services/${pillar.slug}/${service.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  );

  const resourceRoutes: MetadataRoute.Sitemap = resources.map((resource) => ({
    url: `${site.url}/resources/${resource.slug}`,
    lastModified: new Date(resource.updated),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...pillarRoutes, ...serviceRoutes, ...resourceRoutes];
}
