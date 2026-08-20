"use client";

import { useState, type FormEvent } from "react";

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
      <div className="rounded-xl border border-accent/30 bg-accent/5 p-6 sm:p-8 text-center">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="text-xl font-bold text-foreground font-serif">Message Sent</h3>
        <p className="mt-2 text-muted-foreground">
          Thank you for reaching out! We will get back to you within 1–2 business days.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 inline-flex items-center justify-center px-5 py-3 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-hover transition-colors min-h-[44px]"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-2">
          Full Name *
        </label>
        <input
          type="text"
          id="contact-name"
          name="name"
          required
          className="w-full rounded-lg border border-input bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors min-h-[44px]"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-2">
          Email Address *
        </label>
        <input
          type="email"
          id="contact-email"
          name="email"
          required
          className="w-full rounded-lg border border-input bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors min-h-[44px]"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="contact-subject" className="block text-sm font-medium text-foreground mb-2">
          Subject *
        </label>
        <input
          type="text"
          id="contact-subject"
          name="subject"
          required
          className="w-full rounded-lg border border-input bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors min-h-[44px]"
          placeholder="How can we help?"
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-2">
          Message *
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          className="w-full rounded-lg border border-input bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors resize-y min-h-[100px]"
          placeholder="Your message..."
        />
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
          "Send Message"
        )}
      </button>
    </form>
  );
}
