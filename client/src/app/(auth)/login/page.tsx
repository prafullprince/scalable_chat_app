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
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <PublicOnlyRoute>
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-100"
          style={{
            backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
            backgroundSize: "30px 30px",
          }}
        />

        <div className="relative z-10 w-full max-w-md">
          {/* Logo + branding */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[#1b1b38] border border-[#4f46e5]/40 shadow-[0_0_24px_rgba(99,102,241,0.35)] flex items-center justify-center mb-4">
              <Zap size={28} className="text-[#818cf8]" fill="currentColor" />
            </div>
            <h1 className="text-white text-3xl font-bold">Connect</h1>
            <p className="text-[#8b8b96] text-sm mt-1">
              End to End encrypted messaging
            </p>
          </div>

          {/* Card */}
          <div className="bg-[#111113] border border-white/10 rounded-2xl p-8">
            <h2 className="text-white text-2xl font-bold mb-6">Sign in</h2>

            {/* Email */}
            <div className="mb-5">
              <label className="block text-[#a1a1aa] text-sm mb-2">
                Email or Username
              </label>
              <div className="flex items-center gap-3 bg-[#18181b] border border-white/10 rounded-lg px-4 py-3 focus-within:border-[#6366f1] transition-colors">
                <Mail size={18} className="text-[#71717a] shrink-0" />
                <input
                  type="text"
                  placeholder="you@example.com"
                  name="email"
                  value={formData.email}
                  onChange={changeHandler}
                  className="flex-1 bg-transparent outline-none text-white placeholder:text-[#52525b] text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-[#a1a1aa] text-sm">Password</label>
                <Link
                  href="/forgot-password"
                  className="text-[#818cf8] text-sm hover:text-[#a5b4fc] transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="flex items-center gap-3 bg-[#18181b] border border-white/10 rounded-lg px-4 py-3 focus-within:border-[#6366f1] transition-colors">
                <Lock size={18} className="text-[#71717a] shrink-0" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  name="password"
                  value={formData.password}
                  onChange={changeHandler}
                  className="flex-1 bg-transparent outline-none text-white placeholder:text-[#52525b] text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="text-[#71717a] hover:text-white transition-colors shrink-0"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Sign in button */}
            <button
              onClick={login}
              disabled={!formData.email || !formData.password || loading}
              className="
              w-full py-3 rounded-lg
              bg-[#6366f1] hover:bg-[#5457e5]
              text-white font-semibold text-sm
              transition-colors cursor-pointer flex justify-center
            "
            >
              {loading ? <Spinner className="w-6 h-6" /> : <p>Sign in</p>}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-[#71717a] text-xs">or continue with</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* OAuth buttons */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-white/10 text-[#e4e4e7] text-sm hover:bg-white/5 transition-colors">
                <GoogleIcon />
                Google
              </button>
              <button className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-white/10 text-[#e4e4e7] text-sm hover:bg-white/5 transition-colors">
                <GitHubIcon />
                GitHub
              </button>
            </div>

            {/* Sign up link */}
            <p className="text-center text-[#a1a1aa] text-sm mb-6">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-[#818cf8] hover:text-[#a5b4fc] font-medium transition-colors"
              >
                Sign up
              </Link>
            </p>

            <div className="h-px bg-white/10 mb-6" />

            {/* Admin portal link */}
            <Link
              href="/admin/login"
              className="flex items-center justify-center gap-2 text-[#71717a] text-sm hover:text-[#a1a1aa] transition-colors"
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
