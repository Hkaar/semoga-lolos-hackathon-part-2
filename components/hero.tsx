"use client";

import React from "react";
import { ArrowRight, Leaf, CheckCircle2, Clock, XCircle, Home, BarChart2, ShieldCheck, Settings, Recycle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-8 min-h-[90vh] bg-white overflow-hidden">
      
      {/* ── KIRI: KONTEN TEKS (ALA CREST FRAMER) ── */}
      <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left z-10 w-full max-w-2xl">
        
        {/* Badge / Tagline */}
        {/* <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald-50 border border-emerald-100 mb-6">
          <Leaf className="size-3.5 text-emerald-600" />
          <span className="text-xs font-bold text-emerald-700 tracking-wide uppercase" style={{ fontFamily: '"Inter", sans-serif' }}>
            #1 Best & Trusted CSR Platform
          </span>
        </div> */}

        {/* Headline Raksasa */}
        <h1 
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-slate-900 leading-[1.05] mb-6"
          style={{ fontFamily: '"Geist", "Geist Sans", sans-serif' }}
        >
          Verify <br className="hidden lg:block" />
          environmental <br className="hidden lg:block" />
          actions <span className="text-emerald-600">before</span> <br className="hidden lg:block" />
          you fund them
        </h1>

        {/* Subtitle */}
        <p 
          className="text-lg sm:text-xl text-slate-500 max-w-xl font-medium leading-relaxed mb-10"
          style={{ fontFamily: '"Inter", sans-serif' }}
        >
          Improve collaboration, monitor progress in real-time, and fund projects with absolute confidence — all in one intuitive dashboard.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full sm:w-auto">
          <Button 
            asChild
            className="h-14 px-8 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-sm transition-colors group w-full sm:w-auto"
          >
            <a href="/admin">
              Try it for Free
              <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-14 px-8 rounded-xl bg-transparent hover:bg-slate-50 text-slate-700 font-bold text-base border-slate-200 group transition-colors w-full sm:w-auto shadow-sm"
          >
            Learn More
            <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1 text-slate-400" />
          </Button>
        </div>
      </div>

      {/* ── KANAN: OVERLAPPING MOCKUPS (DESKTOP & MOBILE) ── */}
      <div className="flex-1 w-full relative z-10 h-[500px] sm:h-[600px] mt-10 lg:mt-0 flex justify-end">
        
        {/* Ornamen latar belakang super halus (Grid Tipis) */}
        <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dzl9yxixg/image/upload/v1714418650/grid_pattern_yxh3d2.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-30 -z-10" />

        {/* 1. DESKTOP MOCKUP (Di Belakang) */}
        <div className="absolute top-0 right-0 w-[85%] sm:w-[90%] h-[400px] sm:h-[480px] bg-white border border-slate-200/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] rounded-2xl overflow-hidden flex flex-col font-sans">
          
          {/* Top Bar Desktop */}
          <div className="h-10 bg-slate-50 border-b border-slate-100 flex items-center px-4 gap-2 w-full shrink-0">
            <div className="flex gap-1.5">
              <div className="size-2.5 rounded-full bg-slate-300" />
              <div className="size-2.5 rounded-full bg-slate-300" />
              <div className="size-2.5 rounded-full bg-slate-300" />
            </div>
            <div className="mx-auto h-5 w-48 bg-white border border-slate-100 rounded flex items-center justify-center shadow-sm">
              <span className="text-[9px] font-medium text-slate-400 font-mono">app.klimabot.com</span>
            </div>
          </div>

          {/* Konten Desktop */}
          <div className="flex flex-1 overflow-hidden bg-slate-50/50">
            {/* Sidebar Mini */}
            <div className="w-16 sm:w-48 bg-white border-r border-slate-100 p-3 sm:p-4 flex flex-col gap-4 shrink-0">
              <div className="flex items-center gap-2 mb-4">
                <div className="size-6 sm:size-8 bg-emerald-100 rounded-md flex items-center justify-center shrink-0">
                  <Leaf className="size-3 sm:size-4 text-emerald-600" />
                </div>
                <div className="hidden sm:block font-bold text-slate-900 text-sm">Klimabot</div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-3 p-2 bg-emerald-50 text-emerald-700 rounded-lg">
                  <Home className="size-4" /> <span className="hidden sm:block text-xs font-semibold">Dashboard</span>
                </div>
                <div className="flex items-center gap-3 p-2 text-slate-500">
                  <ShieldCheck className="size-4" /> <span className="hidden sm:block text-xs font-medium">Proofs</span>
                </div>
                <div className="flex items-center gap-3 p-2 text-slate-500">
                  <BarChart2 className="size-4" /> <span className="hidden sm:block text-xs font-medium">Impact</span>
                </div>
              </div>
            </div>

            {/* Main Area Desktop */}
            <div className="flex-1 p-4 sm:p-6 flex flex-col gap-4">
              <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                <div>
                  <div className="font-bold text-slate-900 text-sm">Dashboard</div>
                  <div className="text-[10px] text-slate-500">Welcome back, Admin 👋</div>
                </div>
                <div className="size-6 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-[8px]">
                  HL
                </div>
              </div>

              {/* Stats Area */}
              <div className="flex gap-3">
                <div className="flex-1 bg-white border border-slate-100 shadow-sm p-3 rounded-xl">
                  <div className="text-[10px] font-bold text-slate-500 mb-1">Verified Actions</div>
                  <div className="flex items-center gap-3">
                    {/* Fake Chart Ring */}
                    <div className="size-10 rounded-full border-[3px] border-slate-100 border-t-emerald-500 border-r-emerald-500" />
                    <div>
                      <div className="font-bold text-lg text-slate-900 leading-none">82</div>
                      <div className="text-[8px] text-emerald-600 font-medium">+12 this week</div>
                    </div>
                  </div>
                </div>
                <div className="flex-1 bg-white border border-slate-100 shadow-sm p-3 rounded-xl hidden sm:block">
                  <div className="text-[10px] font-bold text-slate-500 mb-1">Impact Score</div>
                  <div className="flex items-center gap-3">
                    {/* Fake Chart Ring */}
                    <div className="size-10 rounded-full border-[3px] border-slate-100 border-t-blue-500 border-r-blue-500 border-b-blue-500" />
                    <div>
                      <div className="font-bold text-lg text-slate-900 leading-none">94<span className="text-[10px] text-slate-400">/100</span></div>
                      <div className="text-[8px] text-emerald-600 font-medium">Excellent</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* List Area */}
              <div className="flex-1 bg-white border border-slate-100 shadow-sm p-3 rounded-xl">
                <div className="text-[10px] font-bold text-slate-800 uppercase tracking-wider mb-3">Recent Actions</div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded bg-slate-100 border border-slate-200 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=100&h=100&fit=crop&q=80" alt="img" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Pilah Sampah</div>
                        <div className="text-[9px] text-slate-500">Jakarta, ID</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                      <CheckCircle2 className="size-3"/> Verified
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded bg-slate-100 border border-slate-200 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1618477461853-cf6ed80fbfc9?w=100&h=100&fit=crop&q=80" alt="img" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Bersih Pantai</div>
                        <div className="text-[9px] text-slate-500">Bali, ID</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded">
                      <Clock className="size-3"/> Pending
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. MOBILE MOCKUP (Di Depan / Overlapping) */}
        <div className="absolute bottom-4 sm:bottom-10 left-0 lg:left-4 w-[200px] sm:w-[240px] h-[400px] sm:h-[480px] bg-white border-[6px] sm:border-[8px] border-slate-900 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)] rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden flex flex-col z-20 font-sans">
          
          {/* Top Bar Mobile (Dynamic Island / Notch) */}
          <div className="h-6 w-full flex justify-center pt-2 shrink-0 bg-white z-10">
            <div className="w-16 sm:w-20 h-4 bg-slate-900 rounded-full" />
          </div>

          <div className="flex-1 overflow-hidden bg-slate-50/50 flex flex-col p-3 sm:p-4">
            <div className="flex items-center justify-between mb-4 mt-2">
              <div className="size-6 bg-emerald-100 rounded flex items-center justify-center">
                <Leaf className="size-3 text-emerald-600" />
              </div>
              <div className="size-6 bg-slate-200 rounded-full" />
            </div>

            <div className="font-bold text-slate-900 text-sm sm:text-base leading-tight mb-4">
              Hi, Andi 👋 <br />
              <span className="text-xs font-medium text-slate-500">Track your impact</span>
            </div>

            {/* Mobile Stats */}
            <div className="bg-white border border-slate-100 shadow-sm p-3 rounded-xl mb-4">
              <div className="text-[10px] font-bold text-slate-500 mb-2">Your Contribution</div>
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-full border-[4px] border-slate-100 border-t-emerald-500 border-r-emerald-500 border-b-emerald-500 flex items-center justify-center">
                  <span className="text-xs font-bold text-slate-800">18<span className="text-[8px]">kg</span></span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-[9px] font-medium text-slate-600">
                    <div className="size-2 rounded-sm bg-emerald-500" /> Verified (12)
                  </div>
                  <div className="flex items-center gap-1 text-[9px] font-medium text-slate-600">
                    <div className="size-2 rounded-sm bg-amber-400" /> Pending (6)
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile List */}
            <div className="text-[10px] font-bold text-slate-800 mb-2">Recent</div>
            <div className="space-y-2 flex-1 overflow-hidden">
              <div className="bg-white border border-slate-100 shadow-sm p-2 rounded-lg flex items-center gap-2">
                <div className="size-8 rounded bg-emerald-50 flex items-center justify-center">
                  <Leaf className="size-4 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <div className="text-[10px] font-bold text-slate-900">Tanam Pohon</div>
                  <div className="text-[8px] text-slate-500">May 20, 2026</div>
                </div>
                <div className="text-[9px] font-bold text-emerald-600">+94 pt</div>
              </div>
              <div className="bg-white border border-slate-100 shadow-sm p-2 rounded-lg flex items-center gap-2">
                <div className="size-8 rounded bg-sky-50 flex items-center justify-center">
                  <Recycle className="size-4 text-sky-600" />
                </div>
                <div className="flex-1">
                  <div className="text-[10px] font-bold text-slate-900">Daur Ulang</div>
                  <div className="text-[8px] text-slate-500">May 19, 2026</div>
                </div>
                <div className="text-[9px] font-bold text-emerald-600">+81 pt</div>
              </div>
            </div>
          </div>

          {/* Bottom Nav Mobile */}
          <div className="h-14 sm:h-16 bg-white border-t border-slate-100 flex items-center justify-around px-4 shrink-0 pb-1">
            <Home className="size-5 text-emerald-600" />
            <ShieldCheck className="size-5 text-slate-400" />
            <div className="size-10 sm:size-12 bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-md -mt-4 sm:-mt-6 border-4 border-white">
              <span className="text-xl leading-none">+</span>
            </div>
            <BarChart2 className="size-5 text-slate-400" />
            <Settings className="size-5 text-slate-400" />
          </div>
        </div>

      </div>
    </section>
  );
}