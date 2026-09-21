"use client";

/**
 * Contact form wired to Formspree (JSON POST) with loading →
 * success micro-interactions and graceful error surfacing.
 */
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Status = "idle" | "loading" | "success" | "error";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mbglgyzq";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const update =
    (field: keyof typeof form) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
      if (status === "error") setStatus("idle");
    };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        const data = (await res.json().catch(() => null)) as {
          errors?: { message?: string }[];
        } | null;
        const msg = data?.errors?.[0]?.message;
        setError(
          msg ??
            "Something went wrong on our end. Please try again or email directly."
        );
        setStatus("error");
      }
    } catch {
      setError(
        "Network error — message not sent. Please try again or email directly."
      );
      setStatus("error");
    }
  }

  const inputClass =
    "w-full rounded-md border-2 border-ink bg-paper-card px-4 py-3 font-body text-sm text-ink placeholder:text-ink/35 focus:border-cobalt focus:outline-none transition-colors";
  const labelClass =
    "mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-ink-soft";

  return (
    <form onSubmit={handleSubmit} noValidate={false} aria-live="polite">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={labelClass}>
            Name *
          </label>
          <input
            id="cf-name"
            name="name"
            required
            autoComplete="name"
            value={form.name}
            onChange={update("name")}
            placeholder="Jane Doe"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="cf-email" className={labelClass}>
            Email *
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={update("email")}
            placeholder="jane@company.com"
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="cf-subject" className={labelClass}>
          Subject
        </label>
        <input
          id="cf-subject"
          name="subject"
          value={form.subject}
          onChange={update("subject")}
          placeholder="Role / project / hello"
          className={inputClass}
        />
      </div>

      <div className="mt-5">
        <label htmlFor="cf-message" className={labelClass}>
          Message *
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={6}
          value={form.message}
          onChange={update("message")}
          placeholder="Tell me about the role or project…"
          className={`${inputClass} resize-y`}
        />
      </div>

      <AnimatePresence mode="wait">
        {status === "error" && error && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="alert"
            className="mt-4 rounded-md border-2 border-vermilion bg-vermilion/10 px-4 py-3 text-sm text-vermilion"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <motion.button
        type="submit"
        data-cursor="magnetic"
        disabled={status === "loading" || status === "success"}
        animate={
          status === "success"
            ? { scale: [1, 1.04, 1] }
            : { scale: 1 }
        }
        transition={{ duration: 0.45 }}
        className={`mt-7 inline-flex min-w-44 items-center justify-center gap-2 rounded-full border-2 border-ink px-8 py-3.5 font-mono text-xs font-semibold uppercase tracking-wider shadow-card-sm transition-colors ${
          status === "success"
            ? "bg-cobalt text-paper"
            : "bg-ink text-paper hover:bg-vermilion disabled:opacity-70"
        }`}
      >
        {status === "loading" && (
          <span
            aria-hidden="true"
            className="h-4 w-4 animate-spin rounded-full border-2 border-paper/40 border-t-paper"
          />
        )}
        {status === "loading" && "Sending…"}
        {status === "idle" && "Send Message →"}
        {status === "error" && "Retry — Send Message →"}
        {status === "success" && "Message Sent ✓"}
      </motion.button>

      <AnimatePresence>
        {status === "success" && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 text-sm text-cobalt"
          >
            Thanks — your message is in. I usually reply within a day.
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
