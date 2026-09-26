"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Lock, Mail, ArrowRight, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { useAdminAuth } from "@/context/admin-auth-context";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, resetPassword, user } = useAdminAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [forgotMode, setForgotMode] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  // If already logged in, redirect to admin dashboard inside useEffect
  useEffect(() => {
    if (user) {
      router.push("/admin");
    }
  }, [user, router]);

  if (user) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await login(email, password, rememberMe);
      if (res.success) {
        router.push("/admin");
      } else {
        setError(res.error || "Authentication failed");
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address first");
      return;
    }
    setError(null);
    setIsLoading(true);

    try {
      const res = await resetPassword(email);
      if (res.success) {
        setResetSent(true);
      } else {
        setError(res.message);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to dispatch reset request");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-[#040711] text-foreground">
      {/* Background Cyber Glow & Radial Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        {/* Brand Card Header */}
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-white/15 bg-[#030612] p-2 flex items-center justify-center shadow-2xl mb-4 group">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-400 opacity-30 blur-md group-hover:opacity-60 transition" />
            <Image
              src="/logo-emblem.png"
              alt="Build Scale X"
              width={64}
              height={64}
              className="object-contain w-full h-full relative z-10"
              priority
            />
          </div>

          <h1 className="font-heading font-extrabold text-2xl tracking-tight text-white mb-1">
            Build Scale X
          </h1>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[#38BDF8] text-[11px] font-semibold tracking-wider uppercase font-mono">
            <Shield className="w-3 h-3" />
            <span>Super Admin Gateway</span>
          </div>
        </div>

        {/* Login Panel */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-7 sm:p-9 shadow-2xl">
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-6 p-3.5 rounded-xl bg-destructive/15 border border-destructive/30 text-destructive text-xs font-medium flex items-start gap-2.5"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </motion.div>
          )}

          {resetSent ? (
            <div className="text-center py-6">
              <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Reset Link Sent</h3>
              <p className="text-xs text-silver leading-relaxed mb-6">
                Instructions have been sent to <span className="text-white font-medium">{email}</span>. Please check your inbox.
              </p>
              <button
                type="button"
                onClick={() => { setResetSent(false); setForgotMode(false); }}
                className="text-xs text-primary hover:text-cyan-400 font-semibold transition"
              >
                Back to Login
              </button>
            </div>
          ) : forgotMode ? (
            <form onSubmit={handleForgotPassword} className="space-y-5">
              <div className="mb-2">
                <h2 className="text-lg font-bold text-white">Reset Super Admin Password</h2>
                <p className="text-xs text-silver mt-1">Enter your admin email address to receive reset instructions.</p>
              </div>

              <div>
                <label className="text-xs font-medium text-silver block mb-1.5">Admin Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-silver/60" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="buildscalex@gmail.com"
                    className="w-full bg-[#050816] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-silver/40 focus:border-primary focus:outline-none transition"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setForgotMode(false)}
                  className="text-xs text-silver hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold text-xs shadow-md shadow-blue-500/25 transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Send Reset Link</span>
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-xs font-medium text-silver block mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-silver/60" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@buildscalex.com"
                    className="w-full bg-[#050816] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-silver/40 focus:border-primary focus:outline-none transition"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-silver">Password</label>
                  <button
                    type="button"
                    onClick={() => setForgotMode(true)}
                    className="text-[11px] text-primary hover:text-cyan-400 transition"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-silver/60" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-[#050816] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-silver/40 focus:border-primary focus:outline-none transition"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-white/20 bg-[#050816] text-primary focus:ring-primary accent-primary"
                  />
                  <span className="text-xs text-silver">Remember me for 30 days</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold text-sm py-3.5 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <span>Enter Super Admin Panel</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Secure Footer - No leaked credentials */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center flex flex-col items-center gap-3">
            <div className="flex items-center gap-1.5 text-[11px] text-silver/60">
              <Shield className="w-3.5 h-3.5 text-primary" />
              <span>Protected by Enterprise Encryption</span>
            </div>
            <Link
              href="/"
              className="text-xs text-silver/70 hover:text-white transition"
            >
              ← Return to public website
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
