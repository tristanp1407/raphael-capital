"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    // In production, send to API route or CRM.
    console.info("Contact form submission", Object.fromEntries(formData));
    form.reset();
    setStatus("submitted");
    window.setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-border-subtle/70 bg-white/95 p-8 shadow-sm"
    >
      <div className="grid gap-3">
        <label className="text-sm font-medium text-inkStrong" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Full name"
          className="rounded-[12px] border border-border-subtle bg-transparent px-4 py-3 text-sm text-ink focus:border-inkStrong focus:outline-none focus:ring-1 focus:ring-inkStrong/50"
        />
      </div>
      <div className="grid gap-3">
        <label className="text-sm font-medium text-inkStrong" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="name@company.com"
          className="rounded-[12px] border border-border-subtle bg-transparent px-4 py-3 text-sm text-ink focus:border-inkStrong focus:outline-none focus:ring-1 focus:ring-inkStrong/50"
        />
      </div>
      <div className="grid gap-3">
        <label className="text-sm font-medium text-inkStrong" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Tell us about the opportunity"
          className="rounded-[12px] border border-border-subtle bg-transparent px-4 py-3 text-sm text-ink focus:border-inkStrong focus:outline-none focus:ring-1 focus:ring-inkStrong/50"
        />
      </div>
      <button
        type="submit"
        className="mt-2 inline-flex items-center justify-center rounded-full border border-transparent bg-rc-navy px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:-translate-y-0.5 hover:bg-rc-indigo focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rc-indigo"
      >
        Send Message
      </button>
      {status === "submitted" ? (
        <p className="text-sm text-ink/80">
          Thank you -- we will respond shortly.
        </p>
      ) : null}
    </form>
  );
}
