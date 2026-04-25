"use client";

import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Loader2, Leaf } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logoError, setLogoError] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const API_BASE =
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

      const response = await fetch(`${API_BASE}/api/v1/company/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({
          identifier: email,
          password: password,
        }),
      });

      const textResponse = await response.text();
      let result;

      try {
        result = JSON.parse(textResponse);
      } catch (parseError) {
        console.error("Respons dari server bukan JSON:", textResponse);
        if (textResponse === "NOT_FOUND") {
          throw new Error(
            "Endpoint API tidak ditemukan (404 NOT_FOUND). Pastikan rute POST '/api/v1/company/auth' sudah dibuat di backend Elysia kamu.",
          );
        } else {
          throw new Error(
            "Terjadi kesalahan pada server. Respons tidak valid.",
          );
        }
      }

      if (response.ok && (result.status === "success" || result.token)) {
        if (result.token) {
          localStorage.setItem("auth_token", result.token);
        }
        toast.success("Login berhasil! Mengalihkan ke dashboard...");
        window.location.href = "/dashboard";
      } else {
        toast.error(
          result.message ||
            "Login gagal. Periksa kembali email dan password Anda.",
        );
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(
        error.message ||
          "Terjadi kesalahan jaringan atau server tidak merespons.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#FAFAFA] overflow-hidden font-sans">
      {/* BACKGROUND DECORATION */}
      <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none z-0 flex items-end">
        <svg
          className="absolute bottom-0 w-full h-auto text-[#F0F4F1] min-w-[1000px]"
          viewBox="0 0 1440 320"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,160L48,170.7C96,181,192,203,288,213.3C384,224,480,224,576,202.7C672,181,768,139,864,128C960,117,1056,139,1152,160C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            fillOpacity="0.7"
          ></path>
          <path
            d="M0,256L60,245.3C120,235,240,213,360,208C480,203,600,213,720,234.7C840,256,960,288,1080,288C1200,288,1320,256,1380,240L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            fillOpacity="1"
          ></path>
        </svg>

        <svg
          className="absolute left-10 bottom-10 w-48 h-48 text-green-800/10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </svg>
      </div>

      {/* LOGIN CARD */}
      <div className="relative z-10 w-full max-w-[600px] p-6 md:p-10">
        <div className="bg-white rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8">
          {/* Logo & Headers */}
          <div className="flex flex-col items-center mb-8">
            {logoError ? (
              <span className="text-2xl font-bold text-green-700 tracking-tight mb-6 flex items-center gap-2">
                <Leaf className="w-6 h-6 text-green-600" />
                klimabot
              </span>
            ) : (
              <img
                src="images/logo.png"
                alt="Klimabot Logo"
                className="h-20 object-contain mb-10"
                onError={() => setLogoError(true)}
              />
            )}

            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome back
            </h1>
            <p className="text-sm text-gray-500">
              Sign in to access your dashboard
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700">
                Email
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 transition-all placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-9 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 transition-all placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center bg-[#0C6B37] hover:bg-[#095229] text-white font-medium py-2.5 rounded-lg text-sm transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
