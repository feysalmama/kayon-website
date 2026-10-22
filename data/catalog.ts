export type CatalogItem = {
  brand?: { name: string; slug: string };
  slug: string;
  title: string;
  category: string;
  categorySlug?: string;
  summary: string;
  description: string;
  image: string;
  imageAlt: string;
  highlights: string[];
  relatedSolution: string;
};

export const products: CatalogItem[] = [
  {
    slug: "id-card-printers",
    title: "ID card printers",
    category: "ID printing",
    summary: "ID printing hardware for employee badges and organizational identity programmes.",
    description:
      "A range of secure ID card printing systems for organizations producing employee badges and identity cards. The company profile highlights reliable, efficient printing suited to organizations of different sizes.",
    image: "/media/id-card-printers.jpg",
    imageAlt: "ID card printer equipment shown in the company profile",
    highlights: ["Employee badge printing", "Options for different organization sizes", "Printer selection available on request"],
    relatedSolution: "id-card-printing",
  },
  {
    slug: "access-card-readers",
    title: "Access card readers",
    category: "Readers",
    summary: "Credential readers for card-based access and identity applications.",
    description:
      "Access card readers help organizations use card credentials in their identity and access management environments. Contact Kayon Mountain to discuss reader options for your application.",
    image: "/media/access-card-readers.jpg",
    imageAlt: "Access card reader equipment from the supplied profile",
    highlights: ["Card-reader options", "For identity and access applications", "Available configurations on request"],
    relatedSolution: "access-control",
  },
  {
    slug: "desktop-smart-card-readers",
    title: "HID OMNIKEY desktop readers",
    category: "Readers",
    summary: "Desktop smart-card readers for credential-based applications.",
    description:
      "The profile features HID OMNIKEY desktop readers and describes support for credentials including smart cards, mobile phones and wearables, with compatibility across relevant applications and computer operating systems.",
    image: "/media/desktop-smart-card-readers.jpg",
    imageAlt: "Desktop smart-card readers pictured in the company profile",
    highlights: ["HID OMNIKEY desktop readers", "Smart cards, mobile phones and wearables", "Application and operating-system compatibility described in the profile"],
    relatedSolution: "access-control",
  },
  {
    slug: "access-controllers",
    title: "Access controllers",
    category: "Access control",
    summary: "Controller hardware for integrated physical access-control systems.",
    description:
      "Access controllers form part of the integrated systems Kayon Mountain supplies to help safeguard premises and manage access. Configuration is based on the site and the wider security system.",
    image: "/media/access-controllers.jpg",
    imageAlt: "Access-control hardware shown in the company profile",
    highlights: ["For integrated access-control systems", "Site-specific configuration", "System integration support"],
    relatedSolution: "access-control",
  },
  {
    slug: "biometric-readers",
    title: "Biometric readers",
    category: "Biometrics",
    summary: "Biometric devices for identity verification and attendance workflows.",
    description:
      "Biometric readers support secure identification and the time-and-attendance systems presented in the company profile. Device and system selection can be discussed for your organization's requirements.",
    image: "/media/biometric-readers.jpg",
    imageAlt: "Biometric reader devices featured in the company profile",
    highlights: ["Biometric identification", "Time-and-attendance applications", "Available options on request"],
    relatedSolution: "time-and-attendance",
  },
  {
    slug: "intrusion-alarm-systems",
    title: "Intrusion alarm systems",
    category: "Security",
    summary: "Intrusion-detection equipment for business, property and asset protection.",
    description:
      "The profile highlights Acre intrusion systems and describes alarm solutions designed to detect unauthorized access and support security monitoring for businesses, properties and assets.",
    image: "/media/intrusion-alarm-systems.jpg",
    imageAlt: "Intrusion alarm equipment shown in the company profile",
    highlights: ["Intrusion detection", "Alarm-management equipment", "Acre intrusion systems featured in the profile"],
    relatedSolution: "intrusion-alarms",
  },
  {
    slug: "esignature-pads",
    title: "eSignature pads",
    category: "Identity tools",
    summary: "Electronic signature capture devices for digital document workflows.",
    description:
      "ePadLink signature pads are featured in the company profile, including the ePad, ePad II and ePad Vision families. They support electronic signature capture within business workflows.",
    image: "/media/esignature-pads.jpg",
    imageAlt: "Electronic signature pads shown in the company profile",
    highlights: ["ePad, ePad II and ePad Vision shown in the profile", "Electronic signature capture", "Integration options available on request"],
    relatedSolution: "esignature",
  },
  {
    slug: "document-readers",
    title: "Document readers and scanners",
    category: "Identity tools",
    summary: "Readers for scanning and verifying passports and identity documents.",
    description:
      "Document readers support the inspection, authentication and data capture of electronic travel and identity documents. The profile describes uses across border management, banking, hospitality and travel.",
    image: "/media/document-readers.jpg",
    imageAlt: "Travel-document readers pictured in the company profile",
    highlights: ["Travel and identity document scanning", "For document-verification workflows", "Models and specifications available on request"],
    relatedSolution: "document-verification",
  },
  {
    slug: "mobility-enrollment-kits",
    title: "Mobility and enrollment kits",
    category: "Biometrics",
    summary: "Portable identity-enrolment and verification equipment.",
    description:
      "Kayon Mountain describes configurable identity-enrolment kits for government, non-governmental and enterprise needs, alongside mobility systems for identity registration and verification.",
    image: "/media/mobility-enrollment-kits.jpg",
    imageAlt: "Portable identity-enrolment equipment shown in the company profile",
    highlights: ["Portable identity registration and verification", "Configurable enrollment kits", "For government, NGO and enterprise use cases"],
    relatedSolution: "mobility-enrollment",
  },
  {
    slug: "id-card-accessories",
    title: "ID cards and accessories",
    category: "ID printing",
    summary: "Card credentials and finishing accessories for ID programmes and events.",
    description:
      "The company profile lists cards and credentials alongside badge clips, badge reels, badge holders and customized lanyards. Visitor and exhibitor badge rental is also offered for events.",
    image: "/media/id-card-accessories.jpg",
    imageAlt: "ID-card accessories and badge lanyards featured in the company profile",
    highlights: ["Cards and credentials", "Badge clips, reels and holders", "Customized lanyards"],
    relatedSolution: "id-card-printing",
  },
];

export const solutions: CatalogItem[] = [
  {
    slug: "access-control",
    title: "Access control",
    category: "Physical security",
    summary: "Integrated systems to manage access and help safeguard your premises.",
    description:
      "Kayon Mountain integrates access-control systems using readers and controllers to help manage entry, protect information and improve security across a working environment.",
    image: "/media/access-controllers.jpg",
    imageAlt: "Access-control system components",
    highlights: ["Access readers and controllers", "Employee access management", "System integration and configuration"],
    relatedSolution: "access-control",
  },
  {
    slug: "time-and-attendance",
    title: "Time & attendance",
    category: "Workforce systems",
    summary: "Biometric attendance systems for secure, accurate employee tracking.",
    description:
      "The company's time-and-attendance systems use biometric technology to record employee attendance and help organizations streamline attendance tracking.",
    image: "/media/biometric-readers.jpg",
    imageAlt: "Biometric readers used for attendance systems",
    highlights: ["Biometric attendance devices", "Employee attendance tracking", "Scalable system options"],
    relatedSolution: "time-and-attendance",
  },
  {
    slug: "intrusion-alarms",
    title: "Intrusion alarms",
    category: "Physical security",
    summary: "Alarm systems to detect unauthorized access and support a timely response.",
    description:
      "Kayon Mountain offers intrusion-alarm systems that the profile describes as supporting detection and response to unauthorized access attempts, with Acre intrusion equipment featured.",
    image: "/media/intrusion-alarm-systems.jpg",
    imageAlt: "Intrusion alarm system equipment",
    highlights: ["Intrusion detection", "Alarm-management systems", "Equipment for businesses, properties and assets"],
    relatedSolution: "intrusion-alarm-systems",
  },
  {
    slug: "visitor-management",
    title: "Visitor management",
    category: "Identity management",
    summary: "Visitor registration, badge printing and tracking tailored to your organization.",
    description:
      "Visitor-management systems streamline how organizations register, badge and track visitors. The profile also lists contactless check-in, approval workflows, watch-list screening, integrations and large-group check-in.",
    image: "/media/visitor-management.jpg",
    imageAlt: "Visitor-management solution imagery supplied in the company profile",
    highlights: ["Visitor registration and tracking", "Temporary badges and approval workflows", "Contactless and large-group check-in options"],
    relatedSolution: "visitor-management",
  },
  {
    slug: "document-verification",
    title: "Document verification",
    category: "Identity management",
    summary: "Travel-document scanning and verification for identity workflows.",
    description:
      "Document-reader systems inspect, authenticate and capture data from electronic travel and identity documents. The profile notes applications in border management, banking, hospitality and travel.",
    image: "/media/document-readers.jpg",
    imageAlt: "Electronic document readers from the company profile",
    highlights: ["Electronic travel-document verification", "Passport and identity-document scanning", "Solutions for border, banking and travel workflows"],
    relatedSolution: "document-readers",
  },
  {
    slug: "mobility-enrollment",
    title: "Mobility & identity enrollment",
    category: "Identity management",
    summary: "Mobile registration and portable identity-enrollment systems.",
    description:
      "The company provides mobile authentication and identity registration for law enforcement and border-control applications, and configures portable enrollment kits for government, NGO and enterprise needs.",
    image: "/media/mobility-enrollment-kits.jpg",
    imageAlt: "Mobile identity-enrollment equipment",
    highlights: ["Mobile identity registration", "Portable enrollment kits", "Law-enforcement and border-control use cases described in the profile"],
    relatedSolution: "mobility-enrollment-kits",
  },
  {
    slug: "esignature",
    title: "eSignature",
    category: "Digital workflows",
    summary: "Electronic signature capture to support paper-light document workflows.",
    description:
      "eSignature pads support electronic capture of signatures within business document workflows. The company profile features ePadLink signature pads.",
    image: "/media/esignature-pads.jpg",
    imageAlt: "eSignature capture devices",
    highlights: ["Electronic signature capture", "ePadLink devices featured in the profile", "Discuss device and workflow options"],
    relatedSolution: "esignature-pads",
  },
  {
    slug: "id-card-printing",
    title: "ID card printing bureau",
    category: "Identity printing",
    summary: "Outsourced ID card printing, visitor and exhibitor badges, and accessories.",
    description:
      "The profile offers a secure environment for outsourced printing, high-volume ID card printing and visitor or exhibitor ID-card rentals for events. Badge clips, reels, holders and customized lanyards are also available.",
    image: "/media/id-card-printers.jpg",
    imageAlt: "ID card printers used for secure badge printing",
    highlights: ["Outsourced and high-volume ID printing", "Visitor and exhibitor ID rentals", "Badge clips, reels, holders and customized lanyards"],
    relatedSolution: "id-card-printers",
  },
];

export function getProduct(slug: string) {
  return products.find((item) => item.slug === slug);
}

export function getSolution(slug: string) {
  return solutions.find((item) => item.slug === slug);
}
