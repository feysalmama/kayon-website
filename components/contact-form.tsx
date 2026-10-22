"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRef } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { solutions } from "@/data/catalog";
import { profileBrands, getProfileBrand } from "@/data/brands";
import { industries } from "@/data/industries";
import { useQuoteList } from "@/components/quote-list";

export function ContactForm() {
  const [interest, setInterest] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [prefilledMessage, setPrefilledMessage] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { products, productSlugs, hydrated, addProduct, removeProduct } = useQuoteList();
  const interests = [
    ...products.map((item) => ({ value: `product:${item.slug}`, label: `Product · ${item.title}` })),
    ...solutions.map((item) => ({ value: `solution:${item.slug}`, label: `Solution · ${item.title}` })),
  ];
  const initialized = useRef(false);

  function removeSelectedProduct(slug: string) {
    const remainingProducts = selectedProducts.filter((item) => item !== slug);
    setSelectedProducts(remainingProducts);
    setInterest((current) => {
      if (current !== "selected-products" && current !== `product:${slug}`) return current;
      if (remainingProducts.length > 1) return "selected-products";
      return remainingProducts[0] ? `product:${remainingProducts[0]}` : "";
    });
    removeProduct(slug);
  }

  useEffect(() => {
    if (!hydrated || initialized.current) return;
    initialized.current = true;
    const searchParams = new URLSearchParams(window.location.search);
    const requestedProducts = (searchParams.get("products") || searchParams.get("product") || "")
      .split(",")
      .filter((slug) => products.some((item) => item.slug === slug));
    const chosenProducts = [...new Set(requestedProducts.length > 0 ? requestedProducts : productSlugs)];
    setSelectedProducts(chosenProducts);
    chosenProducts.forEach(addProduct);
    const product = products.find((item) => item.slug === searchParams.get("product"));
    const solution = solutions.find((item) => item.slug === searchParams.get("interest"));
    const industry = industries.find((item) => item.slug === searchParams.get("industry"));
    if (chosenProducts.length > 1) setInterest("selected-products");
    else if (product) setInterest(`product:${product.slug}`);
    else if (solution) setInterest(`solution:${solution.slug}`);
    else if (industry) setInterest(`industry:${industry.slug}`);
    else if (chosenProducts.length === 1) setInterest(`product:${chosenProducts[0]}`);
    const brand = getProfileBrand(searchParams.get("brand"));
    if (brand) setInterest(`brand:${brand.slug}`);
    const guide = searchParams.get("guide");
    const messageParts: string[] = [];
    if (guide) messageParts.push(`ID card printing requirements:\n${guide}`);
    if (brand) messageParts.push(`Brand enquiry: ${brand.name}. Please confirm currently available products and options.`);
    if (industry) messageParts.push(`Industry: ${industry.name}. Please advise on suitable documented product or solution categories.`);
    if (messageParts.length > 0) setPrefilledMessage(messageParts.join("\n\n"));
  }, [hydrated, productSlugs, addProduct, products]);

  async function submitEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;
    setError("");
    setNotice("");
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          company: data.get("company"),
          email: data.get("email"),
          phone: data.get("phone"),
          interest: data.get("interest"),
          products: selectedProducts,
          message: data.get("message"),
        }),
      });
      const result = await response.json() as { success?: boolean; error?: string };
      if (!response.ok || !result.success) {
        setError(result.error || "We couldn't save your request. Please try again or contact our team by phone or email.");
        return;
      }
      setNotice("Your request has been submitted successfully. Our team will follow up using the contact details you provided.");
      form.reset();
      setInterest("");
      setSelectedProducts([]);
      setPrefilledMessage("");
      selectedProducts.forEach(removeProduct);
    } catch (submitError) {
      console.error("Failed to submit website enquiry.", submitError);
      setError("We couldn't connect to the enquiry service. Please try again or call +251 930 069 305 or email gfuraha24@gmail.com.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="enquiry-form" id="enquiry" onSubmit={submitEnquiry} noValidate>
      <div className="form-grid">
        <label className="form-field">Full name <span aria-hidden="true">*</span>
          <input name="name" autoComplete="name" required minLength={2} placeholder="Your name" />
        </label>
        <label className="form-field">Company
          <input name="company" autoComplete="organization" placeholder="Organization name" />
        </label>
        <label className="form-field">Email address <span aria-hidden="true">*</span>
          <input type="email" name="email" autoComplete="email" required placeholder="you@company.com" />
        </label>
        <label className="form-field">Phone
          <input type="tel" name="phone" autoComplete="tel" placeholder="+251 ..." />
        </label>
        <label className="form-field form-span">Product or service interest
          <select name="interest" value={interest} onChange={(event) => setInterest(event.target.value)}>
            <option value="">Select an area (optional)</option>
            {selectedProducts.length > 1 && <option value="selected-products">Several selected products</option>}
            {products.length > 0 && <optgroup label="Products">{interests.filter((item) => item.value.startsWith("product:")).map((item) => <option value={item.value} key={item.value}>{item.label.replace("Product · ", "")}</option>)}</optgroup>}
            <optgroup label="Solutions">{interests.filter((item) => item.value.startsWith("solution:")).map((item) => <option value={item.value} key={item.value}>{item.label.replace("Solution · ", "")}</option>)}</optgroup>
            <optgroup label="Industries">{industries.map((industry) => <option value={`industry:${industry.slug}`} key={industry.slug}>{industry.name}</option>)}</optgroup>
            <optgroup label="Brands named in our profile">{profileBrands.map((brand) => <option value={`brand:${brand.slug}`} key={brand.slug}>{brand.name} availability enquiry</option>)}</optgroup>
          </select>
        </label>
        {selectedProducts.length > 0 && (
          <div className="form-field form-span selected-products-field">
            <span>Products for this enquiry</span>
            <div className="selected-product-list">
              {selectedProducts.map((slug) => {
                const product = products.find((item) => item.slug === slug);
                if (!product) return null;
                return (
                  <span className="selected-product-chip" key={slug}>
                    {product.title}
                    <button type="button" onClick={() => removeSelectedProduct(slug)} aria-label={`Remove ${product.title} from enquiry`}>
                      <X size={13} />
                    </button>
                  </span>
                );
              })}
            </div>
          </div>
        )}
        <label className="form-field form-span">How can we help? <span aria-hidden="true">*</span>
          <textarea name="message" rows={5} required minLength={10} value={prefilledMessage} onChange={(event) => setPrefilledMessage(event.target.value)} placeholder="Tell us a little about your requirements…" />
        </label>
      </div>
      {notice && <p className="form-status form-status-success" role="status">{notice}</p>}
      {error && <p className="form-status form-status-error" role="alert">{error}</p>}
      <button className="button button-primary form-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? "Submitting request…" : "Submit request"} {!isSubmitting && <ArrowUpRight size={17} aria-hidden="true" />}</button>
      <p className="form-footnote">Your request is securely saved for our team to review. For urgent questions, call +251 930 069 305 or email gfuraha24@gmail.com.</p>
    </form>
  );
}
