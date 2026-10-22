import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { REST_GET, REST_OPTIONS } from "@payloadcms/next/routes";
import { solutions } from "@/data/catalog";
import { getProducts } from "@/lib/products";
import { profileBrands } from "@/data/brands";
import { industries } from "@/data/industries";

const payloadGet = REST_GET(config);
const payloadOptions = REST_OPTIONS(config);

export function GET(request: Request) {
  return payloadGet(request, { params: Promise.resolve({ slug: ["enquiries"] }) });
}

export function OPTIONS(request: Request) {
  return payloadOptions(request, { params: Promise.resolve({ slug: ["enquiries"] }) });
}

type EnquiryInput = {
  name?: unknown;
  company?: unknown;
  email?: unknown;
  phone?: unknown;
  interest?: unknown;
  products?: unknown;
  message?: unknown;
};

function cleanText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  let input: EnquiryInput;
  try {
    input = await request.json() as EnquiryInput;
  } catch {
    return NextResponse.json({ error: "Please submit the enquiry form with valid information." }, { status: 400 });
  }

  const name = cleanText(input.name, 120);
  const company = cleanText(input.company, 160);
  const email = cleanText(input.email, 254);
  const phone = cleanText(input.phone, 50);
  const interestValue = cleanText(input.interest, 200);
  const message = cleanText(input.message, 5000);
  const selectedSlugs = Array.isArray(input.products)
    ? [...new Set(input.products.filter((slug): slug is string => typeof slug === "string"))].slice(0, 30)
    : [];
  const products = await getProducts();
  const validProducts = selectedSlugs.filter((slug) => products.some((product) => product.slug === slug));
  const productNames = validProducts
    .map((slug) => products.find((product) => product.slug === slug)?.title)
    .filter((title): title is string => Boolean(title));

  const knownInterests = [
    ...products.map((product) => [`product:${product.slug}`, product.title] as const),
    ...solutions.map((solution) => [`solution:${solution.slug}`, solution.title] as const),
    ...profileBrands.map((brand) => [`brand:${brand.slug}`, brand.name] as const),
    ...industries.map((industry) => [`industry:${industry.slug}`, industry.name] as const),
  ];
  const interest = knownInterests.find(([value]) => value === interestValue)?.[1] || cleanText(input.interest, 200);

  if (name.length < 2) return NextResponse.json({ error: "Enter your full name." }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  if (message.length < 10) return NextResponse.json({ error: "Please include a message of at least 10 characters." }, { status: 400 });
  if (Array.isArray(input.products) && validProducts.length !== selectedSlugs.length) {
    return NextResponse.json({ error: "One or more selected products are invalid. Please refresh and try again." }, { status: 400 });
  }

  try {
    const payload = await getPayload({ config });
    const enquiry = await payload.create({
      collection: "enquiries",
      data: {
        name,
        company: company || undefined,
        email,
        phone: phone || undefined,
        interest: interest || undefined,
        products: productNames.join(", ") || undefined,
        message,
        status: "new",
      },
      overrideAccess: true,
      draft: false,
    });
    return NextResponse.json({ success: true, id: enquiry.id }, { status: 201 });
  } catch (error) {
    console.error("Failed to save website enquiry.", error);
    return NextResponse.json({ error: "We couldn't save your request right now. Please try again or contact our team by phone or email." }, { status: 500 });
  }
}
