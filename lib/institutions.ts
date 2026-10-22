import { getPayload } from "payload";
import config from "../payload.config.ts";
import type { Media } from "@/payload-types";

function getImage(media: number | Media | null | undefined, fallbackAlt: string) {
  if (!media || typeof media !== "object") return null;
  const rawSrc = media.url || (media.filename ? `/api/media/file/${encodeURIComponent(media.filename)}` : "");
  if (!rawSrc) return null;
  return { src: rawSrc.startsWith("/") ? rawSrc : new URL(rawSrc).pathname, alt: media.alt || fallbackAlt };
}

export async function getIndustryInstitutions(industrySlug: string) {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "institutions", where: { industry: { equals: industrySlug } },
    pagination: false, depth: 1, sort: "name",
  });
  return result.docs.map((institution) => ({
    id: institution.id, name: institution.name, projectName: institution.projectName,
    logo: getImage(institution.logo, `${institution.name} logo`),
    projectImage: getImage(institution.projectImage, institution.projectName),
  }));
}
