"use client";

import { useState, useEffect } from "react";
import { 
  Smartphone, 
  Bot, 
  ShieldCheck, 
  BarChart3, 
  Zap,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/ui/animated-list";

const steps = [
  {
    id: 1,
    title: "1. Capture & Submit",
    description: "Citizens simply snap a photo of their environmental action and send it to our Telegram Bot. No complicated apps, forms, or manual paperwork required.",
    icon: Smartphone,
    color: "text-blue-600",
    bg: "bg-blue-100/50",
    border: "border-blue-200/50",
    time: "0.0s",
  },
  {
    id: 2,
    title: "2. AI Verification",
    description: "Our advanced AI instantly analyzes the photo's visual data, GPS location, and timestamp to ensure the action is genuine and securely calculate its impact score.",
    icon: Bot,
    color: "text-purple-600",
    bg: "bg-purple-100/50",
    border: "border-purple-200/50",
    time: "1.2s",
  },
  {
    id: 3,
    title: "3. Cryptographic Proof",
    description: "Once verified by AI, the action is permanently recorded on the blockchain. This creates a transparent, tamper-proof digital receipt that cannot be altered or faked.",
    icon: ShieldCheck,
    color: "text-emerald-600",
    bg: "bg-emerald-100/50",
    border: "border-emerald-200/50",
    time: "2.5s",
  },
  {
    id: 4,
    title: "4. Instant CSR Funding",
    description: "CSR teams can monitor these fully verified actions in real-time through the dashboard and release funding automatically with complete transparency and confidence.",
    icon: BarChart3,
    color: "text-amber-600",
    bg: "bg-amber-100/50",
    border: "border-amber-200/50",
    time: "3.8s",
  },
];

const StepCard = ({ step }: { step: typeof steps[0] }) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[500px] transform-gpu cursor-pointer overflow-hidden rounded-2xl p-5 sm:p-6",
        "transition-all duration-300 ease-in-out hover:scale-[103%]",
        "bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-200/60 hover:shadow-xl hover:shadow-emerald-500/10"
      )}
    >
      <div className="flex flex-row items-start gap-4 sm:gap-5">
        {/* Ikon */}
        <div
          className={cn(
            "flex size-12 sm:size-14 shrink-0 items-center justify-center rounded-xl border shadow-sm mt-1",
            step.bg,
            step.border
          )}
        >
          <step.icon className={cn("size-6 sm:size-7", step.color)} strokeWidth={2} />
        </div>
        
        {/* Teks */}
        <div className="flex flex-col overflow-hidden w-full">
          <div className="flex flex-row items-center justify-between gap-2 mb-1">
            <span 
              className="text-base sm:text-lg font-bold text-slate-900 truncate"
              style={{ fontFamily: '"Geist", "Geist Sans", sans-serif' }}
            >
              {step.title}
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 shrink-0 bg-slate-50 px-2 py-0.5 rounded-md">
              +{step.time}
            </span>
          </div>
          <p 
            className="text-xs sm:text-sm font-medium text-slate-500 leading-relaxed"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            {step.description}
          </p>
        </div>
      </div>
      
      <CheckCircle2 className="absolute -bottom-4 -right-4 size-20 text-slate-900/[0.02] pointer-events-none" />
    </figure>
  );
};

// ─── MAIN COMPONENT ───
export default function HowItWorks() {
  // State untuk menyimpan item yang akan dirender secara dinamis di AnimatedList
  const [activeSteps, setActiveSteps] = useState<Array<typeof steps[0] & { uid: number }>>([]);

  // Logika Looping (Urutan Kebawah & Reset Rapi)
  useEffect(() => {
    // let currentIndex = 0;

    const addNextStep = () => {
      setActiveSteps((prevSteps) => {
        // Jika list sudah mencapai 4 langkah, bersihkan dan mulai lagi dari langkah 1 (Looping yang bersih)
        if (prevSteps.length === steps.length) {
          return [{ ...steps[0], uid: Date.now() }];
        }
        
        // Jika belum penuh, ambil langkah selanjutnya dan tambahkan ke BAWAH list
        const nextStep = steps[prevSteps.length];
        return [...prevSteps, { ...nextStep, uid: Date.now() }];
      });
    };

    // Timeout inisialisasi agar langkah pertama langsung muncul (memperbaiki ESLint warning setState sinkron)
    const initialTimeout = setTimeout(addNextStep, 100);
    // Interval 3 detik untuk memunculkan langkah berikutnya agar user punya cukup waktu membaca teks panjang
    const interval = setInterval(addNextStep, 3000); 

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <section id="how-it-works" className="relative py-24 lg:py-32 px-5 sm:px-6 max-w-7xl mx-auto overflow-hidden">
      
      {/* ── AMBIENT BACKGROUND GLOW ── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-emerald-100/40 via-transparent to-transparent -z-10 pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
        
        {/* ── LEFT COLUMN: Narrative from Problem to Solution ── */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left z-10">
          
          {/* Label Ala SaaS / Framer */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 mb-6">
            <Zap className="size-4 text-emerald-600" />
            <span 
              className="text-xs font-bold text-emerald-700 tracking-wide uppercase"
              style={{ fontFamily: '"Inter", sans-serif' }}
            >
              The Solution
            </span>
          </div>

          {/* Menghubungkan narasi: Masalah sebelumnya rusak, ini penawarnya */}
          <h2 
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tighter mb-6 leading-[1.1]"
            style={{ fontFamily: '"Geist", "Geist Sans", sans-serif' }}
          >
            Replace trust with <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">cryptographic truth.</span>
          </h2>

          <p 
            className="text-lg sm:text-xl text-slate-500 font-medium leading-relaxed mb-10 max-w-xl"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            We fixed the broken system. No more manual reports, fraud risks, or delayed funds. Watch how real-time actions from the ground turn into verifiable impact in four automated steps.
          </p>

          <Button 
            asChild
            className="h-14 px-8 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-base shadow-xl transition-all group  hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/20 w-full sm:w-auto"
          >
            <a href="/dashboard">
              View the Live System
              <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="w-full relative flex justify-center lg:justify-end mt-4 lg:mt-0">
          <div className="relative flex h-[540px] w-full max-w-[450px] flex-col overflow-hidden rounded-[2.5rem] bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] p-4 sm:p-6">
            
            <div className="flex items-center justify-between mb-4 px-2 shrink-0">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">System Flow</span>
              <div className="flex items-center gap-1.5">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-[10px] font-bold text-emerald-600">Automated</span>
              </div>
            </div>

            {/* MAGIC UI ANIMATED LIST COMPONENT */}
            <div className="flex-1 overflow-hidden relative">
              <AnimatedList delay={1500}>
                {activeSteps.map((step) => (
                  <StepCard key={step.uid} step={step} />
                ))}
              </AnimatedList>
            </div>

            {/* Efek Gradasi atas dan bawah agar kartu seolah muncul/tenggelam dari kehampaan */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-white/90 via-white/50 to-transparent rounded-b-[2.5rem] z-10" />
            <div className="pointer-events-none absolute inset-x-0 top-12 h-10 bg-gradient-to-b from-white/90 to-transparent z-10" />
          </div>
        </div>

      </div>
    </section>
  );
}