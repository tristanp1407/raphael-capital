import { cache } from "react";
import { client } from "./client";
import { siteSettingsQuery } from "./queries";
import type { SiteSettings } from "@/types/sanity";

export type ProjectLabels = {
  singular: string;
  plural: string;
};

export const DEFAULT_PROJECT_LABELS: ProjectLabels = {
  singular: "Project",
  plural: "Projects",
};

/**
 * React-cached fetch for the siteSettings singleton. Within a single
 * render pass, repeated callers get a single Sanity request.
 */
export const getSiteSettings = cache(async (): Promise<SiteSettings | null> => {
  try {
    return await client.fetch<SiteSettings | null>(siteSettingsQuery);
  } catch (error) {
    console.error("Failed to fetch site settings:", error);
    return null;
  }
});

/**
 * Admin-configurable label for the "Projects" / "Properties" toggle.
 * Used by: nav, breadcrumbs, default CTAs, auto-generated SEO titles.
 * Editor-authored fields (homepage hero/banner copy, footer tagline, etc.)
 * are intentionally NOT swapped — editors control those directly.
 */
export async function getProjectLabels(): Promise<ProjectLabels> {
  const settings = await getSiteSettings();
  if (!settings) return DEFAULT_PROJECT_LABELS;
  return {
    singular:
      (settings.projectLabelSingular || "").trim() ||
      DEFAULT_PROJECT_LABELS.singular,
    plural:
      (settings.projectLabelPlural || "").trim() ||
      DEFAULT_PROJECT_LABELS.plural,
  };
}

/**
 * Whether the News tab should appear in the main nav and footer Quick Links.
 * Defaults to false so the link stays hidden until the admin enables it.
 */
export async function getShowNewsNav(): Promise<boolean> {
  const settings = await getSiteSettings();
  return Boolean(settings?.showNewsNav);
}
