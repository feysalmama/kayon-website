import type { GlobalConfig } from "payload";
import { isAdmin } from "../lib/cms-access";

export const defaultSiteSettings = {
  facebook: "",
  instagram: "",
  linkedin: "",
  x: "",
  youtube: "",
  whatsappSupport: "https://wa.me/251930069305",
  telegramSupport: "https://t.me/feysalmama",
  developedBy: "Perfonet ICT Solution PLC",
};

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site settings",
  access: {
    read: () => true,
    update: isAdmin,
  },
  admin: {
    description: "Manage the public website social links, support chat, and development credit.",
  },
  fields: [
    {
      name: "facebook",
      type: "text",
      admin: {
        description: "Full Facebook profile URL.",
      },
    },
    {
      name: "instagram",
      type: "text",
      admin: {
        description: "Full Instagram profile URL.",
      },
    },
    {
      name: "linkedin",
      type: "text",
      admin: {
        description: "Full LinkedIn profile URL.",
      },
    },
    {
      name: "x",
      type: "text",
      admin: {
        description: "Full X/Twitter profile URL.",
      },
    },
    {
      name: "youtube",
      type: "text",
      admin: {
        description: "Full YouTube channel URL.",
      },
    },
    {
      name: "whatsappSupport",
      type: "text",
      defaultValue: defaultSiteSettings.whatsappSupport,
      admin: {
        description: "WhatsApp support link, for example https://wa.me/251930069305.",
      },
    },
    {
      name: "telegramSupport",
      type: "text",
      defaultValue: defaultSiteSettings.telegramSupport,
      admin: {
        description: "Telegram support link, for example https://t.me/your_support_account.",
      },
    },
    {
      name: "developedBy",
      type: "text",
      defaultValue: defaultSiteSettings.developedBy,
      admin: {
        description: "Name shown in the footer as the website developer.",
      },
    },
    {
      name: "developerWebsite",
      label: "Developer website",
      type: "text",
      validate: (value: unknown) => {
        if (!value) return true;
        try {
          const url = new URL(String(value));
          return ["https:", "http:"].includes(url.protocol) ? true : "Enter an HTTP or HTTPS website URL.";
        } catch {
          return "Enter a full website URL, including https://.";
        }
      },
      admin: { description: "The footer's Developed by credit links to this website." },
    },
  ],
};
