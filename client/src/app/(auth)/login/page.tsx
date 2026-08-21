// app/(auth)/login/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Zap, Mail, Lock, Eye, EyeOff, Shield } from "lucide-react";
import { AuthService } from "@/services/auth.service";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setAccessToken, setLoading, setUser } from "@/slice/auth.slice";
import Spinner from "@/loading/Spinner";
import { useRouter } from "next/navigation";
import PublicOnlyRoute from "@/lib/auth/PublicRoute";

export default function LoginPage() {
  const loading = useAppSelector((state) => state.auth.loading);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function login() {
    dispatch(setLoading(true));
    try {
      const res = await AuthService.login(formData);
      if (!res) {
        return;
      }
      toast.success(res.data.message);
      dispatch(setAccessToken(res.data.accessToken));
      dispatch(setUser(res.data.user));
      router.push("/chat");
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      dispatch(setLoading(false));
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.18),_transparent_30%),linear-gradient(135deg,_#09090b_0%,_#111827_50%,_#09090b_100%)] px-4 py-12 text-white">
      <PublicOnlyRoute>
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "26px 26px",
          }}
        />
        <div className="absolute -left-20 top-16 h-72 w-72 rounded-full bg-indigo-500/15 blur-3xl" />
        <div className="absolute -right-10 bottom-10 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative z-10 mx-auto w-full max-w-md">
          <div className="mb-8 flex flex-col items-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo-400/40 bg-indigo-500/15 shadow-[0_0_30px_rgba(99,102,241,0.32)]">
              <Zap size={28} className="text-indigo-300" fill="currentColor" />
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white">Connect</h1>
            <p className="mt-2 text-sm text-slate-300">End to end encrypted messaging</p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-slate-950/70 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.8)] backdrop-blur-xl sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-indigo-300/80">Welcome back</p>
                <h2 className="mt-2 text-2xl font-bold text-white">Sign in</h2>
              </div>
              <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                Secure
              </div>
            </div>

            <div className="mb-5 space-y-2">
              <label className="block text-sm text-slate-300">Email or Username</label>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-900/90 px-4 py-3 transition focus-within:border-indigo-400/70 focus-within:ring-2 focus-within:ring-indigo-500/20">
                <Mail size={18} className="shrink-0 text-slate-400" />
                <input
                  type="text"
                  placeholder="you@example.com"
                  name="email"
                  value={formData.email}
                  onChange={changeHandler}
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 outline-none"
                />
              </div>
            </div>

            <div className="mb-6 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm text-slate-300">Password</label>
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-indigo-300 transition hover:text-indigo-200"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-900/90 px-4 py-3 transition focus-within:border-indigo-400/70 focus-within:ring-2 focus-within:ring-indigo-500/20">
                <Lock size={18} className="shrink-0 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  name="password"
                  value={formData.password}
                  onChange={changeHandler}
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="shrink-0 text-slate-400 transition hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              onClick={login}
              disabled={!formData.email || !formData.password || loading}
              className="flex w-full cursor-pointer items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? <Spinner className="h-6 w-6" /> : "Sign in"}
            </button>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-[11px] uppercase tracking-[0.18em] text-slate-500">or continue with</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <div className="mb-6 grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-white/10">
                <GoogleIcon />
                Google
              </button>
              <button className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-white/10">
                <GitHubIcon />
                GitHub
              </button>
            </div>

            <p className="mb-6 text-center text-sm text-slate-300">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="font-semibold text-indigo-300 transition hover:text-indigo-200">
                Sign up
              </Link>
            </p>

            <div className="mb-6 h-px bg-white/10" />

            <Link
              href="/admin/login"
              className="flex items-center justify-center gap-2 text-sm text-slate-400 transition hover:text-slate-200"
            >
              <Shield size={14} />
              Administrator? Access Admin Portal
            </Link>
          </div>
        </div>
      </PublicOnlyRoute>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#e4e4e7">
      <path d="M12 .3a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.3 3.5 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .3z" />
    </svg>
  );
}
