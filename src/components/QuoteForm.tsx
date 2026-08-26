"use client";

import { useState, type FormEvent } from "react";
import { services } from "@/lib/services";
import { CitationSpinner } from "@/components/CitationSpinner";

export function QuoteForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/send-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          service: form.get("service"),
          details: form.get("details"),
          deadline: form.get("deadline"),
          budget: form.get("budget"),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send quote request");
      }

      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-none border border-brass-500/40 bg-card p-6 text-center sm:p-8">
        <div className="font-mono text-heading-lg text-brass-600 dark:text-brass-500">[✓]</div>
        <h3 className="mt-4 font-display text-heading-xs text-foreground">
          Quote request received
        </h3>
        <p className="mt-2 text-body leading-relaxed text-muted-foreground">
          Thank you! We will review your project details and respond with a detailed quote within
          24 hours.
        </p>
        <button onClick={() => setStatus("idle")} className="btn btn-solid mt-6">
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
      <div>
        <label htmlFor="name" className="mb-2 block font-mono text-caption uppercase tracking-widest text-foreground">
          Full Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="field"
          placeholder="Dr. Jane Smith"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block font-mono text-caption uppercase tracking-widest text-foreground">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="field"
          placeholder="jane.smith@university.edu"
        />
      </div>

      <div>
        <label htmlFor="service" className="mb-2 block font-mono text-caption uppercase tracking-widest text-foreground">
          Service Required *
        </label>
        <select id="service" name="service" required className="field">
          <option value="">Select a service</option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="details" className="mb-2 block font-mono text-caption uppercase tracking-widest text-foreground">
          Project Details *
        </label>
        <textarea
          id="details"
          name="details"
          required
          rows={5}
          className="field resize-y min-h-[100px]"
          placeholder="Describe your project — topic, stage of research, any specific requirements..."
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
        <div>
          <label htmlFor="deadline" className="mb-2 block font-mono text-caption uppercase tracking-widest text-foreground">
            Preferred Deadline
          </label>
          <input type="date" id="deadline" name="deadline" className="field" />
        </div>
        <div>
          <label htmlFor="budget" className="mb-2 block font-mono text-caption uppercase tracking-widest text-foreground">
            Budget Range (USD)
          </label>
          <select id="budget" name="budget" className="field">
            <option value="">Select range</option>
            <option value="under-500">Under $500</option>
            <option value="500-1000">$500 – $1,000</option>
            <option value="1000-2500">$1,000 – $2,500</option>
            <option value="2500-5000">$2,500 – $5,000</option>
            <option value="5000-plus">$5,000+</option>
          </select>
        </div>
      </div>

      {status === "error" && (
        <div
          role="alert"
          className="rounded-none border border-redline-500/40 bg-redline-500/10 p-4 text-footnote text-redline-500"
        >
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn btn-solid w-full disabled:cursor-not-allowed disabled:opacity-55"
      >
        {status === "submitting" ? (
          <>
            <CitationSpinner />
            Sending
          </>
        ) : (
          "Submit Quote Request"
        )}
      </button>
    </form>
  );
}
