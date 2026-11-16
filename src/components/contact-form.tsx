"use client";

import Link from "next/link";
import { useState } from "react";
import {
  PiArrowUpRight,
  PiCheckCircle,
  PiCopy,
  PiEnvelopeSimple,
  PiPaperPlaneTilt,
} from "react-icons/pi";

import { mailto, site } from "@/lib/site";
import { pillars, researchStages } from "@/lib/services";

type FormState = {
  name: string;
  email: string;
  organisation: string;
  stage: string;
  service: string;
  deadline: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  organisation: "",
  stage: "",
  service: "",
  deadline: "",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [sent, setSent] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");

  const summary = [
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    form.organisation ? `Role / institution: ${form.organisation}` : null,
    form.stage ? `Research stage: ${form.stage}` : null,
    form.service ? `Service: ${form.service}` : null,
    form.deadline ? `Deadline: ${form.deadline}` : null,
    "",
    form.message,
  ]
    .filter(Boolean)
    .join("\n");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    if (errors[key]) {
      setErrors((current) => ({ ...current, [key]: undefined }));
    }
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Add your name so we know who to reply to.";
    if (!form.email.trim()) {
      next.email = "Add an email address for the reply.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = "Check the email address, then try again.";
    }
    if (!form.message.trim() || form.message.trim().length < 20) {
      next.message = "Add a little more detail (at least 20 characters).";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;

    const subject = form.service
      ? `Scope check: ${form.service}`
      : "Scope check request";
    window.location.href = mailto(subject, summary);
    setSent(true);
    setCopyState("idle");
  }

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(
        `${summary}\n\nSend to: ${site.email}`,
      );
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  }

  if (sent) {
    return (
      <div className="card p-5 sm:p-7" aria-live="polite">
        <div className="flex items-center gap-2 text-accent-text">
          <PiCheckCircle className="h-4 w-4" aria-hidden="true" />
          <p className="meta-strong">Scope note prepared</p>
        </div>
        <h2 className="mt-3 text-[1.5rem] font-medium tracking-[-0.04em]">
          Your email app should be opening.
        </h2>
        <p className="mt-2 max-w-[52ch] text-[12.5px] leading-relaxed text-quiet">
          Send the message and we will reply {site.responseTime}. If your email
          app did not open, copy the summary and send it directly.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <button type="button" onClick={copySummary} className="btn btn-primary btn-sm">
            <PiCopy className="h-3.5 w-3.5" aria-hidden="true" />
            {copyState === "copied" ? "Copied" : "Copy summary"}
          </button>
          <a href={`mailto:${site.email}`} className="btn btn-outline btn-sm">
            <PiEnvelopeSimple className="h-3.5 w-3.5" aria-hidden="true" />
            Email directly
          </a>
        </div>
        {copyState === "failed" && (
          <p className="mt-3 text-[11px] text-accent-text">
            Copying was blocked by the browser. Use the email link instead.
          </p>
        )}
        <details className="mt-5 border-t border-line pt-4">
          <summary className="cursor-pointer text-[11.5px] text-quiet [&::-webkit-details-marker]:hidden">
            Show the message summary
          </summary>
          <pre className="mt-3 whitespace-pre-wrap bg-tint p-3 font-mono text-[10.5px] leading-relaxed text-quiet">
            {summary}
          </pre>
        </details>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setForm(initialState);
          }}
          className="mt-5 text-[11.5px] text-quiet underline decoration-line underline-offset-4 hover:text-ink"
        >
          Start another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card p-5 sm:p-7">
      <div className="flex items-center justify-between border-b border-line pb-3">
        <p className="meta">Scope request</p>
        <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-quiet">
          Confidential
        </p>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="field-label">
            Name <span className="text-accent-text">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            className="field"
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "error-name" : undefined}
          />
          {errors.name && (
            <p id="error-name" className="mt-1.5 text-[10.5px] text-accent-text">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-email" className="field-label">
            Email <span className="text-accent-text">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            className="field"
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "error-email" : undefined}
          />
          {errors.email && (
            <p id="error-email" className="mt-1.5 text-[10.5px] text-accent-text">
              {errors.email}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-organisation" className="field-label">
            Role or institution <span className="normal-case tracking-normal">(optional)</span>
          </label>
          <input
            id="contact-organisation"
            name="organisation"
            autoComplete="organization"
            className="field"
            value={form.organisation}
            onChange={(event) => update("organisation", event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="contact-stage" className="field-label">
            Research stage
          </label>
          <select
            id="contact-stage"
            name="stage"
            className="field"
            value={form.stage}
            onChange={(event) => update("stage", event.target.value)}
          >
            <option value="">Select a stage</option>
            {researchStages.map((stage) => (
              <option key={stage.id} value={stage.label}>
                {stage.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="contact-service" className="field-label">
            Service
          </label>
          <select
            id="contact-service"
            name="service"
            className="field"
            value={form.service}
            onChange={(event) => update("service", event.target.value)}
          >
            <option value="">Not sure yet</option>
            {pillars.map((pillar) => (
              <optgroup key={pillar.slug} label={pillar.name}>
                {pillar.services.map((service) => (
                  <option key={service.slug} value={service.title}>
                    {service.title}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-deadline" className="field-label">
            Target deadline
          </label>
          <select
            id="contact-deadline"
            name="deadline"
            className="field"
            value={form.deadline}
            onChange={(event) => update("deadline", event.target.value)}
          >
            <option value="">No fixed date</option>
            <option value="Flexible">Flexible</option>
            <option value="2–4 weeks">2–4 weeks</option>
            <option value="1–2 weeks">1–2 weeks</option>
            <option value="Under 1 week">Under 1 week</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className="field-label">
            What are you working on? <span className="text-accent-text">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            className="field"
            placeholder="Research question, target journal, word count, dataset size, and what you need help with."
            value={form.message}
            onChange={(event) => update("message", event.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "error-message" : "hint-message"}
          />
          {errors.message ? (
            <p id="error-message" className="mt-1.5 text-[10.5px] text-accent-text">
              {errors.message}
            </p>
          ) : (
            <p id="hint-message" className="mt-1.5 text-[10.5px] text-quiet">
              Do not attach confidential files yet. We will send a secure route
              after the first reply.
            </p>
          )}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4">
        <p className="max-w-[40ch] text-[10.5px] leading-relaxed text-quiet">
          By sending this enquiry you agree to be contacted about it. Read the{" "}
          <Link href="/privacy" className="link-underline">
            privacy notes
          </Link>
          .
        </p>
        <button type="submit" className="btn btn-primary">
          Request a scope check
          <PiPaperPlaneTilt className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <p className="mt-3 flex items-center gap-1.5 text-[9.5px] text-quiet">
        <PiArrowUpRight className="h-3 w-3" aria-hidden="true" />
        This form opens your email app with the details filled in.
      </p>
    </form>
  );
}
