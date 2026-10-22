"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, FileText, ListChecks, Settings2 } from "lucide-react";
import { useState, type KeyboardEvent } from "react";

type ProductDetailTabsProps = {
  title: string;
  description: string;
  specifications: string;
  features: string[];
};

const tabs = [
  { id: "description", label: "Description", icon: FileText },
  { id: "specifications", label: "Specifications", icon: Settings2 },
  { id: "features", label: "Features", icon: ListChecks },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function ProductDetailTabs({ title, description, specifications, features }: ProductDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("description");
  const reduceMotion = useReducedMotion();

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
    let nextIndex = currentIndex;

    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % tabs.length;
    else if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = tabs.length - 1;
    else return;

    event.preventDefault();
    const nextTab = tabs[nextIndex];
    setActiveTab(nextTab.id);
    document.getElementById(`product-tab-${nextTab.id}`)?.focus();
  }

  return (
    <div className="product-detail-tabs">
      <div className="product-detail-tab-list" role="tablist" aria-label={`${title} details`}>
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            id={`product-tab-${id}`}
            className={`product-detail-tab${activeTab === id ? " is-active" : ""}`}
            type="button"
            role="tab"
            aria-selected={activeTab === id}
            aria-controls="product-detail-tabpanel"
            tabIndex={activeTab === id ? 0 : -1}
            onClick={() => setActiveTab(id)}
            onKeyDown={handleTabKeyDown}
          >
            <Icon size={16} aria-hidden="true" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      <div
        className="product-detail-tabpanel"
        id="product-detail-tabpanel"
        role="tabpanel"
        aria-labelledby={`product-tab-${activeTab}`}
        tabIndex={0}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeTab}
            className="product-detail-tab-content"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -5 }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
          >
            {activeTab === "description" && (
              <>
                <p className="product-detail-content-label">Product overview</p>
                <p className="product-detail-description">{description}</p>
              </>
            )}
            {activeTab === "specifications" && (
              <>
                <p className="product-detail-content-label">Technical information</p>
                {specifications ? (
                  <p className="product-detail-description">{specifications}</p>
                ) : (
                  <>
                    <h3>Specifications confirmed for your requirements</h3>
                    <p className="product-detail-description">
                      Model-level technical specifications are not listed in the supplied product profile. Contact our team to confirm exact models, compatibility, configurations and availability for your application.
                    </p>
                  </>
                )}
              </>
            )}
            {activeTab === "features" && (
              <>
                <p className="product-detail-content-label">In this product range</p>
                <ul className="product-detail-feature-list">
                  {features.map((feature) => (
                    <li key={feature}><Check size={16} aria-hidden="true" />{feature}</li>
                  ))}
                </ul>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
