"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap } from "lucide-react";
import OTPInput from "react-otp-input";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { toast } from "sonner";
import { RegisterReq } from "@/services/types";
import { AuthService } from "@/services/auth.service";
import { setLoading } from "@/slice/auth.slice";
import Spinner from "@/loading/Spinner";
import PublicOnlyRoute from "@/lib/auth/PublicRoute";
import { useRouter } from "next/navigation";

export default function VerifyEmailPage() {
  const signupData = useAppSelector((state) => state.auth.signupData);
  const loading = useAppSelector((state) => state.auth.loading);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [otp, setOtp] = useState<string>("");

  async function signup() {
    dispatch(setLoading(true));
    try {
      if (!signupData) {
        toast.error("Retry register process");
        return;
      }
      const signup_data_req: RegisterReq = { ...signupData, otp };
      const res = await AuthService.signup(signup_data_req);
      if (!res) {
        return;
      }
      toast.success(res.message);
      router.push("/login");
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
                <p className="text-sm uppercase tracking-[0.2em] text-indigo-300/80">Verification</p>
                <h2 className="mt-2 text-2xl font-bold text-white">Verify Email</h2>
              </div>
              <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                Secure
              </div>
            </div>

            <div className="mb-6">
              <label className="mb-3 block text-sm text-slate-300">One-time password</label>
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderInput={(props) => (
                  <input
                    {...props}
                    placeholder="-"
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="aspect-square w-12 rounded-xl border border-white/10 bg-slate-900/90 text-center text-lg font-semibold text-white outline-none transition focus:border-indigo-400/70 focus:ring-2 focus:ring-indigo-500/20 lg:w-14"
                  />
                )}
                containerStyle={{
                  justifyContent: "space-between",
                  gap: "0 6px",
                }}
              />
            </div>

            <button
              onClick={signup}
              disabled={loading || !otp}
              className="flex w-full cursor-pointer items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? <Spinner className="h-6 w-6" /> : "Verify"}
            </button>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-[11px] uppercase tracking-[0.18em] text-slate-500">account access</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <p className="text-center text-sm text-slate-300">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-indigo-300 transition hover:text-indigo-200">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </PublicOnlyRoute>
    </div>
  );
}
