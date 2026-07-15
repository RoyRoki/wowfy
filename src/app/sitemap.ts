import type { MetadataRoute } from "next";
import projectsData from "@/data/projects.json";
import productsData from "@/data/products.json";

const BASE_URL = "https://www.rokiroy.in";

// trailingSlash: true is set in next.config, so URLs are emitted with a trailing slash.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const home: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  const projects: MetadataRoute.Sitemap = (
    projectsData as Array<{ id: string }>
  ).map((project) => ({
    url: `${BASE_URL}/projects/${project.id}/`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const products: MetadataRoute.Sitemap = (
    productsData as Array<{ id: string }>
  ).map((product) => ({
    url: `${BASE_URL}/products/${product.id}/`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...home, ...projects, ...products];
}
