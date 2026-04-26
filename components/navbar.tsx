"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Mendeteksi pergerakan scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Deteksi section aktif berdasarkan posisi scroll
      const sections = ["problems", "how-it-works", "why-it-matters", "product", "about-us"];
      let current = "";
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Cek apakah elemen sedang berada di tengah viewport
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = section;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    // Panggil sekali saat mount untuk mengecek posisi awal
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fungsi dinamis untuk memberikan style link desktop yang aktif
  const getLinkClass = (section: string) => {
    const isActive = activeSection === section;
    return `text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200 ${
      isActive
        ? "text-emerald-700 bg-emerald-50 shadow-sm"
        : "text-slate-600 hover:text-emerald-700 hover:bg-slate-100/50"
    }`;
  };

  // Fungsi dinamis untuk memberikan style link mobile yang aktif
  const getMobileLinkClass = (section: string) => {
    const isActive = activeSection === section;
    return `text-sm font-semibold px-4 py-3 rounded-xl transition-colors ${
      isActive
        ? "text-emerald-700 bg-emerald-50"
        : "text-slate-600 hover:text-emerald-700 hover:bg-slate-50"
    }`;
  };

  return (
    // Wrapper luar agar navbar mengambang di tengah (Floating)
    <div className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav
        // Menggunakan w-full dan max-w-5xl, serta "relative" untuk posisi dropdown mobile
        className={`pointer-events-auto relative flex items-center justify-between px-2.5 py-3.5 w-full max-w-5xl rounded-full transition-all duration-500 ${
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
              height={100}
              alt="Logo KlimaBot"
              className="h-6 md:h-8 w-auto object-contain"
              priority
            />
          </Link>
        </div>

        {/* TENGAH: Menu Desktop (Clean Text Links) */}
        <div className="hidden md:flex items-center gap-1">
          <Link
            href="#problems"
            className={getLinkClass("problems")}
          >
            Problems
          </Link>
          <Link
            href="#how-it-works"
            className={getLinkClass("how-it-works")}
          >
            How it works
          </Link>
          <Link
            href="#why-it-matters"
            className={getLinkClass("why-it-matters")}
          >
            Why it matters
          </Link>
          {/* <Link
            href="#product"
            className={getLinkClass("product")}
          >
            Product
          </Link> */}
        </div>

        {/* KANAN: Tombol CTA & Mobile Hamburger */}
        <div className="flex-1 flex items-center justify-end pr-1">
          {/* CTA Desktop */}
          <Button
            asChild
            className="cursor-pointer hidden md:flex h-10 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-[0_4px_14px_rgba(5,150,105,0.3)] group transition-all"
          >
            <Link href="/login">
              Login
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
            {isMobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </Button>
        </div>

        {/* --- MOBILE MENU DROPDOWN --- */}
        {isMobileMenuOpen && (
          <div className="absolute top-[calc(100%+12px)] left-0 w-full bg-white/95 backdrop-blur-xl border border-slate-200/60 shadow-[0_15px_40px_rgb(0,0,0,0.12)] rounded-2xl p-3 flex flex-col gap-1 md:hidden">
            <Link
              href="#problems"
              onClick={() => setIsMobileMenuOpen(false)}
              className={getMobileLinkClass("problems")}
            >
              Problems
            </Link>
            <Link
              href="#how-it-works"
              onClick={() => setIsMobileMenuOpen(false)}
              className={getMobileLinkClass("how-it-works")}
            >
              How it works
            </Link>
            <Link
              href="#why-it-matters"
              onClick={() => setIsMobileMenuOpen(false)}
              className={getMobileLinkClass("why-it-matters")}
            >
              Why it matters
            </Link>
            <Link
              href="#product"
              onClick={() => setIsMobileMenuOpen(false)}
              className={getMobileLinkClass("product")}
            >
              Product
            </Link>
            <Link
              href="#about-us"
              onClick={() => setIsMobileMenuOpen(false)}
              className={getMobileLinkClass("about-us")}
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
