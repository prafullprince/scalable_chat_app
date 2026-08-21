"use client";

import Link from "next/link";
import {
  ArrowRight,
  Lock,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

const highlights = [
  {
    icon: MessageSquareText,
    title: "Fast conversations",
    text: "Jump into chats instantly with a lightweight and responsive messaging experience.",
  },
  {
    icon: ShieldCheck,
    title: "Private by default",
    text: "Built with secure user flows and trusted authentication for peace of mind.",
  },
  {
    icon: Users,
    title: "Built for communities",
    text: "Keep conversations organized, social, and easy to revisit across your network.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(37,211,102,0.18),_transparent_35%),linear-gradient(180deg,_#0b141a_0%,_#0f1720_100%)] text-white">
      <div className="mx-auto flex max-w-7xl flex-col px-6 py-10 md:px-10">
        <header className="mb-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#25d366]/20 ring-1 ring-[#25d366]/30">
              <MessageSquareText className="h-5 w-5 text-[#25d366]" />
            </div>
            <div>
              <p className="text-lg font-semibold tracking-tight">Connect</p>
            </div>
          </div>

          <Link
            href="/login"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/90 transition hover:border-[#25d366]/60 hover:bg-[#25d366]/10 hover:text-white"
          >
            Sign in
          </Link>
        </header>

        <section className="grid items-center gap-10 pb-10 md:grid-cols-[1.1fr_0.9fr] md:pb-20">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#25d366]/30 bg-[#25d366]/10 px-3 py-1.5 text-sm text-[#d9fdd3]">
              <Sparkles className="h-4 w-4 text-[#25d366]" />
              Smarter conversations, simpler connections
            </div>

            <div className="space-y-5">
              <h1 className="max-w-xl text-5xl font-black tracking-[-0.06em] text-white md:text-6xl">
                Stay close to what matters most.
              </h1>
              <p className="max-w-lg text-lg leading-8 text-slate-300">
                Meet a modern messaging experience designed for fast communication,
                secure chats, and meaningful connections.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/chat"
                className="inline-flex items-center gap-2 rounded-full bg-[#25d366] px-5 py-3 text-base font-semibold text-[#0b141a] transition hover:scale-[1.02] hover:bg-[#2ae570]"
              >
                Start Chat
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-base font-medium text-white/90 transition hover:border-white/20 hover:bg-white/10"
              >
                Create account
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-8 pt-2 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-[#25d366]" />
                Instant delivery
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-[#25d366]" />
                Secure access
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-[32px] bg-[#25d366]/15 blur-3xl" />
            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#111b21]/85 p-5 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-sm">
              <div className="mb-5 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25d366]/15 text-[#25d366]">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Team Chat</p>
                    <p className="text-xs text-slate-400">12 online</p>
                  </div>
                </div>
                <span className="rounded-full bg-[#25d366]/15 px-2.5 py-1 text-xs font-medium text-[#d9fdd3]">
                  Active
                </span>
              </div>

              <div className="space-y-3">
                <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-[#005c4b] p-3 text-sm text-slate-50">
                  Hey! The new release is ready for review.
                </div>
                <div className="max-w-[80%] rounded-2xl rounded-bl-md bg-[#202c33] p-3 text-sm text-slate-200">
                  Perfect. I’ll share the design updates in a few minutes.
                </div>
                <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-[#005c4b] p-3 text-sm text-slate-50">
                  Sounds good — I’ll be online in the workspace too.
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-2">
                <input
                  aria-label="Message input"
                  placeholder="Type a message"
                  className="flex-1 border-0 bg-transparent px-2 py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none"
                />
                <button className="rounded-full bg-[#25d366] px-3 py-2 text-sm font-semibold text-[#0b141a]">
                  Send
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-5 pb-12 md:grid-cols-3">
          {highlights.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_16px_40px_rgba(0,0,0,0.18)] backdrop-blur-sm"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#25d366]/10 text-[#25d366] ring-1 ring-[#25d366]/20">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="mb-2 text-xl font-semibold text-white">{title}</h2>
              <p className="text-sm leading-6 text-slate-300">{text}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
