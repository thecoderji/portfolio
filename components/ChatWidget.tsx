"use client";

import { chatStore } from "@/lib/chatStore";
import { personalInfo } from "@/lib/data";
import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { FiArrowUpRight, FiMessageCircle, FiX, FiZap } from "react-icons/fi";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
};

const quickPrompts = [
  "What are your skills? 💡",
  "Tell me about projects 🚀",
  "Available for work? 💼",
  "Your tech stack? ⚙️",
  "How to contact? 📬"
];

const trim = <T,>(arr: T[]) => arr.slice(-20);

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const unsub = chatStore.subscribe((isOpen) => setOpen(isOpen));
    return unsub;
  }, []);

  const openFromFloating = () => {
    if (!chatStore.open) chatStore.toggle();
    setHasUnread(false);
  };

  const handleClose = () => {
    if (chatStore.open) chatStore.toggle();
    setOpen(false);
  };

  const timestamp = () =>
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth"
    });
  }, [messages, loading]);

  const canSend = useMemo(() => input.trim().length > 0 && !loading, [input, loading]);

  const sendMessage = async (value?: string) => {
    const content = (value ?? input).trim();
    if (!content || loading) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      timestamp: timestamp()
    };

    const next = trim([...messages, userMsg]);
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map((m) => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      if (!res.ok) throw new Error(await res.text());

      const data: { content?: string; reply?: string } = await res.json();
      const reply = data.content ?? data.reply;
      if (!reply) throw new Error("No reply");

      setMessages((prev) =>
        trim([
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: reply,
            timestamp: timestamp()
          }
        ])
      );

      if (!open) setHasUnread(true);
    } catch {
      setMessages((prev) =>
        trim([
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: "Temporary issue — please try again!",
            timestamp: timestamp()
          }
        ])
      );
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendMessage();
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {!open ? (
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              onClick={openFromFloating}
              className="animate-pulse-glow relative flex h-14 w-14 items-center justify-center rounded-full border border-primary/40 bg-surface text-primary shadow-lg shadow-black/40"
              aria-label="Open AI Chat"
            >
              <FiMessageCircle className="h-6 w-6" />
              {hasUnread ? (
                <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-primary" />
              ) : null}
            </motion.button>
          ) : null}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[1px]"
            />

            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.97 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="fixed right-3 z-50 flex w-[380px] max-w-[calc(100vw-1.5rem)] flex-col overflow-hidden rounded-2xl border border-primary/20 bg-[#0b1220]/95 shadow-2xl shadow-black/60 backdrop-blur-xl md:right-6"
              style={{
                top: "72px",
                bottom: "12px",
                maxHeight: "calc(100vh - 84px)"
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="h-[2px] w-full"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, #38bdf8 30%, #60a5fa 70%, transparent 100%)",
                  boxShadow: "0 0 8px rgba(56,189,248,0.6)"
                }}
              />

              <div className="flex items-center justify-between border-b border-primary/15 bg-[#0f172a] px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                      {personalInfo.initials}
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#0f172a] bg-primary">
                      <motion.span
                        className="absolute inset-0 rounded-full bg-primary"
                        animate={{ scale: [1, 1.8, 1], opacity: [1, 0, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      />
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <FiZap className="h-3 w-3 text-primary" />
                      <p className="text-sm font-semibold text-primary">{personalInfo.name.split(" ")[0]} AI</p>
                    </div>
                    <p className="text-[10px] text-textMuted">● Online</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleClose}
                  className="rounded-full p-1.5 text-textMuted transition-colors hover:bg-primary/10 hover:text-primary"
                >
                  <FiX className="h-4 w-4" />
                </motion.button>
              </div>

              <div ref={listRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
                {messages.length === 0 ? (
                  <div className="space-y-4 pt-1">
                    <div className="rounded-xl border border-primary/20 bg-[#111827] p-3">
                      <p className="mb-2 text-xs font-mono text-primary">{/* initializing Kishlay AI... */}</p>
                      <p className="text-sm leading-relaxed text-slate-300">
                        Hey! I&apos;m Kishlay&apos;s AI twin. Ask me anything about his skills,
                        experience, projects, or how to reach him 🚀
                      </p>
                    </div>

                    <p className="text-center font-mono text-[11px] text-textMuted">{/* try a quick prompt: */}</p>

                    <div className="shimmer flex flex-wrap gap-2">
                      {quickPrompts.map((p) => (
                        <motion.button
                          key={p}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => sendMessage(p)}
                          disabled={loading}
                          className="rounded-full border border-primary/20 bg-[#0f172a] px-3 py-1.5 text-xs text-slate-300 transition-all hover:border-primary/40 hover:text-primary"
                        >
                          {p}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ) : null}

                <AnimatePresence initial={false}>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {msg.role === "assistant" ? (
                        <div className="mr-2 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[10px] font-bold text-primary">
                          {personalInfo.initials}
                        </div>
                      ) : null}
                      <div className="max-w-[82%]">
                        <div
                          className="rounded-2xl px-3 py-2.5 text-sm leading-relaxed"
                          style={
                            msg.role === "user"
                              ? {
                                  background: "#38bdf8",
                                  color: "#050b14",
                                  fontWeight: 500,
                                  boxShadow: "0 0 12px rgba(56,189,248,0.3)"
                                }
                              : {
                                  background: "#111827",
                                  border: "1px solid rgba(148,163,184,0.2)",
                                  color: "#e6edf7"
                                }
                          }
                        >
                          {msg.content}
                        </div>
                        <p
                          className={`mt-1 text-[10px] font-mono text-textMuted ${
                            msg.role === "user" ? "text-right" : "text-left"
                          }`}
                        >
                          {msg.timestamp}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {loading ? (
                  <div className="flex items-start">
                    <div className="mr-2 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[10px] font-bold text-primary">
                      {personalInfo.initials}
                    </div>
                    <div className="rounded-2xl border border-slate-500/20 bg-[#111827] px-4 py-3">
                      <div className="flex gap-1.5">
                        {[0, 1, 2].map((d) => (
                          <motion.span
                            key={d}
                            className="h-2 w-2 rounded-full bg-primary"
                            animate={{ y: [0, -5, 0], opacity: [0.3, 1, 0.3] }}
                            transition={{ repeat: Infinity, duration: 0.9, delay: d * 0.15 }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="border-t border-primary/15 bg-[#0f172a] p-3">
                <form onSubmit={onSubmit}>
                  <div className="flex items-center gap-2">
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask me anything..."
                      disabled={loading}
                      className="w-full rounded-full border border-primary/25 bg-[#111827] px-4 py-2.5 font-mono text-sm text-slate-100 outline-none transition-all placeholder:text-slate-400 focus:border-primary/60 focus:shadow-[0_0_15px_rgba(56,189,248,0.2)]"
                    />
                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      disabled={!canSend}
                      type="submit"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-background disabled:opacity-30"
                    >
                      <FiArrowUpRight className="h-4 w-4" />
                    </motion.button>
                  </div>
                </form>
                <p className="mt-2 text-center font-mono text-[10px] text-textMuted">
                  {/* kishlay-ai · groq · llama-3.1 */}
                </p>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
