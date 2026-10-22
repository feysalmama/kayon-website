export const industries = [
  {
    slug: "banking-and-finance",
    name: "Banking and finance",
    description: "Explore credential readers, ID card printing and document verification for identity workflows.",
    offerings: [
      { title: "Document verification", href: "/solutions/document-verification" },
      { title: "ID card printers", href: "/products/id-card-printers" },
    ],
  },
  {
    slug: "education",
    name: "Education",
    description: "Consider staff and visitor identification, credential printing and attendance systems.",
    offerings: [
      { title: "Time & attendance", href: "/solutions/time-and-attendance" },
      { title: "Visitor management", href: "/solutions/visitor-management" },
    ],
  },
  {
    slug: "enterprise",
    name: "Enterprise",
    description: "Bring together physical access, identity credentials and visitor-management systems.",
    offerings: [
      { title: "Access control", href: "/solutions/access-control" },
      { title: "Visitor management", href: "/solutions/visitor-management" },
    ],
  },
  {
    slug: "government",
    name: "Government",
    description: "Explore portable identity enrolment, document readers and access-control systems.",
    offerings: [
      { title: "Mobility & enrollment", href: "/solutions/mobility-enrollment" },
      { title: "Document verification", href: "/solutions/document-verification" },
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    description: "Discuss identity credentials, visitor processes and managed physical access.",
    offerings: [
      { title: "Access control", href: "/solutions/access-control" },
      { title: "Visitor management", href: "/solutions/visitor-management" },
    ],
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    description: "Explore visitor registration, document reading and identity verification systems.",
    offerings: [
      { title: "Visitor management", href: "/solutions/visitor-management" },
      { title: "Document verification", href: "/solutions/document-verification" },
    ],
  },
  {
    slug: "manufacturing-and-logistics",
    name: "Manufacturing and logistics",
    description: "Consider access control, biometric attendance and intrusion-alarm systems.",
    offerings: [
      { title: "Access control", href: "/solutions/access-control" },
      { title: "Time & attendance", href: "/solutions/time-and-attendance" },
      { title: "Intrusion alarms", href: "/solutions/intrusion-alarms" },
    ],
  },
  {
    slug: "oil-and-gas",
    name: "Oil and gas",
    description: "Explore physical access, visitor management and intrusion-alarm solutions.",
    offerings: [
      { title: "Access control", href: "/solutions/access-control" },
      { title: "Intrusion alarms", href: "/solutions/intrusion-alarms" },
    ],
  },
  {
    slug: "retail",
    name: "Retail",
    description: "Discuss staff credentials, visitor management and physical access systems.",
    offerings: [
      { title: "Access control", href: "/solutions/access-control" },
      { title: "Time & attendance", href: "/solutions/time-and-attendance" },
    ],
  },
  {
    slug: "travel-and-transportation",
    name: "Travel and transportation",
    description: "Explore travel-document readers, document verification and mobile identity solutions.",
    offerings: [
      { title: "Document verification", href: "/solutions/document-verification" },
      { title: "Mobility & enrollment", href: "/solutions/mobility-enrollment" },
    ],
  },
] as const;

export function getIndustry(slug: string) {
  return industries.find((industry) => industry.slug === slug);
}
