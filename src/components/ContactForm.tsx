"use client";

import { useState, type FormEvent } from "react";
import { CitationSpinner } from "@/components/CitationSpinner";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/send-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          subject: form.get("subject"),
          message: form.get("message"),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send message");
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
        <h3 className="mt-4 font-display text-heading-xs text-foreground">Message sent</h3>
        <p className="mt-2 text-body leading-relaxed text-muted-foreground">
          Thank you for reaching out! We will get back to you within 1–2 business days.
        </p>
        <button onClick={() => setStatus("idle")} className="btn btn-solid mt-6">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
      <div>
        <label htmlFor="contact-name" className="mb-2 block font-mono text-caption uppercase tracking-widest text-foreground">
          Full Name *
        </label>
        <input type="text" id="contact-name" name="name" required className="field" placeholder="Your name" />
      </div>

      <div>
        <label htmlFor="contact-email" className="mb-2 block font-mono text-caption uppercase tracking-widest text-foreground">
          Email Address *
        </label>
        <input
          type="email"
          id="contact-email"
          name="email"
          required
          className="field"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="contact-subject" className="mb-2 block font-mono text-caption uppercase tracking-widest text-foreground">
          Subject *
        </label>
        <input
          type="text"
          id="contact-subject"
          name="subject"
          required
          className="field"
          placeholder="How can we help?"
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-2 block font-mono text-caption uppercase tracking-widest text-foreground">
          Message *
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          className="field resize-y min-h-[100px]"
          placeholder="Your message..."
        />
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
          "Send Message"
        )}
      </button>
    </form>
  );
}
