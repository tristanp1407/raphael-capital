"use client";

import { FormEvent, useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }

      form.reset();
      setStatus("success");
      window.setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to send message. Please try again."
      );
      window.setTimeout(() => setStatus("idle"), 5000);
    }
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
        disabled={status === "submitting" || status === "success"}
        className={`mt-2 inline-flex items-center justify-center rounded-full border border-transparent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed ${
          status === "success"
            ? "bg-green-600 hover:bg-green-600"
            : "bg-rc-navy hover:-translate-y-0.5 hover:bg-rc-indigo focus-visible:outline-rc-indigo"
        } ${status === "submitting" ? "opacity-50 hover:translate-y-0" : ""}`}
      >
        {status === "submitting" && "Sending..."}
        {status === "success" && "✓ Message Sent"}
        {(status === "idle" || status === "error") && "Send Message"}
      </button>
      {status === "success" ? (
        <p className="text-sm text-green-700">
          ✓ Thank you -- we will respond shortly.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="text-sm text-red-700">
          ✗ {errorMessage || "Failed to send message. Please try again."}
        </p>
      ) : null}
    </form>
  );
}
