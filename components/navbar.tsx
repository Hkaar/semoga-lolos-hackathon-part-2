"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mendeteksi pergerakan scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // Wrapper luar agar navbar mengambang di tengah (Floating)
    <div className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav
        // Menggunakan w-full dan max-w-5xl, serta "relative" untuk posisi dropdown mobile
        className={`pointer-events-auto relative flex items-center justify-between px-2.5 py-2 w-full max-w-5xl rounded-full transition-all duration-500 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
            : "bg-white/60 backdrop-blur-md border border-white/60 shadow-sm"
        }`}
      >
        {/* KIRI: Logo (flex-1 agar mendorong menu tengah persis ke center) */}
        <div className="flex-1 flex items-center justify-start pl-3">
          <Link
            href="/"
            className="transition-transform hover:scale-105 duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Image
              src="/images/logo.svg"
              width={130}
              height={32}
              alt="Logo KlimaBot"
              className="h-6 md:h-7 w-auto object-contain"
              priority
            />
          </Link>
        </div>

        {/* TENGAH: Menu Desktop (Clean Text Links) */}
        <div className="hidden md:flex items-center gap-1">
          <Link
            href="#how-it-works"
            className="text-sm font-semibold text-slate-600 hover:text-emerald-700 px-4 py-2 rounded-full hover:bg-slate-100/50 transition-all duration-200"
          >
            How it works
          </Link>
          <Link
            href="#why-it-matters"
            className="text-sm font-semibold text-slate-600 hover:text-emerald-700 px-4 py-2 rounded-full hover:bg-slate-100/50 transition-all duration-200"
          >
            Why it matters
          </Link>
          <Link
            href="#product"
            className="text-sm font-semibold text-slate-600 hover:text-emerald-700 px-4 py-2 rounded-full hover:bg-slate-100/50 transition-all duration-200"
          >
            Product
          </Link>
          <Link
            href="#about-us"
            className="text-sm font-semibold text-slate-600 hover:text-emerald-700 px-4 py-2 rounded-full hover:bg-slate-100/50 transition-all duration-200"
          >
            About us
          </Link>
        </div>

        {/* KANAN: Tombol CTA & Mobile Hamburger */}
        <div className="flex-1 flex items-center justify-end pr-1">
          {/* CTA Desktop */}
          <Button
            asChild
            className="cursor-pointer hidden md:flex h-10 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-[0_4px_14px_rgba(5,150,105,0.3)] group transition-all"
          >
            <Link href="/admin">
              Dashboard
              <ArrowRight className="ml-1.5 size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>

          {/* Toggle Hamburger Mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full text-slate-600 hover:bg-slate-100/80"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>

        {/* --- MOBILE MENU DROPDOWN --- */}
        {isMobileMenuOpen && (
          <div className="absolute top-[calc(100%+12px)] left-0 w-full bg-white/95 backdrop-blur-xl border border-slate-200/60 shadow-[0_15px_40px_rgb(0,0,0,0.12)] rounded-2xl p-3 flex flex-col gap-1 md:hidden">
            <Link
              href="#how-it-works"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-semibold text-slate-600 hover:text-emerald-700 px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors"
            >
              How it works
            </Link>
            <Link
              href="#why-it-matters"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-semibold text-slate-600 hover:text-emerald-700 px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors"
            >
              Why it matters
            </Link>
            <Link
              href="#product"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-semibold text-slate-600 hover:text-emerald-700 px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors"
            >
              Product
            </Link>
            <Link
              href="#about-us"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-semibold text-slate-600 hover:text-emerald-700 px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors"
            >
              About us
            </Link>
            
            <div className="h-px bg-slate-100 my-1 mx-2" />
            
            <Button
              asChild
              className="w-full mt-1 h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-sm"
            >
              <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)}>
                Dashboard
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        )}
      </nav>
    </div>
  );
}