"use client";

import * as React from "react";
import {
  Bell,
  ChevronDown,
  Calendar,
  TrendingUp,
  TrendingDown,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  Recycle,
  TreeDeciduous,
  Droplets,
  Users,
  ShieldCheck,
  ArrowUpRight,
  Filter,
  Download,
  RefreshCw,
  Activity,
  ArrowRight,
  Leaf,
  Trash2,
  Cpu,
} from "lucide-react";

// shadcn/ui components
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// ─── DATA ────────────────────────────────────────────────────────────────────

const actions = [
  {
    id: "ACT-001",
    title: "Pilah Sampah Plastik",
    location: "Jakarta, ID",
    time: "2 min ago",
    category: "Recycling",
    desc: "Sampah plastik dipilah dan dikumpulkan untuk didaur ulang secara optimal di fasilitas terpusat.",
    score: 94,
    co2: "18 kg",
    status: "Verified",
    img: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=400&h=300&fit=crop&q=80",
  },
  {
    id: "ACT-002",
    title: "Penanaman Pohon",
    location: "Bogor, ID",
    time: "18 min ago",
    category: "Reforestation",
    desc: "Pohon ditanam di area terbuka untuk penghijauan dan restorasi lahan kritis daerah tangkapan air.",
    score: 72,
    co2: "32 kg",
    status: "Pending",
    img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop&q=80",
  },
  {
    id: "ACT-003",
    title: "Daur Ulang Kertas",
    location: "Bandung, ID",
    time: "45 min ago",
    category: "Recycling",
    desc: "Kertas bekas dikumpulkan dan dikirim ke fasilitas daur ulang terverifikasi lokal.",
    score: 81,
    co2: "12 kg",
    status: "Verified",
    img: "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=400&h=300&fit=crop&q=80",
  },
  {
    id: "ACT-004",
    title: "Pilah Sampah Elektronik",
    location: "Surabaya, ID",
    time: "1h ago",
    category: "E-Waste",
    desc: "Sampah elektronik dipilah sesuai kategori untuk pengelolaan aman limbah B3.",
    score: 65,
    co2: "9 kg",
    status: "Rejected",
    img: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=400&h=300&fit=crop&q=80",
  },
  {
    id: "ACT-005",
    title: "Bersih Pantai",
    location: "Bali, ID",
    time: "2h ago",
    category: "Clean-up",
    desc: "Pembersihan pantai kolaboratif untuk mengurangi sampah plastik yang mencemari lautan.",
    score: 88,
    co2: "24 kg",
    status: "Verified",
    img: "https://images.unsplash.com/photo-1618477461853-cf6ed80fbfc9?w=400&h=300&fit=crop&q=80",
  },
  {
    id: "ACT-006",
    title: "Kompos Sampah Dapur",
    location: "Yogyakarta, ID",
    time: "3h ago",
    category: "Composting",
    desc: "Pengolahan limbah organik rumah tangga menjadi kompos kaya nutrisi.",
    score: 77,
    co2: "6 kg",
    status: "Pending",
    img: "https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?w=400&h=300&fit=crop&q=80",
  },
];

// Diseragamkan menggunakan palet warna hijau (emerald)
const impactStats = [
  { label: "Waste Recovered", value: "5,432", unit: "kg", delta: 12, icon: Recycle, color: "text-emerald-600", bg: "bg-emerald-50/80" },
  { label: "Trees Planted", value: "1,247", unit: "", delta: 9, icon: TreeDeciduous, color: "text-emerald-600", bg: "bg-emerald-50/80" },
  { label: "CO₂e Reduced", value: "8,912", unit: "kg", delta: 14, icon: Droplets, color: "text-emerald-600", bg: "bg-emerald-50/80" },
  { label: "Active Citizens", value: "2,341", unit: "", delta: 6, icon: Users, color: "text-emerald-600", bg: "bg-emerald-50/80" },
];

const categoryBreakdown = [
  { name: "Recycling", count: 3241, pct: 38, color: "bg-emerald-600", icon: Recycle },
  { name: "Reforestation", count: 1847, pct: 22, color: "bg-emerald-500", icon: TreeDeciduous },
  { name: "Clean-up", count: 1523, pct: 18, color: "bg-emerald-400", icon: Trash2 },
  { name: "E-Waste", count: 932, pct: 11, color: "bg-emerald-300", icon: Cpu },
  { name: "Composting", count: 889, pct: 11, color: "bg-emerald-200", icon: Leaf },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function ScoreIndicator({ score }: { score: number }) {
  const color = score >= 80 ? "text-emerald-600" : score >= 65 ? "text-amber-500" : "text-red-500";
  const track = score >= 80 ? "bg-emerald-500" : score >= 65 ? "bg-amber-400" : "bg-red-400";
  return (
    <div className="flex flex-col items-center md:items-end gap-1 w-full md:w-16">
      <div className="flex items-baseline gap-0.5">
        <span className={cn("text-2xl font-bold tabular-nums leading-none tracking-tight", color)}>{score}</span>
        <span className="text-xs font-semibold text-muted-foreground">/100</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden mt-1 hidden md:block">
        <div className={cn("h-full rounded-full", track)} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function AdminDashboardPage() {
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  function handleRefresh() {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1200);
  }

  return (
    <TooltipProvider delayDuration={150}>
      <div className="flex-1 space-y-8 p-6 md:p-8 pt-8 max-w-[1600px] mx-auto w-full bg-slate-50/30 min-h-screen">

        {/* ── TOPBAR ── */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Environmental Actions</h1>
            <p className="text-sm font-medium text-muted-foreground">
              Real-time verified proof — review before releasing funds.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="gap-3 h-12 pl-2 pr-4 rounded-full shadow-sm border-slate-200 bg-white hover:bg-slate-50 transition-all duration-200"
                >
                  <Avatar className="size-8 shadow-sm">
                    <AvatarFallback className="bg-emerald-600 text-white text-xs font-bold">HL</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start leading-none text-left">
                    <span className="text-sm font-semibold text-slate-900">PT. Hijau Lestari</span>
                    <span className="text-[10px] font-medium text-slate-500 mt-1">CSR Admin</span>
                  </div>
                  <ChevronDown className="size-4 text-muted-foreground ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-semibold leading-none">PT. Hijau Lestari</p>
                    <p className="text-xs text-muted-foreground leading-none">csr@hijaulestari.id</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="cursor-pointer">Profile <DropdownMenuShortcut>⇧P</DropdownMenuShortcut></DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">Settings <DropdownMenuShortcut>⌘,</DropdownMenuShortcut></DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer">
                  Log out <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* ── KPI STRIP (3 CARDS DENGAN WARNA HALUS & IKON TRANSPARAN) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card className="relative overflow-hidden rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-emerald-100/50 bg-gradient-to-br from-emerald-50/50 to-white group">
            <Activity className="absolute -bottom-4 -right-4 size-32 text-emerald-600 opacity-[0.03] group-hover:scale-110 transition-transform duration-500" />
            <CardContent className="p-6 relative z-10">
              <div className="flex items-start justify-between mb-4">
                <p className="text-sm font-bold text-emerald-900/70">Total Actions</p>
                <div className="size-10 rounded-xl bg-white/60 flex items-center justify-center border border-emerald-100/50 backdrop-blur-sm shadow-sm">
                  <Activity className="size-5 text-emerald-600" />
                </div>
              </div>
              <p className="text-4xl font-bold tabular-nums tracking-tight text-slate-900">8,432</p>
              <div className="flex items-center gap-2 mt-4">
                <Badge variant="secondary" className="gap-1 px-2 py-0.5 text-xs bg-emerald-100/80 text-emerald-800 hover:bg-emerald-100/80 border border-emerald-200/50 font-semibold shadow-none">
                  <TrendingUp className="size-3" /> 15%
                </Badge>
                <span className="text-xs font-medium text-emerald-800/60">vs yesterday</span>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-emerald-100/50 bg-gradient-to-br from-emerald-50/50 to-white group">
            <TreeDeciduous className="absolute -bottom-4 -right-4 size-32 text-emerald-600 opacity-[0.03] group-hover:scale-110 transition-transform duration-500" />
            <CardContent className="p-6 relative z-10">
              <div className="flex items-start justify-between mb-4">
                <p className="text-sm font-bold text-emerald-900/70">Total Impact</p>
                <div className="size-10 rounded-xl bg-white/60 flex items-center justify-center border border-emerald-100/50 backdrop-blur-sm shadow-sm">
                  <TreeDeciduous className="size-5 text-emerald-600" />
                </div>
              </div>
              <p className="text-4xl font-bold tabular-nums tracking-tight text-slate-900">
                12,847 <span className="text-lg font-medium text-slate-500 ml-1">kg CO₂e</span>
              </p>
              <div className="flex items-center gap-2 mt-4">
                <Badge variant="secondary" className="gap-1 px-2 py-0.5 text-xs bg-emerald-100/80 text-emerald-800 hover:bg-emerald-100/80 border border-emerald-200/50 font-semibold shadow-none">
                  <TrendingUp className="size-3" /> 18%
                </Badge>
                <span className="text-xs font-medium text-emerald-800/60">vs yesterday</span>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-emerald-100/50 bg-gradient-to-br from-emerald-50/50 to-white group">
            <ShieldCheck className="absolute -bottom-4 -right-4 size-32 text-emerald-600 opacity-[0.03] group-hover:scale-110 transition-transform duration-500" />
            <CardContent className="p-6 relative z-10">
              <div className="flex items-start justify-between mb-4">
                <p className="text-sm font-bold text-emerald-900/70">Verification Rate</p>
                <div className="size-10 rounded-xl bg-white/60 flex items-center justify-center border border-emerald-100/50 backdrop-blur-sm shadow-sm">
                  <ShieldCheck className="size-5 text-emerald-600" />
                </div>
              </div>
              <p className="text-4xl font-bold tabular-nums tracking-tight text-slate-900 mb-4">78%</p>
              <div className="space-y-3">
                <Progress value={78} className="h-2 bg-emerald-100/60 [&>div]:bg-emerald-500" />
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="gap-1 px-2 py-0.5 text-xs bg-amber-50 text-amber-700 hover:bg-amber-50 border border-amber-200/50 font-semibold shadow-none">
                    <TrendingDown className="size-3" /> 3%
                  </Badge>
                  <span className="text-xs font-medium text-emerald-800/60">vs yesterday</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── MAIN GRID ── */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-8">

          {/* ── LEFT: RICH LIST ── */}
          <div className="flex flex-col">
            <Card className="rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border-slate-200/60 bg-white">
              
              {/* Header & Controls */}
              <div className="px-6 pt-6 pb-5 border-b border-slate-100 space-y-5">
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5">
                  <div>
                    <CardTitle className="text-xl font-bold tracking-tight">Recent Submissions</CardTitle>
                    <CardDescription className="text-sm font-medium mt-1">
                      Reviewing {actions.length} actions in current view.
                    </CardDescription>
                  </div>
                  
                  {/* Filter & Date Range */}
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <input 
                          type="date" 
                          defaultValue="2026-05-01"
                          className="h-9 w-full sm:w-[130px] rounded-xl border border-slate-200/60 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors [&::-webkit-calendar-picker-indicator]:opacity-50 hover:[&::-webkit-calendar-picker-indicator]:opacity-100"
                        />
                      </div>
                      <span className="text-slate-400 text-xs font-medium">-</span>
                      <div className="relative">
                        <input 
                          type="date" 
                          defaultValue="2026-05-20"
                          className="h-9 w-full sm:w-[130px] rounded-xl border border-slate-200/60 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors [&::-webkit-calendar-picker-indicator]:opacity-50 hover:[&::-webkit-calendar-picker-indicator]:opacity-100"
                        />
                      </div>
                    </div>
                    
                    <Select defaultValue="all">
                      <SelectTrigger className="h-9 text-xs font-medium w-[120px] rounded-xl shadow-sm border-slate-200/60 bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                        <SelectItem value="all" className="cursor-pointer text-xs">All Categories</SelectItem>
                        <SelectItem value="recycling" className="cursor-pointer text-xs">Recycling</SelectItem>
                        <SelectItem value="reforestation" className="cursor-pointer text-xs">Reforestation</SelectItem>
                        <SelectItem value="clean-up" className="cursor-pointer text-xs">Clean-up</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Rich List Display */}
              <div className="divide-y divide-slate-100">
                {actions.length === 0 ? (
                  <div className="py-16 text-center text-muted-foreground flex flex-col items-center">
                    <Leaf className="size-12 text-slate-200 mb-4" />
                    <p className="text-base font-medium text-slate-500">No actions found in this category.</p>
                  </div>
                ) : (
                  actions.map((a) => (
                    <div key={a.id} className="p-6 flex flex-col md:flex-row gap-6 hover:bg-slate-50/50 transition-colors group">
                      
                      {/* Visual Thumbnail */}
                      <div className="w-full md:w-[180px] aspect-video md:aspect-auto md:h-[120px] shrink-0 overflow-hidden rounded-xl border border-slate-200/60 bg-muted shadow-sm">
                        <img src={a.img} alt={a.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>

                      {/* Main Details */}
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 hover:bg-slate-100 shadow-none">
                            {a.category}
                          </Badge>
                        </div>
                        <h4 className="text-lg font-bold tracking-tight text-slate-900 mb-1.5 group-hover:text-emerald-600 transition-colors">
                          {a.title}
                        </h4>
                        <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed mb-4">
                          {a.desc}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500">
                          <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                            <MapPin className="size-3.5 text-slate-400" /> {a.location}
                          </span>
                          <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                            <Clock className="size-3.5 text-slate-400" /> {a.time}
                          </span>
                          <span className="flex items-center gap-1.5 text-emerald-600 font-semibold bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
                            <Droplets className="size-3.5" /> {a.co2} CO₂e
                          </span>
                        </div>
                      </div>

                      {/* Score & Controls */}
                      <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center w-full md:w-auto gap-4 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100 shrink-0 md:pl-6">
                        <ScoreIndicator score={a.score} />
                        <div className="flex items-center gap-3 mt-2">
                          <Button variant="outline" className="h-8 px-4 text-xs font-bold shadow-sm rounded-full border-slate-200/80 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-200 transition-colors group/btn">
                            View Proof <ArrowRight className="size-3.5 ml-1.5 transition-transform group-hover/btn:translate-x-0.5" />
                          </Button>
                        </div>
                      </div>

                    </div>
                  ))
                )}
              </div>

              <CardFooter className="px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50">
                <span className="text-xs font-medium text-slate-500">
                  Showing {actions.length} of 8,432 total records
                </span>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8 text-xs font-semibold rounded-lg bg-white shadow-sm border-slate-200/60">Previous</Button>
                  <Button variant="outline" size="sm" className="h-8 text-xs font-semibold rounded-lg bg-white shadow-sm border-slate-200/60">Next</Button>
                </div>
              </CardFooter>
            </Card>

          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="flex flex-col gap-6 xl:col-span-1 sticky top-8 h-fit pb-8">

            {/* Impact Summary - Clean Minimalist Style */}
            <Card className="rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-slate-200/60 bg-white overflow-hidden">
              <CardHeader className="px-6 py-5 border-b border-slate-100 flex items-center justify-between space-y-0">
                <div>
                  <CardTitle className="text-lg font-bold text-slate-900">Today's Impact</CardTitle>
                  <CardDescription className="text-xs font-medium mt-1">Across all verified actions</CardDescription>
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-slate-50 border border-slate-100 text-slate-500 hover:text-emerald-700 hover:border-emerald-200 hover:bg-emerald-50 transition-colors">
                      <ArrowUpRight className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>View full report</TooltipContent>
                </Tooltip>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100/80">
                  {impactStats.map((stat) => (
                    <div key={stat.label} className="p-5 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={cn("size-10 rounded-full flex items-center justify-center shrink-0", stat.bg)}>
                          <stat.icon className={cn("size-4.5", stat.color)} />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-slate-500 leading-none">{stat.label}</p>
                          <p className="text-lg font-bold tracking-tight text-slate-900 leading-none">
                            {stat.value} <span className="text-xs font-medium text-slate-400">{stat.unit}</span>
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="gap-1 px-1.5 py-0 h-5 text-[11px] bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border border-emerald-100 font-bold shadow-none">
                        <TrendingUp className="size-3" /> +{stat.delta}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Category Breakdown - Clean Minimalist Style */}
            <Card className="rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-slate-200/60 bg-white overflow-hidden">
              <CardHeader className="px-6 py-5 border-b border-slate-100 flex-row items-center justify-between space-y-0">
                <CardTitle className="text-lg font-bold text-slate-900">By Category</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-5">
                {categoryBreakdown.map((cat) => (
                  <div key={cat.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-slate-700 flex items-center gap-2">
                        <cat.icon className="size-3.5 text-emerald-600" />
                        {cat.name}
                      </span>
                      <div className="flex items-center gap-2.5">
                        <span className="text-slate-400 font-medium text-xs">{cat.count.toLocaleString()}</span>
                        <span className="font-bold tabular-nums text-slate-900 w-8 text-right">
                          {cat.pct}%
                        </span>
                      </div>
                    </div>
                    <Progress value={cat.pct} className={cn("h-1.5 bg-slate-100 [&>div]:", cat.color)} />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Verified Banner */}
            <Card className="rounded-2xl border-emerald-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-emerald-50/50 overflow-hidden group cursor-pointer hover:border-emerald-300 hover:bg-emerald-50 transition-colors">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="size-12 rounded-full border border-emerald-200 bg-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                    <ShieldCheck className="size-6 text-emerald-600" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-emerald-800 uppercase tracking-widest mt-0.5">
                      Blockchain Verified
                    </p>
                    <p className="text-sm font-medium text-emerald-950/70 leading-relaxed">
                      Every action undergoes strict AI verification and is immutably recorded on-chain.
                    </p>
                    <Button variant="link" className="h-auto p-0 text-xs font-bold text-emerald-700 gap-1 mt-1 hover:text-emerald-800">
                      Learn how it works <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}