export type FAQ = { question: string; answer: string };

const productFAQs: Record<string, FAQ[]> = {
  "id-card-printers": [
    {
      question: "Can Kayon Mountain help us choose an ID card printer?",
      answer:
        "Yes. Share whether you are printing in-house or looking for an outsourced service, your intended use and approximate print volume. The team can discuss suitable options; exact models and specifications need to be confirmed.",
    },
    {
      question: "Can we outsource ID card printing instead of buying a printer?",
      answer:
        "The company profile describes a secure ID card printing bureau, high-volume printing and visitor or exhibitor badge rentals for events. Contact the team to discuss the service and project requirements.",
    },
    {
      question: "Which printer models, prices and stock are available?",
      answer:
        "The supplied profile does not list model-level specifications, prices or current stock. Ask the team to confirm the available options for your requirements.",
    },
  ],
  "id-card-accessories": [
    {
      question: "Which card accessories are listed in the company profile?",
      answer:
        "The profile lists badge clips, badge reels, badge holders and customized lanyards, as well as cards and credentials.",
    },
    {
      question: "Are visitor and exhibitor badges available for events?",
      answer:
        "The profile describes visitor and exhibitor ID card rental solutions for events. Contact Kayon Mountain to confirm availability and requirements.",
    },
  ],
  "desktop-smart-card-readers": [
    {
      question: "Which credentials are mentioned for HID OMNIKEY desktop readers?",
      answer:
        "The supplied profile describes support for credentials including smart cards, mobile phones and wearables. Confirm application, device and operating-system compatibility with the team.",
    },
    {
      question: "Which model and technical specifications should we choose?",
      answer:
        "The profile does not specify model-level technical details or current stock. Share your application with the team to discuss suitable options.",
    },
  ],
  "biometric-readers": [
    {
      question: "Can biometric readers be used for attendance?",
      answer:
        "The company profile describes biometric time-and-attendance systems for employee attendance tracking. Discuss your organization's workflow and requirements with the team.",
    },
    {
      question: "Which biometric methods and models are available?",
      answer:
        "Exact reader models and supported biometric methods vary and are not specified in the profile. Contact Kayon Mountain to confirm current options.",
    },
  ],
  "intrusion-alarm-systems": [
    {
      question: "What do Kayon Mountain's intrusion alarm systems do?",
      answer:
        "The profile describes intrusion detection and alarm-management solutions designed to detect unauthorized access attempts and support a response. Project scope should be confirmed with the team.",
    },
    {
      question: "Which alarm system is suitable for our site?",
      answer:
        "Site requirements and available equipment are not specified in the profile. Share details about your premises and security needs so the team can discuss an appropriate configuration.",
    },
  ],
  "document-readers": [
    {
      question: "Which documents can the readers verify?",
      answer:
        "The profile describes readers for electronic travel and identity documents, including passport and identity-document scanning. Confirm document and application compatibility with the team.",
    },
    {
      question: "Can you recommend a reader for our workflow?",
      answer:
        "Share your document types and workflow. Kayon Mountain can discuss suitable options; exact models and supported document formats are not specified in the profile.",
    },
  ],
  "esignature-pads": [
    {
      question: "Which ePadLink devices are featured in the profile?",
      answer:
        "The profile names ePad, ePad II and ePad Vision signature pads. Ask the team to confirm current options and integration requirements.",
    },
  ],
  "mobility-enrollment-kits": [
    {
      question: "What are the mobility and enrollment kits intended for?",
      answer:
        "The company profile describes mobile identity authentication and registration, and configurable enrollment kits for government, NGO and enterprise requirements.",
    },
    {
      question: "Can an enrollment kit be configured for our use case?",
      answer:
        "The profile describes configurable kits. Share your intended workflow and operating environment to discuss requirements with the Kayon Mountain team.",
    },
  ],
  "access-card-readers": [
    {
      question: "How do we choose a card reader?",
      answer:
        "Reader selection depends on the credentials and access-control system for your application. The profile does not list reader protocols or model specifications; ask the team to confirm compatibility.",
    },
  ],
  "access-controllers": [
    {
      question: "Do access controllers work as part of a wider system?",
      answer:
        "The company profile presents controllers as part of integrated access-control systems. Configuration depends on the site and the wider system; discuss compatibility and scope with the team.",
    },
  ],
};

const solutionFAQs: Record<string, FAQ[]> = {
  "access-control": [
    {
      question: "What equipment can form part of an access-control system?",
      answer:
        "The company profile lists access card readers, controllers and biometric readers among its product categories. Equipment selection and how components fit your site should be confirmed for your project.",
    },
    {
      question: "Can the system be tailored to our premises?",
      answer:
        "Kayon Mountain describes customized system-integration solutions. Share your premises, access requirements and existing environment to discuss project scope.",
    },
  ],
  "visitor-management": [
    {
      question: "Which visitor-management workflows are listed in the profile?",
      answer:
        "The profile lists registration, badge printing and visitor tracking, along with contactless check-in, approval workflows, large-group check-in, integrations and watch-list screening.",
    },
    {
      question: "Can the process be adapted for our organization?",
      answer:
        "The company describes tailored visitor-management solutions because requirements vary by organization. Contact the team to discuss your workflow and project requirements.",
    },
  ],
  "time-and-attendance": [
    {
      question: "What does the time-and-attendance solution cover?",
      answer:
        "The profile describes biometric time-and-attendance systems for secure employee attendance tracking. The exact device, reporting and integration scope should be confirmed with the team.",
    },
  ],
  "intrusion-alarms": [
    {
      question: "What is the purpose of an intrusion alarm system?",
      answer:
        "The profile describes intrusion detection and alarm-management functionality intended to detect unauthorized access attempts and support response.",
    },
  ],
  "document-verification": [
    {
      question: "Which workflows can document readers support?",
      answer:
        "The company profile describes inspection, authentication and data capture for electronic travel and identity documents, with applications including border management, banking, hospitality and travel.",
    },
  ],
  "mobility-enrollment": [
    {
      question: "Who are the mobility and enrollment solutions intended for?",
      answer:
        "The profile describes identity registration and mobile authentication for law-enforcement and border-control use cases, as well as configurable enrollment kits for government, NGO and enterprise requirements.",
    },
  ],
  esignature: [
    {
      question: "What does the eSignature solution provide?",
      answer:
        "The company profile describes electronic signature capture using ePadLink devices. Confirm supported software and integration requirements with the team.",
    },
  ],
  "id-card-printing": [
    {
      question: "Can Kayon Mountain print cards for an organization or event?",
      answer:
        "The profile describes outsourced high-volume ID card printing and visitor or exhibitor badge rentals for events. Contact the team to discuss your requirements.",
    },
    {
      question: "Are badge holders and lanyards also available?",
      answer:
        "The company profile lists badge clips, reels, holders and customized lanyards alongside its card printing service.",
    },
  ],
};

export function getProductFAQs(slug: string): FAQ[] {
  return productFAQs[slug] ?? [
    {
      question: "How do we confirm the right option for our needs?",
      answer:
        "Share your intended application and requirements with the Kayon Mountain team. Exact models, specifications and current availability should be confirmed directly.",
    },
  ];
}

export function getSolutionFAQs(slug: string): FAQ[] {
  return solutionFAQs[slug] ?? [
    {
      question: "How do we scope this solution for our organization?",
      answer:
        "Contact Kayon Mountain to discuss your environment, workflow and project requirements. The team can confirm the appropriate scope and available options.",
    },
  ];
}
