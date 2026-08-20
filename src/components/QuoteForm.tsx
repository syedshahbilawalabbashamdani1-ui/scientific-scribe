"use client";

import { useState, type FormEvent } from "react";
import { services } from "@/lib/services";

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
      <div className="rounded-xl border border-accent/30 bg-accent/5 p-6 sm:p-8 text-center">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="text-xl font-bold text-foreground font-serif">Quote Request Received</h3>
        <p className="mt-2 text-muted-foreground">
          Thank you! We will review your project details and respond with a detailed quote within 24 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 inline-flex items-center justify-center px-5 py-3 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-hover transition-colors min-h-[44px]"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
          Full Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full rounded-lg border border-input bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors min-h-[44px]"
          placeholder="Dr. Jane Smith"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full rounded-lg border border-input bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors min-h-[44px]"
          placeholder="jane.smith@university.edu"
        />
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-medium text-foreground mb-2">
          Service Required *
        </label>
        <select
          id="service"
          name="service"
          required
          className="w-full rounded-lg border border-input bg-card px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors min-h-[44px]"
        >
          <option value="">Select a service</option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="details" className="block text-sm font-medium text-foreground mb-2">
          Project Details *
        </label>
        <textarea
          id="details"
          name="details"
          required
          rows={5}
          className="w-full rounded-lg border border-input bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors resize-y min-h-[100px]"
          placeholder="Describe your project — topic, stage of research, any specific requirements..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        <div>
          <label htmlFor="deadline" className="block text-sm font-medium text-foreground mb-2">
            Preferred Deadline
          </label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            className="w-full rounded-lg border border-input bg-card px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors min-h-[44px]"
          />
        </div>
        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-foreground mb-2">
            Budget Range (USD)
          </label>
          <select
            id="budget"
            name="budget"
            className="w-full rounded-lg border border-input bg-card px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors min-h-[44px]"
          >
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
        <div className="rounded-lg bg-destructive/10 border border-destructive/30 p-4 text-sm text-destructive">
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full inline-flex items-center justify-center px-6 py-3 rounded-lg bg-accent text-white font-medium hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
      >
        {status === "submitting" ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending...
          </>
        ) : (
          "Submit Quote Request"
        )}
      </button>
    </form>
  );
}
