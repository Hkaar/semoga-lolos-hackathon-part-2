import React from "react";
import { 
  FileWarning, 
  ShieldAlert, 
  EyeOff, 
  Timer, 
  AlertTriangle, 
  X, 
  Clock,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const BentoGrid = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("grid w-full auto-rows-[20rem] sm:auto-rows-[22rem] grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6", className)}>
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  colorClass,
}: {
  name: string;
  className: string;
  background: React.ReactNode;
  Icon: any;
  description: string;
  href: string;
  cta: string;
  colorClass: string;
}) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-3xl",
      "bg-white border border-slate-200/60 shadow-[0_2px_10px_rgba(0,0,0,0.02)]",
      "transform-gpu transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/10",
      className,
    )}
  >
    {/* Latar Belakang (Visual Element) */}
    <div className="absolute inset-0 w-full h-full overflow-hidden">{background}</div>
    
    {/* Overlay tipis agar teks tetap terbaca */}
    <div className="absolute inset-0 bg-linear-to-t from-white/90 via-white/40 to-transparent z-0" />

    {/* Konten Utama (Bergeser ke atas saat di-hover) */}
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-2 p-6 sm:p-8 transition-all duration-500 group-hover:-translate-y-10 mt-auto">
      <div className={cn("size-12 rounded-xl flex items-center justify-center bg-white border border-slate-100 shadow-sm mb-2 transform-gpu origin-left transition-all duration-500 ease-in-out group-hover:scale-75", colorClass.replace('text-', 'text-').replace('500', '600'))}>
        <Icon className={cn("size-6", colorClass)} />
      </div>
      <h3 
        className="text-xl sm:text-2xl font-bold text-slate-900"
        style={{ fontFamily: '"Geist", "Geist Sans", sans-serif' }}
      >
        {name}
      </h3>
      <p 
        className="max-w-lg text-sm sm:text-base text-slate-500 font-medium"
        style={{ fontFamily: '"Inter", sans-serif' }}
      >
        {description}
      </p>
    </div>
    
    {/* Darken overlay effect on hover */}
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-500 group-hover:bg-slate-900/[.02]" />
  </div>
);

// ─── MAIN COMPONENT ───

export default function Problem() {
  const problems = [
    {
      name: "Unverified Impact",
      description: "Most environmental reports lack cryptographic proof and rely heavily on manual validation, making them highly prone to human error.",
      className: "col-span-1 md:col-span-2", // Kartu Lebar
      Icon: FileWarning,
      colorClass: "text-red-500",
      href: "/admin",
      // cta: "See AI Verification",
      background: (
        <div className="absolute right-0 bottom-0 translate-y-12 translate-x-12 md:translate-y-4 md:translate-x-8 w-[280px] rounded-2xl bg-white border border-slate-200 shadow-xl p-5 rotate-6 group-hover:rotate-3 group-hover:scale-105 transition-all duration-500 opacity-60 group-hover:opacity-100">
          <div className="flex items-center gap-4 mb-5">
            <div className="size-10 bg-slate-100 rounded-lg flex items-center justify-center"><FileWarning className="size-5 text-slate-400" /></div>
            <div className="space-y-2"><div className="h-2.5 w-24 bg-slate-200 rounded-full" /><div className="h-2 w-32 bg-slate-100 rounded-full" /></div>
          </div>
          <div className="space-y-3 mb-5">
            <div className="h-2 w-full bg-slate-100 rounded-full" />
            <div className="h-2 w-5/6 bg-slate-100 rounded-full" />
            <div className="h-2 w-4/6 bg-slate-100 rounded-full" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-red-50 border border-red-100 text-red-600 text-xs font-bold">
            <X className="size-4" /> Unverified Report
          </div>
        </div>
      ),
    },
    {
      name: "Manipulation Risks",
      description: "It is hard to know if actions are real, recent, or simply duplicated from old data sources.",
      className: "col-span-1 md:col-span-1", // Kartu Kotak
      Icon: ShieldAlert,
      colorClass: "text-orange-500",
      href: "/admin",
      cta: "Learn about Anti-Fraud",
      background: (
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] group-hover:opacity-[0.08] group-hover:scale-110 transition-all duration-500">
          <ShieldAlert className="size-48 text-orange-500" />
        </div>
      ),
    },
    {
      name: "No Visibility",
      description: "Decisions are slow because data from the field comes too late or sometimes not at all.",
      className: "col-span-1 md:col-span-1", // Kartu Kotak
      Icon: EyeOff,
      colorClass: "text-amber-500",
      href: "/admin",
      cta: "Explore Live Dashboard",
      background: (
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] group-hover:opacity-[0.08] group-hover:scale-110 transition-all duration-500">
          <EyeOff className="size-48 text-amber-500" />
        </div>
      ),
    },
    {
      name: "Inefficient Funding",
      description: "Bureaucracy and manual checks create massive bottlenecks, delaying critical funds for real environmental work.",
      className: "col-span-1 md:col-span-2", // Kartu Lebar
      Icon: Timer,
      colorClass: "text-rose-500",
      href: "/admin",
      cta: "Automate Funding",
      background: (
        <div className="absolute right-0 top-0 md:top-auto md:bottom-0 -translate-y-4 translate-x-8 md:translate-y-8 md:translate-x-12 w-[240px] rounded-2xl bg-white border border-slate-200 shadow-xl p-4 -rotate-6 group-hover:-rotate-3 group-hover:scale-105 transition-all duration-500 opacity-60 group-hover:opacity-100">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-xs font-semibold text-slate-500">Manual Validation</span>
              <Clock className="size-4 text-amber-500" />
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-xs font-semibold text-slate-500">Board Approval</span>
              <Clock className="size-4 text-amber-500" />
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-rose-50 border border-rose-100">
              <span className="text-xs font-semibold text-rose-600">Fund Release</span>
              <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wide">Delayed</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="problems" className="relative py-24 lg:py-32 px-5 sm:px-6 max-w-7xl mx-auto overflow-hidden bg-white">
      
      {/* ── HEADER SECTION ── */}
      <div className="flex flex-col items-center text-center mb-16 lg:mb-24">
        {/* Label Ala SaaS / Framer */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-100 mb-6">
          <AlertTriangle className="size-4 text-red-500" />
          <span 
            className="text-xs font-bold text-red-600 tracking-wide uppercase"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            The Status Quo
          </span>
        </div>

        <h2 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tighter mb-6 leading-[1.1]"
          style={{ fontFamily: '"Geist", "Geist Sans", sans-serif' }}
        >
          Why the current system <br className="hidden sm:block" />
          is <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 to-orange-500">broken.</span>
        </h2>

        <p 
          className="text-lg sm:text-xl text-slate-500 max-w-2xl font-medium leading-relaxed"
          style={{ fontFamily: '"Inter", sans-serif' }}
        >
          Traditional environmental funding relies on trust, not truth. Manual reporting creates bottlenecks, fraud risks, and delayed impact.
        </p>
      </div>

      
      <BentoGrid>
        {problems.map((problem) => (
          <BentoCard key={problem.name} {...problem} />
        ))}
      </BentoGrid>

    </section>
  );
}