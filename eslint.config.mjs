import nextConfig from "eslint-config-next/core-web-vitals";

export default [
  ...nextConfig,
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "next-env.d.ts",
      "payload-types.ts",
      "data/uploads/**",
    ],
  },
  // Browser storage and URL parameters are initialized after hydration in these forms.
  {
    files: ["components/contact-form.tsx", "components/quote-list.tsx"],
    rules: {
      "react-hooks/set-state-in-effect": "off",
    },
  },
];
