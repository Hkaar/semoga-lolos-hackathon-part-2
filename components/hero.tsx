"use client";

import React from "react";
import { ArrowRight, Leaf, CheckCircle2, Clock, XCircle, Home, BarChart2, ShieldCheck, Settings, Recycle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Hanya mengimpor Highlighter sesuai bawaan asli Magic UI Text Highlighter
import { Highlighter } from "@/components/ui/highlighter";

export default function Hero() {
  return (
    <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-32 px-5 sm:px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-8 min-h-[90vh] bg-white overflow-hidden">
      
      {/* ── KIRI: KONTEN TEKS ── */}
      <div className="w-full lg:w-1/2 lg:flex-1 flex flex-col items-center lg:items-start text-center lg:text-left z-10 max-w-2xl mx-auto lg:mx-0">
        
        {/* Headline Raksasa */}
        <h1 
          className="capitalize text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-7xl font-extrabold tracking-tighter text-slate-900 leading-[1.1] sm:leading-[1.05] mb-4 sm:mb-6"
          style={{ fontFamily: '"Geist", "Geist Sans", sans-serif' }}
        >
          Verify <br className="hidden lg:block" />
          environmental <br className="hidden lg:block" />
          actions{" "}
          
          {/* Menggunakan Magic UI Text Highlighter di sini */}
          <Highlighter action="highlight" color="#10b981">
            <span className="text-white">
              before
            </span>
          </Highlighter>{" "}
          
          <br className="hidden lg:block" />
          you fund them
        </h1>

        {/* Subtitle */}
        <p 
          className="text-base sm:text-lg md:text-xl text-slate-500 max-w-xl font-medium leading-relaxed mb-8 sm:mb-10"
          style={{ fontFamily: '"Inter", sans-serif' }}
        >
          Improve collaboration, monitor progress in real-time, and fund projects with absolute confidence — all in one intuitive dashboard.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full sm:w-auto">
          <Button 
            asChild
            className="cursor-pointer h-12 sm:h-14 px-6 sm:px-8 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base shadow-sm transition-colors group w-full sm:w-auto"
          >
            <Link href="/admin">
              Try it for Free
              <ArrowRight className="ml-2 size-4 sm:size-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            asChild
            className="cursor-pointer h-12 sm:h-14 px-6 sm:px-8 rounded-full bg-transparent hover:bg-slate-50 text-slate-700 font-bold text-sm sm:text-base border-slate-200 group transition-colors w-full sm:w-auto shadow-sm"
          >
            <Link href="#learn-more">
              Learn More
              <ArrowRight className="ml-2 size-4 sm:size-5 transition-transform group-hover:translate-x-1 text-slate-400" />
            </Link>
          </Button>
        </div>
      </div>

      {/* ── KANAN: OVERLAPPING MOCKUPS ── */}
      <div className="w-full lg:w-1/2 lg:flex-1 relative z-10 h-[380px] sm:h-[450px] lg:h-[500px] xl:h-[600px] mt-12 lg:mt-0 flex justify-center lg:justify-end">
        
        <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dzl9yxixg/image/upload/v1714418650/grid_pattern_yxh3d2.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-30 -z-10" />

        {/* Mengembalikan ke div biasa agar tidak error */}
        <div className="relative w-full max-w-[420px] sm:max-w-[500px] lg:max-w-none h-full">

          {/* 1. DESKTOP MOCKUP (Di Belakang) */}
          <div className="absolute top-0 right-0 w-[85%] sm:w-[85%] h-[280px] sm:h-[360px] lg:h-[400px] xl:h-[480px] bg-white border border-slate-200/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] rounded-xl sm:rounded-2xl font-sans cursor-default">
            <div className="w-full h-full overflow-hidden rounded-[inherit] flex flex-col relative z-20">
              
              {/* Top Bar Desktop */}
              <div className="h-8 sm:h-8 lg:h-10 bg-slate-50 border-b border-slate-100 flex items-center px-3 sm:px-4 gap-1.5 sm:gap-2 w-full shrink-0">
                <div className="flex gap-1 sm:gap-1.5">
                  <div className="size-2 sm:size-2 lg:size-2.5 rounded-full bg-slate-300" />
                  <div className="size-2 sm:size-2 lg:size-2.5 rounded-full bg-slate-300" />
                  <div className="size-2 sm:size-2 lg:size-2.5 rounded-full bg-slate-300" />
                </div>
                <div className="mx-auto h-4 sm:h-4 lg:h-5 w-32 sm:w-32 lg:w-48 bg-white border border-slate-100 rounded flex items-center justify-center shadow-sm">
                  <span className="text-[7px] sm:text-[7px] lg:text-[9px] font-medium text-slate-400 font-mono">app.klimabot.com</span>
                </div>
              </div>

              {/* Konten Desktop */}
              <div className="flex flex-1 overflow-hidden bg-slate-50/50">
                <div className="w-12 sm:w-16 lg:w-40 xl:w-48 bg-white border-r border-slate-100 p-2 sm:p-3 lg:p-4 flex flex-col gap-3 sm:gap-4 shrink-0 items-center lg:items-stretch pointer-events-none">
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-2 sm:mb-4">
                    <div className="size-6 sm:size-6 lg:size-8 bg-emerald-100 rounded-md flex items-center justify-center shrink-0">
                      <Leaf className="size-3 sm:size-3 lg:size-4 text-emerald-600" />
                    </div>
                    <div className="hidden lg:block font-bold text-slate-900 text-sm">Klimabot</div>
                  </div>
                  <div className="space-y-1 w-full">
                    <div className="flex items-center justify-center lg:justify-start gap-2 lg:gap-3 p-1.5 sm:p-1.5 lg:p-2 bg-emerald-50 text-emerald-700 rounded-md lg:rounded-lg w-full">
                      <Home className="size-3.5 sm:size-4" /> <span className="hidden lg:block text-[10px] xl:text-xs font-semibold">Dashboard</span>
                    </div>
                    <div className="flex items-center justify-center lg:justify-start gap-2 lg:gap-3 p-1.5 sm:p-1.5 lg:p-2 text-slate-500 w-full">
                      <ShieldCheck className="size-3.5 sm:size-4" /> <span className="hidden lg:block text-[10px] xl:text-xs font-medium">Proofs</span>
                    </div>
                    <div className="flex items-center justify-center lg:justify-start gap-2 lg:gap-3 p-1.5 sm:p-1.5 lg:p-2 text-slate-500 w-full">
                      <BarChart2 className="size-3.5 sm:size-4" /> <span className="hidden lg:block text-[10px] xl:text-xs font-medium">Impact</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 p-3 sm:p-4 lg:p-6 flex flex-col gap-3 sm:gap-4 overflow-hidden pointer-events-none">
                  <div className="flex justify-between items-center bg-white p-2 sm:p-3 rounded-lg sm:rounded-xl border border-slate-100 shadow-sm shrink-0">
                    <div>
                      <div className="font-bold text-slate-900 text-[10px] sm:text-sm">Dashboard</div>
                      <div className="text-[7px] sm:text-[10px] text-slate-500">Welcome back, Admin 👋</div>
                    </div>
                    <div className="size-5 sm:size-6 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-[6px] sm:text-[8px]">
                      HL
                    </div>
                  </div>

                  <div className="flex gap-2 sm:gap-3 shrink-0">
                    <div className="flex-1 bg-white border border-slate-100 shadow-sm p-2 sm:p-3 rounded-lg sm:rounded-xl">
                      <div className="text-[8px] sm:text-[10px] font-bold text-slate-500 mb-1 sm:mb-1 truncate">Verified Actions</div>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="size-6 sm:size-10 rounded-full border-2 sm:border-[3px] border-slate-100 border-t-emerald-500 border-r-emerald-500 shrink-0" />
                        <div>
                          <div className="font-bold text-xs sm:text-lg text-slate-900 leading-none">82</div>
                          <div className="text-[6px] sm:text-[8px] text-emerald-600 font-medium">+12 this week</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 bg-white border border-slate-100 shadow-sm p-2 sm:p-3 rounded-lg sm:rounded-xl hidden sm:block">
                      <div className="text-[10px] font-bold text-slate-500 mb-1 truncate">Impact Score</div>
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full border-[3px] border-slate-100 border-t-blue-500 border-r-blue-500 border-b-blue-500 shrink-0" />
                        <div>
                          <div className="font-bold text-lg text-slate-900 leading-none">94<span className="text-[10px] text-slate-400">/100</span></div>
                          <div className="text-[8px] text-emerald-600 font-medium">Excellent</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 bg-white border border-slate-100 shadow-sm p-2 sm:p-3 rounded-lg sm:rounded-xl overflow-hidden flex flex-col">
                    <div className="text-[8px] sm:text-[10px] font-bold text-slate-800 uppercase tracking-wider mb-1 sm:mb-3 shrink-0">Recent Actions</div>
                    <div className="space-y-1.5 sm:space-y-3 overflow-hidden">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
                          <div className="size-6 sm:size-8 rounded bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                            <img src="https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=100&h=100&fit=crop&q=80" alt="img" className="w-full h-full object-cover" />
                          </div>
                          <div className="overflow-hidden pr-1">
                            <div className="text-[9px] sm:text-xs font-bold text-slate-900 truncate">Pilah Sampah</div>
                            <div className="text-[7px] sm:text-[9px] text-slate-500 truncate">Jakarta, ID</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-[7px] sm:text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded shrink-0">
                          <CheckCircle2 className="size-2 sm:size-3"/> Verified
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
                          <div className="size-6 sm:size-8 rounded bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                            <img src="https://images.unsplash.com/photo-1618477461853-cf6ed80fbfc9?w=100&h=100&fit=crop&q=80" alt="img" className="w-full h-full object-cover" />
                          </div>
                          <div className="overflow-hidden pr-1">
                            <div className="text-[9px] sm:text-xs font-bold text-slate-900 truncate">Bersih Pantai</div>
                            <div className="text-[7px] sm:text-[9px] text-slate-500 truncate">Bali, ID</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-[7px] sm:text-[9px] font-bold text-amber-700 bg-amber-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded shrink-0">
                          <Clock className="size-2 sm:size-3"/> Pending
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. MOBILE MOCKUP (Di Depan / Overlapping) */}
          <div className="absolute bottom-0 lg:bottom-4 left-0 sm:left-4 lg:-left-4 w-[140px] sm:w-[180px] lg:w-[220px] xl:w-[240px] h-[280px] sm:h-[360px] lg:h-[440px] xl:h-[480px] bg-white border-[4px] sm:border-[6px] lg:border-[8px] border-slate-900 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)] rounded-[1.5rem] sm:rounded-[2rem] lg:rounded-[3rem] z-30 font-sans cursor-default">
            <div className="w-full h-full overflow-hidden rounded-[inherit] flex flex-col relative z-20">
              
              <div className="h-5 sm:h-5 lg:h-6 w-full flex justify-center pt-1.5 sm:pt-1.5 lg:pt-2 shrink-0 bg-white z-10 pointer-events-none">
                <div className="w-12 sm:w-16 lg:w-20 h-2.5 sm:h-3 lg:h-4 bg-slate-900 rounded-full" />
              </div>

              <div className="flex-1 overflow-hidden bg-slate-50/50 flex flex-col p-2.5 sm:p-3 lg:p-4 pointer-events-none">
                <div className="flex items-center justify-between mb-2.5 sm:mb-3 lg:mb-4 mt-1 lg:mt-2 shrink-0">
                  <div className="size-4 sm:size-5 lg:size-6 bg-emerald-100 rounded flex items-center justify-center shrink-0">
                    <Leaf className="size-2 sm:size-2.5 lg:size-3 text-emerald-600" />
                  </div>
                  <div className="size-4 sm:size-5 lg:size-6 bg-slate-200 rounded-full shrink-0" />
                </div>

                <div className="font-bold text-slate-900 text-[11px] sm:text-xs lg:text-base leading-tight mb-2.5 sm:mb-3 lg:mb-4 shrink-0">
                  Hi, Andi 👋 <br />
                  <span className="text-[7px] sm:text-[9px] lg:text-xs font-medium text-slate-500">Track your impact</span>
                </div>

                <div className="bg-white border border-slate-100 shadow-sm p-2 sm:p-2.5 lg:p-3 rounded-lg sm:rounded-xl mb-2.5 sm:mb-3 lg:mb-4 shrink-0">
                  <div className="text-[7px] sm:text-[9px] lg:text-[10px] font-bold text-slate-500 mb-1.5 sm:mb-2 truncate">Your Contribution</div>
                  <div className="flex items-center gap-2 sm:gap-2 lg:gap-3">
                    <div className="size-8 sm:size-10 lg:size-12 rounded-full border-[3px] sm:border-[3px] lg:border-[4px] border-slate-100 border-t-emerald-500 border-r-emerald-500 border-b-emerald-500 flex items-center justify-center shrink-0">
                      <span className="text-[8px] sm:text-[10px] lg:text-xs font-bold text-slate-800">18<span className="text-[5px] sm:text-[7px] lg:text-[8px]">kg</span></span>
                    </div>
                    <div className="space-y-0.5 sm:space-y-1">
                      <div className="flex items-center gap-1 sm:gap-1 text-[6px] sm:text-[8px] lg:text-[9px] font-medium text-slate-600 leading-none">
                        <div className="size-1.5 sm:size-1.5 lg:size-2 rounded-sm bg-emerald-500 shrink-0" /> Verified (12)
                      </div>
                      <div className="flex items-center gap-1 sm:gap-1 text-[6px] sm:text-[8px] lg:text-[9px] font-medium text-slate-600 leading-none">
                        <div className="size-1.5 sm:size-1.5 lg:size-2 rounded-sm bg-amber-400 shrink-0" /> Pending (6)
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-[7px] sm:text-[9px] lg:text-[10px] font-bold text-slate-800 mb-1.5 sm:mb-1.5 lg:mb-2 shrink-0">Recent</div>
                <div className="space-y-1.5 sm:space-y-1.5 lg:space-y-2 flex-1 overflow-hidden">
                  <div className="bg-white border border-slate-100 shadow-sm p-1.5 sm:p-1.5 lg:p-2 rounded-md sm:rounded-lg flex items-center gap-1.5 sm:gap-1.5 lg:gap-2">
                    <div className="size-5 sm:size-6 lg:size-8 rounded bg-emerald-50 flex items-center justify-center shrink-0">
                      <Leaf className="size-2.5 sm:size-3 lg:size-4 text-emerald-600" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="text-[7px] sm:text-[9px] lg:text-[10px] font-bold text-slate-900 truncate">Tanam Pohon</div>
                      <div className="text-[5px] sm:text-[7px] lg:text-[8px] text-slate-500 truncate">May 20, 2026</div>
                    </div>
                    <div className="text-[6px] sm:text-[8px] lg:text-[9px] font-bold text-emerald-600 shrink-0">+94 pt</div>
                  </div>
                </div>
              </div>

              <div className="h-10 sm:h-12 lg:h-16 bg-white border-t border-slate-100 flex items-center justify-around px-2 sm:px-3 lg:px-4 shrink-0 pb-0.5 sm:pb-1 pointer-events-none">
                <Home className="size-3 sm:size-4 lg:size-5 text-emerald-600" />
                <ShieldCheck className="size-3 sm:size-4 lg:size-5 text-slate-400" />
                <div className="size-8 sm:size-10 lg:size-12 bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-md -mt-3 sm:-mt-4 lg:-mt-6 border-2 sm:border-2 lg:border-4 border-white shrink-0">
                  <span className="text-xs sm:text-base lg:text-xl leading-none">+</span>
                </div>
                <BarChart2 className="size-3 sm:size-4 lg:size-5 text-slate-400" />
                <Settings className="size-3 sm:size-4 lg:size-5 text-slate-400" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}