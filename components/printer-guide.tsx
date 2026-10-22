"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ArrowRight, Printer } from "lucide-react";

const questions = [
  {
    name: "purpose",
    label: "What will you be printing?",
    options: ["Employee identity cards", "Visitor or exhibitor badges", "More than one card type", "Still exploring"],
  },
  {
    name: "approach",
    label: "How would you prefer to print?",
    options: ["Print in-house", "Outsource card printing", "Considering both", "Not sure yet"],
  },
  {
    name: "volume",
    label: "How would you describe your print volume?",
    options: ["Occasional batches", "Regular batches", "High-volume", "Not sure yet"],
  },
] as const;

export function PrinterGuide() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, string>>({
    purpose: "",
    approach: "",
    volume: "",
  });

  function continueToEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const message = questions
      .map((question) => `${question.label} ${answers[question.name]}`)
      .join("\n");
    const query = new URLSearchParams({
      product: "id-card-printers",
      guide: message,
    });
    router.push(`/contact?${query.toString()}#enquiry`);
  }

  return (
    <details className="printer-guide">
      <summary><Printer size={17} aria-hidden="true" /> Help me choose a card-printing route</summary>
      <div className="printer-guide-content">
        <p>Share a few details to help our team prepare for the conversation. This guide does not recommend a model; exact options are confirmed with you.</p>
        <form onSubmit={continueToEnquiry}>
          {questions.map((question) => (
            <label className="form-field" key={question.name}>
              {question.label}
              <select
                required
                value={answers[question.name]}
                onChange={(event) => setAnswers((current) => ({ ...current, [question.name]: event.target.value }))}
              >
                <option value="">Choose an answer</option>
                {question.options.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </label>
          ))}
          <button className="button button-primary" type="submit">Continue to enquiry <ArrowRight size={16} /></button>
        </form>
      </div>
    </details>
  );
}
