import Image from "next/image";
import Link from "next/link";
import { Leaf, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// --- CUSTOM SVG ICONS (Lucide Style) ---

const XIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M4 4l11.733 16H20L8.267 4z" />
    <path d="M4 20l6.768-6.768m2.464-2.464L20 4" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const MailIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 pt-20 pb-10 overflow-hidden relative">
      
      {/* ── BACKGROUND ORNAMENTS ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-emerald-50/30 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dzl9yxixg/image/upload/v1714418650/grid_pattern_yxh3d2.svg')] opacity-[0.03] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        
        {/* ── TOP SECTION: BRAND & NEWSLETTER ── */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-12 mb-20 relative z-10">
          
          <div className="max-w-sm flex flex-col items-start">
            <Link href="/" className="flex items-center gap-2.5 mb-6 group inline-flex">
              <Image
              src="/images/logo.svg"
              width={130}
              height={80}
              alt="Logo KlimaBot"
              className="w-auto object-contain"
              priority
               />
            </Link>
            <p 
              className="text-base text-slate-500 font-medium leading-relaxed" 
              style={{ fontFamily: '"Inter", sans-serif' }}
            >
              Building the infrastructure for a transparent green future. AI-verified actions, cryptographically proven impact.
            </p>
          </div>

          <div className="w-full max-w-md">
            <h4 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-widest">Stay Updated</h4>
            <div className="flex flex-col sm:flex-row gap-3 p-1.5 bg-slate-50 rounded-2xl border border-slate-100 shadow-inner focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 bg-transparent px-4 py-2 text-sm font-medium outline-none text-slate-700 placeholder:text-slate-400"
              />
              <Button className="h-10 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 shadow-sm">
                Subscribe
                <ArrowRight className="ml-2 size-3.5" />
              </Button>
            </div>
            <p className="mt-3 text-[11px] text-slate-400 font-medium px-1">
              Join 2,000+ CSR professionals getting our weekly impact insights.
            </p>
          </div>
        </div>

        {/* ── MIDDLE SECTION: LINKS ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-10 mb-20 relative z-10 border-t border-slate-50 pt-16">
          
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-wider">Product</h4>
            <ul className="space-y-4">
              <li><Link href="/admin" className="text-sm font-semibold text-slate-500 hover:text-emerald-600 transition-colors">Dashboard</Link></li>
              <li><Link href="#how-it-works" className="text-sm font-semibold text-slate-500 hover:text-emerald-600 transition-colors">How it works</Link></li>
              <li><Link href="#impact" className="text-sm font-semibold text-slate-500 hover:text-emerald-600 transition-colors">Global Impact</Link></li>
              <li><Link href="#pricing" className="text-sm font-semibold text-slate-500 hover:text-emerald-600 transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-wider">Resources</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-sm font-semibold text-slate-500 hover:text-emerald-600 transition-colors">Documentation</Link></li>
              <li><Link href="#" className="text-sm font-semibold text-slate-500 hover:text-emerald-600 transition-colors">AI Whitepaper</Link></li>
              <li><Link href="#" className="text-sm font-semibold text-slate-500 hover:text-emerald-600 transition-colors">Blockchain Proof</Link></li>
              <li><Link href="#" className="text-sm font-semibold text-slate-500 hover:text-emerald-600 transition-colors">API Keys</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-wider">Company</h4>
            <ul className="space-y-4">
              <li><Link href="#about" className="text-sm font-semibold text-slate-500 hover:text-emerald-600 transition-colors">About Us</Link></li>
              <li><Link href="#" className="text-sm font-semibold text-slate-500 hover:text-emerald-600 transition-colors">Careers</Link></li>
              <li><Link href="#" className="text-sm font-semibold text-slate-500 hover:text-emerald-600 transition-colors">Partnerships</Link></li>
              <li><Link href="#" className="text-sm font-semibold text-slate-500 hover:text-emerald-600 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-wider">Connect</h4>
            <div className="flex flex-wrap gap-3">
              {/* Menggunakan Custom SVG Icons */}
              <a href="#" className="size-11 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-600 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 hover:shadow-lg hover:shadow-emerald-200 transition-all duration-300 group">
                <XIcon className="size-4.5" />
              </a>
              <a href="#" className="size-11 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-600 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 hover:shadow-lg hover:shadow-emerald-200 transition-all duration-300">
                <LinkedinIcon className="size-4.5" />
              </a>
              <a href="#" className="size-11 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-600 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 hover:shadow-lg hover:shadow-emerald-200 transition-all duration-300">
                <GithubIcon className="size-4.5" />
              </a>
              <a href="mailto:hello@klimabot.com" className="size-11 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-600 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 hover:shadow-lg hover:shadow-emerald-200 transition-all duration-300">
                <MailIcon className="size-4.5" />
              </a>
            </div>
            <div className="mt-8 p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
               <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest mb-1">System Status</p>
               <div className="flex items-center gap-2">
                 <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-xs font-bold text-emerald-700">All systems operational</span>
               </div>
            </div>
          </div>

        </div>

        {/* ── BOTTOM SECTION: LEGAL & COPYRIGHT ── */}
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="text-xs font-bold text-slate-400">
              © {new Date().getFullYear()} Klimabot Labs Inc.
            </p>
            <p className="text-[10px] font-medium text-slate-300 uppercase tracking-widest">
              Made with 💚 for the Planet
            </p>
          </div>
          
          <div className="flex items-center gap-8 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
            <Link href="#" className="hover:text-emerald-600 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-emerald-600 transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-emerald-600 transition-colors">Cookie Policy</Link>
          </div>
        </div>
        
      </div>
    </footer>
  );
}