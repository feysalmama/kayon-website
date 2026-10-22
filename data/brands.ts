export type ProfileBrand = {
  slug: string;
  name: string;
  logo: string;
  productSlugs: string[];
};

export const profileBrands: ProfileBrand[] = [
  { slug: "hid", name: "HID", logo: "/brand/partners/hid.png", productSlugs: ["desktop-smart-card-readers"] },
  { slug: "acre", name: "Acre", logo: "/brand/partners/acre.png", productSlugs: ["intrusion-alarm-systems"] },
  { slug: "vanderbilt", name: "Vanderbilt", logo: "/brand/partners/vanderbilt.png", productSlugs: [] },
  { slug: "entrust-datacard", name: "Entrust Datacard", logo: "/brand/partners/entrust-datacard.png", productSlugs: [] },
  { slug: "zebra", name: "Zebra", logo: "/brand/partners/zebra.png", productSlugs: [] },
  { slug: "id-psmart", name: "ID-PSmart", logo: "/brand/partners/id-psmart.png", productSlugs: [] },
  { slug: "gen2wave", name: "Gen2wave", logo: "/brand/partners/gen2wave.png", productSlugs: [] },
  { slug: "thales", name: "Thales", logo: "/brand/partners/thales.png", productSlugs: [] },
  { slug: "suprema", name: "Suprema", logo: "/brand/partners/suprema.png", productSlugs: [] },
  { slug: "epadlink", name: "ePadLink", logo: "/brand/partners/epadlink.png", productSlugs: ["esignature-pads"] },
  { slug: "canopus", name: "Canopus", logo: "/brand/partners/canopus.png", productSlugs: [] },
];

export function getProfileBrand(slug: string | null) {
  return profileBrands.find((brand) => brand.slug === slug);
}
