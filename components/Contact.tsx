"use client";

import RevealSection from "@/components/RevealSection";
import SectionHeader from "@/components/SectionHeader";
import { personalInfo } from "@/lib/data";
import { motion } from "framer-motion";
import { FormEvent, useMemo, useState } from "react";
import { FiCheckCircle, FiGithub, FiLinkedin, FiMail, FiMapPin, FiPhone, FiSend } from "react-icons/fi";
import { SiLeetcode, SiWhatsapp } from "react-icons/si";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorText, setErrorText] = useState("");

  const whatsappMessage = encodeURIComponent(
    `Hi ${personalInfo.name.split(" ")[0]}! I saw your portfolio and would like to connect.`
  );

  const contactCards = useMemo(
    () => [
      {
        icon: <FiMail />,
        label: "Email",
        value: personalInfo.email,
        onClick: () => window.open(`mailto:${personalInfo.email}`)
      },
      {
        icon: <SiWhatsapp />,
        label: "WhatsApp",
        value: personalInfo.phone,
        onClick: () => window.open(`https://wa.me/${personalInfo.whatsapp}?text=${whatsappMessage}`, "_blank", "noopener,noreferrer")
      },
      {
        icon: <FiPhone />,
        label: "Call",
        value: personalInfo.phone,
        onClick: () => window.open(`tel:+${personalInfo.whatsapp}`)
      },
      {
        icon: <FiGithub />,
        label: "GitHub",
        value: personalInfo.github.replace("https://", ""),
        onClick: () => window.open(personalInfo.github, "_blank", "noopener,noreferrer")
      },
      {
        icon: <SiLeetcode />,
        label: "LeetCode",
        value: personalInfo.leetcode.replace("https://", ""),
        onClick: () => window.open(personalInfo.leetcode, "_blank", "noopener,noreferrer")
      },
      {
        icon: <FiLinkedin />,
        label: "LinkedIn",
        value: "Connect on LinkedIn",
        onClick: () => window.open(personalInfo.linkedin, "_blank", "noopener,noreferrer")
      },
      {
        icon: <FiMapPin />,
        label: "Location",
        value: `${personalInfo.locationShort} | ${personalInfo.openToShort} OK`
      }
    ],
    [whatsappMessage]
  );

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus("idle");
    setErrorText("");

    try {
      const response = await fetch("https://formspree.io/f/xykovdaz", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Unable to submit form");
      }

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setStatus("error");
      setErrorText(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <RevealSection id="contact" className="px-4 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index="06 / Contact"
          title="Let&apos;s Build Something Together"
          subtitle="Open to AI Engineer, LLM Engineer & Python Developer roles. Available immediately."
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            className="space-y-3"
          >
            {contactCards.map((item) => (
              <motion.button
                key={item.label}
                type="button"
                variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-card p-4 text-left disabled:cursor-default"
                onClick={item.onClick}
                disabled={!item.onClick}
              >
                <span className="rounded-lg bg-teal-400/10 p-2 text-teal-300">{item.icon}</span>
                <span>
                  <span className="block text-xs text-textMuted">{item.label}</span>
                  <span className="text-sm text-textPrimary">{item.value}</span>
                </span>
              </motion.button>
            ))}

              <motion.div
                animate={{ opacity: [0.8, 1, 0.8], scale: [1, 1.01, 1] }}
                transition={{ repeat: Infinity, duration: 1.6 }}
                className="mt-4 rounded-full border border-green-400/40 bg-green-400/10 px-4 py-2 text-center text-sm text-green-300"
              >
                🟢 {personalInfo.availableText}
              </motion.div>
          </motion.div>

          <div className="rounded-2xl border border-white/10 bg-card p-6">
            <form
              onSubmit={onSubmit}
              className="space-y-4"
            >
              {/* Get free form ID at formspree.io */}
              <input
                required
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                placeholder="Name"
                className="w-full rounded-lg border border-white/10 bg-surface px-4 py-3 text-sm text-textPrimary outline-none transition-all focus:border-emerald-400/60"
              />
              <input
                required
                type="email"
                value={form.email}
                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                placeholder="Email"
                className="w-full rounded-lg border border-white/10 bg-surface px-4 py-3 text-sm text-textPrimary outline-none transition-all focus:border-emerald-400/60"
              />
              <input
                value={form.subject}
                onChange={(event) => setForm((prev) => ({ ...prev, subject: event.target.value }))}
                placeholder="Subject (optional)"
                className="w-full rounded-lg border border-white/10 bg-surface px-4 py-3 text-sm text-textPrimary outline-none transition-all focus:border-emerald-400/60"
              />
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
                placeholder="Message"
                className="w-full rounded-lg border border-white/10 bg-surface px-4 py-3 text-sm text-textPrimary outline-none transition-all focus:border-emerald-400/60"
              />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={submitting}
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 font-semibold transition-all duration-300 disabled:opacity-70"
                style={{
                  background: "linear-gradient(135deg, #10b981, #059669)",
                  color: "#0a0f1a",
                  boxShadow: "0 0 20px rgba(16,185,129,0.35)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 30px rgba(16,185,129,0.6), 0 8px 24px rgba(0,0,0,0.35)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 20px rgba(16,185,129,0.35)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {submitting ? (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="h-5 w-5 rounded-full border-2 border-background border-t-transparent"
                  />
                ) : (
                  <>
                    Send Message <FiSend />
                  </>
                )}
              </motion.button>
            </form>

            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-3 py-2 text-sm text-primary"
              >
                <FiCheckCircle /> Message sent successfully.
              </motion.div>
            ) : null}

            {status === "error" ? (
              <div className="mt-4 rounded-lg border border-primary/40 bg-primary/10 px-3 py-2 text-sm text-primary">
                Failed to send message. {errorText}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
