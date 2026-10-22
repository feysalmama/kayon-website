"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Bot, Headphones, MessageCircle, Send, X } from "lucide-react";

type SupportChannels = {
  whatsapp: string | null;
  telegram: string | null;
};

const suggestedMessages = [
  { label: "Products", message: "I'd like to learn about your products." },
  { label: "Technical help", message: "I need technical support." },
  { label: "Sales", message: "I'd like to speak with your sales team." },
];

async function getSupportChannels(): Promise<SupportChannels> {
  const response = await fetch("/api/support-chat", { cache: "no-store" });
  if (!response.ok) throw new Error(`Support settings request failed with status ${response.status}.`);

  const result: unknown = await response.json();
  if (typeof result !== "object" || result === null || Array.isArray(result)) {
    throw new Error("Support settings response has an invalid format.");
  }

  const settings = result as Record<string, unknown>;
  const { whatsapp, telegram } = settings;
  if (
    settings.configured !== true ||
    !(whatsapp === null || typeof whatsapp === "string") ||
    !(telegram === null || typeof telegram === "string")
  ) {
    throw new Error("Support settings response is missing valid channel links.");
  }

  return { whatsapp, telegram };
}

function makeMessageLink(value: string | null | undefined, message: string, platform: "whatsapp" | "telegram") {
  if (!value) return null;

  try {
    const url = new URL(value);
    const allowedHosts =
      platform === "whatsapp" ? ["wa.me", "api.whatsapp.com"] : ["t.me", "telegram.me"];

    if (url.protocol !== "https:" || url.port || url.username || url.password || !allowedHosts.includes(url.hostname)) return null;
    url.searchParams.set("text", message);
    return url.toString();
  } catch {
    return null;
  }
}

export function SupportChat({ isOpen, onOpenChange }: { isOpen: boolean; onOpenChange: (open: boolean) => void }) {
  const [message, setMessage] = useState("");
  const [channels, setChannels] = useState<SupportChannels | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let active = true;

    getSupportChannels()
      .then((nextChannels) => {
        if (active) setChannels(nextChannels);
      })
      .catch((error: unknown) => {
        if (!active) return;
        console.error("Unable to load support chat settings.", error);
        setChannels(null);
        setLoadError(true);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  function retryLoadingChannels() {
    setIsLoading(true);
    setLoadError(false);
    getSupportChannels()
      .then(setChannels)
      .catch((error: unknown) => {
        console.error("Unable to load support chat settings.", error);
        setChannels(null);
        setLoadError(true);
      })
      .finally(() => setIsLoading(false));
  }

  const whatsappLink = makeMessageLink(channels?.whatsapp, message, "whatsapp");
  const telegramLink = makeMessageLink(channels?.telegram, message, "telegram");

  return (
    <div className="support-chat">
      {isOpen && (
        <section className="support-chat-panel" role="dialog" aria-label="Kayon support chat">
          <header className="support-chat-header">
            <span className="support-chat-avatar"><Headphones size={19} aria-hidden="true" /></span>
            <div>
              <p>Kayon support</p>
              <span>Here to help you find the right solution</span>
            </div>
            <button
              className="support-chat-close"
              type="button"
              aria-label="Close support chat"
              onClick={() => onOpenChange(false)}
            >
              <X size={18} aria-hidden="true" />
            </button>
          </header>
          <div className="support-chat-body">
            <p className="support-chat-greeting">Hello! How can our team help you today?</p>
            <div className="support-chat-suggestions" aria-label="Suggested messages">
              {suggestedMessages.map(({ label, message: suggestedMessage }) => (
                <button key={label} type="button" onClick={() => setMessage(suggestedMessage)}>
                  {label}
                </button>
              ))}
            </div>
            <label className="support-chat-label" htmlFor="support-chat-message">Your message</label>
            <textarea
              id="support-chat-message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Tell us what you need help with..."
              maxLength={500}
              rows={3}
            />
            <p className="support-chat-hint">Choose a channel to continue the conversation.</p>
            <div className="support-chat-channels">
              {isLoading && <p>Loading support channels...</p>}
              {loadError && (
                <div className="support-chat-error" role="alert">
                  <p>Support options could not be loaded.</p>
                  <button type="button" onClick={retryLoadingChannels}>Try again</button>
                </div>
              )}
              {!isLoading && !loadError && (
                <>
                  {whatsappLink ? (
                    <a href={whatsappLink} target="_blank" rel="noreferrer">
                      <MessageCircle size={17} aria-hidden="true" />
                      WhatsApp
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </a>
                  ) : (
                    <p>WhatsApp support is not configured yet.</p>
                  )}
                  {telegramLink ? (
                    <a href={telegramLink} target="_blank" rel="noreferrer">
                      <Send size={16} aria-hidden="true" />
                      Telegram
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </a>
                  ) : (
                    <p>Telegram support is not configured yet.</p>
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      )}
      <button
        className={`support-chat-launcher${isOpen ? " is-open" : ""}`}
        type="button"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close support chat" : "Open support chat"}
        onClick={() => onOpenChange(!isOpen)}
      >
        {isOpen ? <X size={22} aria-hidden="true" /> : <Bot size={23} aria-hidden="true" />}
      </button>
    </div>
  );
}
