import React from "react";
import { 
  ShieldCheck, 
  Zap, 
  Leaf, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  XCircle,
  BarChart2,
  Sparkles,
  Camera,
  MapPin,
  Cpu,
  LayoutDashboard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";

// ─── KOMPONEN SIMULASI MAGIC UI ANIMATED BEAM ───

// Komponen Node untuk titik koneksi SVG sekarang menggunakan Shadcn Badge untuk labelnya
const BeamNode = ({ 
  x, y, icon: Icon, label, color="text-slate-600", bg="bg-white", border="border-slate-200", delay="0s", size="size-12 md:size-14" 
}: { 
  x: number, y: number, icon: any, label: string, color?: string, bg?: string, border?: string, delay?: string, size?: string 
}) => (
  <div 
    className="absolute flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-1/2" 
    style={{ left: `${(x/800)*100}%`, top: `${(y/400)*100}%` }}
  >
    <div className={cn("rounded-2xl flex items-center justify-center shadow-sm relative group bg-white", size)}>
      {/* Efek Ping/Glow di belakang icon */}
      <div className={`absolute inset-0 rounded-2xl opacity-20 ${bg} animate-ping`} style={{ animationDelay: delay, animationDuration: '3s' }} />
      {/* Container utama icon */}
      <div className={cn("relative z-10 size-full rounded-2xl flex items-center justify-center bg-white border", border)}>
         <Icon className={cn("size-5 md:size-6", color)} strokeWidth={2} />
      </div>
    </div>
    {/* Menggunakan Shadcn Badge untuk Label Teks */}
    <Badge 
      variant="secondary" 
      className="mt-2.5 text-[8px] md:text-[9px] font-bold text-slate-500 uppercase tracking-widest bg-white/90 backdrop-blur-sm px-2.5 py-0.5 md:py-1 border border-slate-200/60 shadow-sm hidden md:flex"
    >
      {label}
    </Badge>
  </div>
);

const AnimatedBeamNetwork = () => {
  return (
    <div className="relative w-full max-w-5xl mx-auto aspect-square md:aspect-[2/1] bg-slate-50/50 rounded-[2.5rem] border border-slate-200/80 shadow-inner overflow-hidden mb-20 lg:mb-24 flex items-center justify-center">
      
      {/* Logika Animasi Halus (Smooth Seamless Loop):
        Dengan pathLength="100", dasharray "20 80" menghasilkan panjang tepat 100.
        Pergerakan dari stroke-dashoffset 100 ke 0 menjamin loop yang tidak pernah patah.
        Penggunaan negative animation-delay membuat semua sinar sudah tersebar rapi sejak awal.
      */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes beam-flow {
          from { stroke-dashoffset: 100; }
          to { stroke-dashoffset: 0; }
        }
        .animate-beam-1 { 
          stroke-dasharray: 20 80; 
          animation: beam-flow 3s linear infinite; 
        }
        .animate-beam-2 { 
          stroke-dasharray: 20 80; 
          animation: beam-flow 3s linear infinite; 
          animation-delay: -1s; 
        }
        .animate-beam-3 { 
          stroke-dasharray: 20 80; 
          animation: beam-flow 3s linear infinite; 
          animation-delay: -2s; 
        }
      `}} />

      <svg viewBox="0 0 800 400" className="absolute inset-0 size-full pointer-events-none" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- JALUR DASAR (ABU-ABU HALUS) --- */}
        <g fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 4">
          <path d="M 100 80 C 250 80, 250 200, 400 200" />
          <path d="M 100 200 L 400 200" />
          <path d="M 100 320 C 250 320, 250 200, 400 200" />
          <path d="M 400 200 C 550 200, 550 120, 700 120" />
          <path d="M 400 200 C 550 200, 550 280, 700 280" />
        </g>

        {/* --- SINAR BERGERAK (SMOOTH ANIMATED BEAMS) --- */}
        <g fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" filter="url(#glow)" className="opacity-80">
          <path d="M 100 80 C 250 80, 250 200, 400 200" pathLength="100" className="animate-beam-1" />
          <path d="M 100 200 L 400 200" pathLength="100" className="animate-beam-2" />
          <path d="M 100 320 C 250 320, 250 200, 400 200" pathLength="100" className="animate-beam-3" />
          <path d="M 400 200 C 550 200, 550 120, 700 120" pathLength="100" className="animate-beam-1" />
          <path d="M 400 200 C 550 200, 550 280, 700 280" pathLength="100" className="animate-beam-2" />
        </g>
      </svg>

      {/* --- NODE --- */}
      <BeamNode x={100} y={80} icon={Camera} label="Visual Data" color="text-blue-500" border="border-blue-200" bg="bg-blue-500" delay="0s" />
      <BeamNode x={100} y={200} icon={MapPin} label="GPS Location" color="text-amber-500" border="border-amber-200" bg="bg-amber-500" delay="1s" />
      <BeamNode x={100} y={320} icon={Clock} label="Timestamp" color="text-purple-500" border="border-purple-200" bg="bg-purple-500" delay="2s" />
      <BeamNode x={400} y={200} icon={Cpu} label="Klimabot AI" color="text-emerald-600" border="border-emerald-300" bg="bg-emerald-500" size="size-16 md:size-20" />
      <BeamNode x={700} y={120} icon={ShieldCheck} label="On-Chain Proof" color="text-slate-700" border="border-slate-300" bg="bg-slate-500" delay="0s" />
      <BeamNode x={700} y={280} icon={LayoutDashboard} label="CSR Dashboard" color="text-teal-600" border="border-teal-200" bg="bg-teal-500" delay="1s" />
    </div>
  );
};


// ─── DATA MANFAAT (WHY IT MATTERS) ───
const benefits = [
  {
    icon: ShieldCheck,
    title: "Trust real actions, not reports",
    description: "AI verification ensures every action submitted is genuine, transparent, and fully accountable. Say goodbye to fabricated data.",
    color: "text-emerald-600",
    bg: "bg-emerald-50/80",
    border: "border-emerald-200/60",
    glow: "bg-emerald-300/30",
    accent: "via-emerald-500",
    watermark: "group-hover:text-emerald-100/50"
  },
  {
    icon: Zap,
    title: "Make faster funding decisions",
    description: "No more waiting for end-of-month reports. Real-time verified data helps you act quickly and release funds to high-impact actions instantly.",
    color: "text-blue-600",
    bg: "bg-blue-50/80",
    border: "border-blue-200/60",
    glow: "bg-blue-300/30",
    accent: "via-blue-500",
    watermark: "group-hover:text-blue-100/50"
  },
  {
    icon: Leaf,
    title: "See impact in real-time",
    description: "Track exactly what is happening on the ground and measure the direct environmental impact your funding creates, minute by minute.",
    color: "text-teal-600",
    bg: "bg-teal-50/80",
    border: "border-teal-200/60",
    glow: "bg-teal-300/30",
    accent: "via-teal-500",
    watermark: "group-hover:text-teal-100/50"
  },
];

export default function WhyItMatters() {
  return (
    <section id="why-it-matters" className="relative pt-20 pb-24 lg:pt-32 lg:pb-32 px-5 sm:px-6 max-w-7xl mx-auto overflow-hidden bg-white">
      
      {/* ── 1. HEADER & DATA FLOW NETWORK ── */}
      <div className="flex flex-col items-center text-center mb-10 z-10 relative">
        <div className="absolute top-0 -translate-y-1/2 bg-emerald-100/50 w-[600px] h-[300px] rounded-full blur-[80px] -z-10 pointer-events-none" />

        <Badge variant="outline" className="px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-700 border-emerald-200 bg-emerald-50/80 backdrop-blur-sm shadow-sm mb-6 gap-2">
          <Sparkles className="size-3.5" />
          The Outcome
        </Badge>

        <h2 
          className="capitalize text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tighter mb-6 leading-[1.1]"
          style={{ fontFamily: '"Geist", "Geist Sans", sans-serif' }}
        >
          Why it <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">matters.</span>
        </h2>

        <p 
          className="text-lg sm:text-xl text-slate-500 max-w-2xl font-medium leading-relaxed"
          style={{ fontFamily: '"Inter", sans-serif' }}
        >
          By automating verification and removing human bottlenecks, we empower CSR teams to focus on what truly matters: scaling real, measurable impact.
        </p>
      </div>

      <AnimatedBeamNetwork />

      {/* ── 2. BENEFIT CARDS (CREATIVE & INTERACTIVE) ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-24 lg:mb-32 relative z-10">
        {benefits.map((benefit, index) => (
          <div 
            key={index} 
            className={cn(
              "group relative flex flex-col items-start p-8 lg:p-10 rounded-[2.5rem] bg-white",
              "border border-slate-100/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] overflow-hidden",
              "transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-2 hover:border-slate-200"
            )}
          >
            {/* 1. Animated Top Accent Line */}
            <div className={cn(
              "absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700",
              benefit.accent
            )} />

            {/* 2. Soft Ambient Inner Glow (Top Right) */}
            <div className={cn(
              "absolute -top-16 -right-16 size-48 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none",
              benefit.glow
            )} />

            {/* 3. Giant Watermark Background Icon */}
            <benefit.icon 
              className={cn(
                "absolute -bottom-8 -right-8 size-40 text-slate-50 transition-all duration-700 -rotate-12 pointer-events-none",
                benefit.watermark,
                "group-hover:scale-110 group-hover:-rotate-6"
              )} 
              strokeWidth={0.5} 
            />

            {/* Ikon Container Utama */}
            <div className={cn(
              "relative z-10 size-14 rounded-2xl flex items-center justify-center mb-6 border transition-all duration-500 group-hover:scale-110 group-hover:shadow-md", 
              benefit.bg, 
              benefit.border
            )}>
              <benefit.icon className={cn("size-6", benefit.color)} strokeWidth={2} />
            </div>
            
            <h3 
              className="relative z-10 text-xl font-extrabold text-slate-900 mb-4 leading-tight group-hover:text-slate-800 transition-colors"
              style={{ fontFamily: '"Geist", "Geist Sans", sans-serif' }}
            >
              {benefit.title}
            </h3>
            
            <p 
              className="relative z-10 text-sm text-slate-500 font-medium leading-relaxed group-hover:text-slate-600 transition-colors"
              style={{ fontFamily: '"Inter", sans-serif' }}
            >
              {benefit.description}
            </p>
          </div>
        ))}
      </div>


      {/* ── 3. PRODUCT PREVIEW BLOCK ── */}
      <div className="relative w-full rounded-[3rem] bg-[#f8faf9] border border-slate-200/60 p-8 sm:p-12 lg:p-16 overflow-hidden flex flex-col lg:flex-row items-center gap-12 lg:gap-16 shadow-sm">
        
        <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dzl9yxixg/image/upload/v1714418650/grid_pattern_yxh3d2.svg')] opacity-[0.15] mix-blend-multiply pointer-events-none" />

        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
          <Badge variant="outline" className="text-xs font-bold text-emerald-700 uppercase tracking-widest mb-4 flex items-center gap-2 border-emerald-200 bg-emerald-50 px-2.5 py-1">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            Product Preview
          </Badge>
          <h3 
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tighter mb-5 leading-[1.1]"
            style={{ fontFamily: '"Geist", "Geist Sans", sans-serif' }}
          >
            Live Verified <br className="hidden lg:block" />
            Environmental Actions
          </h3>
          <p 
            className="text-base text-slate-500 font-medium leading-relaxed mb-8 max-w-md"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            Explore real actions from the field, verified by AI and ready for funding in a clean, intuitive dashboard.
          </p>
          <Button 
            asChild
            className="h-14 px-8 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-[0_8px_25px_rgba(5,150,105,0.3)] transition-all group"
          >
            <Link href="/admin">
              View Live Dashboard
              <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Dashboard Mockup */}
        <div className="w-full lg:w-[55%] flex justify-center lg:justify-end z-10 relative perspective-1000">
          <div className="absolute inset-0 bg-emerald-300/30 blur-[80px] rounded-full -z-10" />
          <div className="w-full max-w-[500px] bg-white rounded-2xl border border-slate-200/80 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] transform-gpu transition-transform duration-700 hover:scale-[1.02] hover:-translate-y-2 overflow-hidden flex flex-col">
            
            <div className="h-10 bg-slate-50 border-b border-slate-100 flex items-center px-4 gap-2 w-full shrink-0">
              <div className="flex gap-1.5">
                <div className="size-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]/50" />
                <div className="size-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50" />
                <div className="size-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]/50" />
              </div>
              <div className="mx-auto h-5 w-48 bg-white border border-slate-200/60 rounded flex items-center justify-center shadow-sm">
                <span className="text-[9px] font-medium text-slate-400 font-mono">app.klimabot.com/live</span>
              </div>
            </div>

            <div className="p-5 sm:p-6 bg-slate-50/30">
              <div className="flex justify-between items-end mb-4 border-b border-slate-100 pb-3">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">Recent Actions</div>
                <div className="text-[10px] font-semibold text-emerald-600 cursor-pointer hover:underline">View all</div>
              </div>
              
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between group/item bg-white p-3 rounded-xl border border-slate-100 shadow-sm transition-colors hover:border-emerald-100">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-12 sm:w-14 h-9 sm:h-10 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200/60">
                      <img src="https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=100&h=70&fit=crop&q=80" alt="Pilah Sampah" className="w-full h-full object-cover" />
                    </div>
                    <div className="overflow-hidden pr-2">
                      <div className="text-xs sm:text-sm font-bold text-slate-900 mb-0.5 truncate">Pilah Sampah Plastik</div>
                      <div className="text-[9px] sm:text-[10px] font-medium text-slate-500 truncate">20 May 2026, 09:41 WIB</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                    <Badge variant="secondary" className="hidden sm:flex items-center gap-1 text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100/50 px-2 py-0.5 shadow-none">
                      <CheckCircle2 className="size-3"/> Verified
                    </Badge>
                    <div className="text-right">
                      <div className="text-sm font-bold text-emerald-600 leading-none">94<span className="text-[9px] text-slate-400">/100</span></div>
                      <div className="text-[8px] font-medium text-slate-400 mt-1">High Impact</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between group/item bg-white p-3 rounded-xl border border-slate-100 shadow-sm transition-colors hover:border-amber-100">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-12 sm:w-14 h-9 sm:h-10 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200/60">
                      <img src="https://images.unsplash.com/photo-1618477461853-cf6ed80fbfc9?w=100&h=70&fit=crop&q=80" alt="Bersih Pantai" className="w-full h-full object-cover" />
                    </div>
                    <div className="overflow-hidden pr-2">
                      <div className="text-xs sm:text-sm font-bold text-slate-900 mb-0.5 truncate">Bersih Pantai</div>
                      <div className="text-[9px] sm:text-[10px] font-medium text-slate-500 truncate">20 May 2026, 08:15 WIB</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                    <Badge variant="secondary" className="hidden sm:flex items-center gap-1 text-[9px] font-bold text-amber-700 bg-amber-50 border border-amber-100/50 px-2 py-0.5 shadow-none">
                      <Clock className="size-3"/> Pending
                    </Badge>
                    <div className="text-right">
                      <div className="text-sm font-bold text-amber-500 leading-none">78<span className="text-[9px] text-slate-400">/100</span></div>
                      <div className="text-[8px] font-medium text-slate-400 mt-1">Medium Impact</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between group/item bg-white p-3 rounded-xl border border-slate-100 shadow-sm transition-colors hover:border-red-100">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-12 sm:w-14 h-9 sm:h-10 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200/60">
                      <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=100&h=70&fit=crop&q=80" alt="Tanam Pohon" className="w-full h-full object-cover" />
                    </div>
                    <div className="overflow-hidden pr-2">
                      <div className="text-xs sm:text-sm font-bold text-slate-900 mb-0.5 truncate">Tanam Pohon</div>
                      <div className="text-[9px] sm:text-[10px] font-medium text-slate-500 truncate">19 May 2026, 16:20 WIB</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                    <Badge variant="secondary" className="hidden sm:flex items-center gap-1 text-[9px] font-bold text-red-700 bg-red-50 border border-red-100/50 px-2 py-0.5 shadow-none">
                      <XCircle className="size-3"/> Rejected
                    </Badge>
                    <div className="text-right">
                      <div className="text-sm font-bold text-red-500 leading-none">32<span className="text-[9px] text-slate-400">/100</span></div>
                      <div className="text-[8px] font-medium text-slate-400 mt-1">Low Impact</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>


      {/* ── 4. FINAL CTA BLOCK (LIGHT MODE CREATIVE) ── */}
      <div className="mt-20 lg:mt-32 relative w-full rounded-[3rem] bg-emerald-50/50 border border-emerald-100 p-10 sm:p-16 lg:p-24 flex flex-col items-center text-center overflow-hidden shadow-sm">
        
        <div className="absolute -bottom-20 -left-20 size-64 bg-emerald-300/30 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute -top-20 -right-20 size-64 bg-teal-300/30 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dzl9yxixg/image/upload/v1714418650/grid_pattern_yxh3d2.svg')] opacity-[0.1] mix-blend-multiply pointer-events-none" />

        <Leaf className="absolute -bottom-6 left-10 size-32 text-emerald-600/5 -rotate-12 pointer-events-none" />
        <Leaf className="absolute -top-6 right-10 size-32 text-teal-600/5 rotate-45 pointer-events-none" />

        <Badge variant="outline" className="px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-700 border-emerald-200 bg-white shadow-sm mb-6 gap-2 relative z-10">
          Get Started
        </Badge>

        <h2 
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tighter mb-6 relative z-10 leading-[1.1]"
          style={{ fontFamily: '"Geist", "Geist Sans", sans-serif' }}
        >
          Ready to fund <br className="hidden sm:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">real impact?</span>
        </h2>
        
        <p 
          className="text-base sm:text-lg text-slate-500 font-medium mb-10 max-w-xl relative z-10 leading-relaxed"
          style={{ fontFamily: '"Inter", sans-serif' }}
        >
          Join forward-thinking companies using Klimabot to create a cleaner, greener future based on verified data.
        </p>
        
        <Button 
          asChild
          className="h-14 px-8 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-lg shadow-emerald-600/20 transition-all group relative z-10 border-none"
        >
          <Link href="/admin">
            Start Verifying Now
            <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>

    </section>
  );
}