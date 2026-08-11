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
import PublicOnlyRoute from "@/lib/PublicRoute";

export default function VerifyEmailPage() {
  const signupData = useAppSelector((state) => state.auth.signupData);
  const loading = useAppSelector((state) => state.auth.loading);
  const dispatch = useAppDispatch();

  const [otp, setOtp] = useState<string>("");

  // Signup Api Call
  async function signup() {
    dispatch(setLoading(true));
    try {
      if (!signupData) {
        toast.error("Retry register process");
        return;
      }
      // club otp and signupData
      const signup_data_req: RegisterReq = { ...signupData, otp };
      const res = await AuthService.signup(signup_data_req);
      if (!res) {
        return;
      }
      toast.success(res.message);
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
              end to end encrypted messaging
            </p>
          </div>

          {/* Card */}
          <div className="bg-[#111113] border border-white/10 rounded-2xl p-8">
            <h2 className="text-white text-2xl font-bold mb-6">Verify Email</h2>

            {/* OTP */}
            <div className="mb-5">
              <label className="block text-[#a1a1aa] mb-2">Otp</label>
              <div className="">
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderInput={(props) => (
                    <input
                      {...props}
                      placeholder="-"
                      style={{
                        boxShadow:
                          "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                      }}
                      className="w-12 lg:w-14 border-0 outline-none rounded-lg text-white aspect-square text-center focus:border-0 focus:outline-2 focus:outline-blue-100 text-lg"
                    />
                  )}
                  containerStyle={{
                    justifyContent: "space-between",
                    gap: "0 6px",
                  }}
                />
              </div>
            </div>

            {/* Verify button */}
            <button
              onClick={signup}
              disabled={loading || !otp}
              className="
              w-full py-3 rounded-lg
              bg-[#6366f1] hover:bg-[#5457e5]
              disabled:bg-[#6366f1]/30 disabled:cursor-not-allowed
              text-white font-semibold text-sm
              transition-colors cursor-pointer
            "
            >
              {loading ? <Spinner className="w-6 h-6" /> : <p>Verify</p>}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-[#71717a] text-xs">or continue with</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Sign in link */}
            <p className="text-center text-[#a1a1aa] text-sm">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#818cf8] hover:text-[#a5b4fc] font-medium transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </PublicOnlyRoute>
    </div>
  );
}
