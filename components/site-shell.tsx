"use client";

import type { ReactNode } from "react";
import { QuoteListProvider, QuoteTray } from "@/components/quote-list";
import { SiteHeader } from "@/components/site-header";
import { PageTransition } from "@/components/page-transition";
import { ManagedImagesProvider } from "@/components/site-image";
import { SupportChat } from "@/components/support-chat";
import { useState } from "react";
import type { CatalogItem } from "@/data/catalog";

export function SiteShell({ children, footer, products }: { children: ReactNode; footer: ReactNode; products: CatalogItem[] }) {
  const [quoteExpanded, setQuoteExpanded] = useState(false);
  const [supportChatOpen, setSupportChatOpen] = useState(false);

  return (
    <QuoteListProvider products={products}>
      <ManagedImagesProvider>
        <SiteHeader />
        <main id="main-content"><PageTransition>{children}</PageTransition></main>
        {footer}
        <div className="floating-action-dock">
          {!supportChatOpen && (
            <QuoteTray
              expanded={quoteExpanded}
              onExpandedChange={(expanded) => {
                setQuoteExpanded(expanded);
                if (expanded) setSupportChatOpen(false);
              }}
            />
          )}
          <SupportChat
            isOpen={supportChatOpen}
            onOpenChange={(open) => {
              setSupportChatOpen(open);
              if (open) setQuoteExpanded(false);
            }}
          />
        </div>
      </ManagedImagesProvider>
    </QuoteListProvider>
  );
}
