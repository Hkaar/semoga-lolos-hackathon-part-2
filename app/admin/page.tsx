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
  Zap,
  MoreHorizontal,
  ChevronRight,
  Activity,
  Award,
  Eye,
  Leaf,
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
import { Separator } from "@/components/ui/separator";
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";



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
    contributor: "Andi S.",
    avatarFallback: "AS",
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
    contributor: "Rina K.",
    avatarFallback: "RK",
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
    contributor: "Budi W.",
    avatarFallback: "BW",
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
    contributor: "Dewi P.",
    avatarFallback: "DP",
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
    contributor: "Made A.",
    avatarFallback: "MA",
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
    contributor: "Sari N.",
    avatarFallback: "SN",
    img: "https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?w=400&h=300&fit=crop&q=80",
  },
];

const impactStats = [
  { label: "Waste Recovered", value: "5,432", unit: "kg", delta: 12, icon: Recycle, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-100/50 dark:bg-emerald-500/10" },
  { label: "Trees Planted", value: "1,247", unit: "", delta: 9, icon: TreeDeciduous, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-100/50 dark:bg-emerald-500/10" },
  { label: "CO₂e Reduced", value: "8,912", unit: "kg", delta: 14, icon: Droplets, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-100/50 dark:bg-blue-500/10" },
  { label: "Active Citizens", value: "2,341", unit: "", delta: 6, icon: Users, color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-100/50 dark:bg-violet-500/10" },
];

const categoryBreakdown = [
  { name: "Recycling", count: 3241, pct: 38, color: "bg-emerald-500" },
  { name: "Reforestation", count: 1847, pct: 22, color: "bg-green-500" },
  { name: "Clean-up", count: 1523, pct: 18, color: "bg-blue-500" },
  { name: "E-Waste", count: 932, pct: 11, color: "bg-amber-500" },
  { name: "Composting", count: 889, pct: 11, color: "bg-violet-500" },
];


const statusConfig = {
  Verified: {
    icon: CheckCircle2,
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
  },
  Pending: {
    icon: Clock,
    badge: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",
  },
  Rejected: {
    icon: XCircle,
    badge: "bg-red-50 text-red-600 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20",
  },
};

function StatusBadge({ status }: { status: keyof typeof statusConfig }) {
  const cfg = statusConfig[status];
  const Icon = cfg.icon;
  return (
    <Badge variant="outline" className={cn("gap-1.5 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider rounded-full shadow-sm", cfg.badge)}>
      <Icon className="size-3.5" />
      {status}
    </Badge>
  );
}

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


export default function AdminDashboardPage() {
  const [tab, setTab] = React.useState("all");
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const filtered = tab === "all"
    ? actions
    : actions.filter(a => a.status.toLowerCase() === tab);

  function handleRefresh() {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1200);
  }

  return (
    <TooltipProvider delayDuration={150}>
      <div className="flex-1 space-y-8 p-6 md:p-8 pt-6 max-w-[1600px] mx-auto w-full bg-muted/10 min-h-screen">

        {/* ── TOPBAR ── */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-bold text-muted-foreground tracking-widest uppercase">
                Live Environment
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Environmental Actions</h1>
            <p className="text-sm font-medium text-muted-foreground">
              Real-time verified proof — review before releasing funds.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="size-10 shadow-sm rounded-xl" onClick={handleRefresh}>
                  <RefreshCw className={cn("size-4 text-muted-foreground", isRefreshing && "animate-spin")} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Refresh data</TooltipContent>
            </Tooltip>

            <Button variant="outline" className="gap-2 h-10 text-sm font-medium shadow-sm rounded-xl hidden sm:flex bg-background">
              <Calendar className="size-4 text-muted-foreground" />
              May 20, 2026
            </Button>

            <Button variant="outline" className="gap-2 h-10 text-sm shadow-sm rounded-xl bg-background">
              <Download className="size-4 text-muted-foreground" />
              Export
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 h-10 pl-1.5 pr-3 shadow-sm rounded-xl bg-background hover:bg-muted/50">
                  <Avatar className="size-7">
                    <AvatarFallback className="bg-emerald-600 text-white text-[10px] font-bold">HL</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start leading-none text-left">
                    <span className="text-sm font-semibold">PT. Hijau Lestari</span>
                    <span className="text-[10px] font-medium text-muted-foreground mt-0.5">CSR Admin</span>
                  </div>
                  <ChevronDown className="size-4 text-muted-foreground ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-semibold leading-none">PT. Hijau Lestari</p>
                    <p className="text-xs text-muted-foreground leading-none">csr@hijaulestari.id</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>Profile <DropdownMenuShortcut>⇧P</DropdownMenuShortcut></DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Settings <DropdownMenuShortcut>⌘,</DropdownMenuShortcut></DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                  Log out <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* ── KPI STRIP ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <Card className="rounded-2xl shadow-sm border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <p className="text-sm font-semibold text-muted-foreground">Total Actions</p>
                <div className="size-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center border border-emerald-100/50">
                  <Activity className="size-5 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
              <p className="text-3xl font-bold tabular-nums tracking-tight">8,432</p>
              <div className="flex items-center gap-2 mt-3">
                <Badge variant="secondary" className="gap-1 px-2 py-0.5 text-xs bg-emerald-50 text-emerald-700 border border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20 font-semibold shadow-none">
                  <TrendingUp className="size-3" /> 15%
                </Badge>
                <span className="text-xs font-medium text-muted-foreground">vs yesterday</span>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <p className="text-sm font-semibold text-muted-foreground">Total Impact</p>
                <div className="size-10 rounded-xl bg-sky-50 dark:bg-sky-500/10 flex items-center justify-center border border-sky-100/50">
                  <Zap className="size-5 text-sky-600 dark:text-sky-400" />
                </div>
              </div>
              <p className="text-3xl font-bold tabular-nums tracking-tight">
                12,847 <span className="text-sm font-medium text-muted-foreground ml-1">kg CO₂e</span>
              </p>
              <div className="flex items-center gap-2 mt-3">
                <Badge variant="secondary" className="gap-1 px-2 py-0.5 text-xs bg-emerald-50 text-emerald-700 border border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20 font-semibold shadow-none">
                  <TrendingUp className="size-3" /> 18%
                </Badge>
                <span className="text-xs font-medium text-muted-foreground">vs yesterday</span>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <p className="text-sm font-semibold text-muted-foreground">Verification Rate</p>
                <div className="size-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center border border-emerald-100/50">
                  <ShieldCheck className="size-5 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
              <p className="text-3xl font-bold tabular-nums tracking-tight mb-3">78%</p>
              <div className="space-y-2.5">
                <Progress value={78} className="h-2 bg-muted [&>div]:bg-emerald-500" />
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="gap-1 px-2 py-0.5 text-xs bg-amber-50 text-amber-700 border border-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20 font-semibold shadow-none">
                    <TrendingDown className="size-3" /> 3%
                  </Badge>
                  <span className="text-xs font-medium text-muted-foreground">vs yesterday</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <p className="text-sm font-semibold text-muted-foreground">Avg. Impact Score</p>
                <div className="size-10 rounded-xl bg-violet-50 dark:bg-violet-500/10 flex items-center justify-center border border-violet-100/50">
                  <Award className="size-5 text-violet-600 dark:text-violet-400" />
                </div>
              </div>
              <p className="text-3xl font-bold tabular-nums tracking-tight mb-3">82.4</p>
              <div className="space-y-2.5">
                <Progress value={82.4} className="h-2 bg-muted [&>div]:bg-violet-500" />
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="gap-1 px-2 py-0.5 text-xs bg-emerald-50 text-emerald-700 border border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20 font-semibold shadow-none">
                    <TrendingUp className="size-3" /> 5%
                  </Badge>
                  <span className="text-xs font-medium text-muted-foreground">vs yesterday</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── MAIN GRID ── */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-8">

          {/* ── LEFT: RICH LIST + TABS ── */}
          <div className="flex flex-col">
            <Tabs value={tab} onValueChange={setTab} className="w-full">
              
              <Card className="rounded-2xl shadow-sm overflow-hidden border-border bg-card">
                {/* Header & Controls */}
                <div className="px-6 pt-6 pb-4 border-b border-border space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl font-bold tracking-tight">Recent Submissions</CardTitle>
                      <CardDescription className="text-sm font-medium mt-1">
                        Reviewing {filtered.length} actions in current view.
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-3">
                      <Select defaultValue="today">
                        <SelectTrigger className="h-9 text-sm font-medium w-[130px] rounded-xl shadow-sm bg-background">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="today">Today</SelectItem>
                          <SelectItem value="week">This week</SelectItem>
                          <SelectItem value="month">This month</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="sm" className="h-9 gap-2 text-sm font-medium rounded-xl shadow-sm bg-background">
                        <Filter className="size-4" /> Filter
                      </Button>
                    </div>
                  </div>

                  {/* Tabs */}
                  <TabsList className="h-10 bg-muted/50 p-1 w-full sm:w-auto overflow-x-auto justify-start">
                    {[
                      { value: "all", label: "All Actions", count: actions.length },
                      { value: "verified", label: "Verified", count: actions.filter(a => a.status === "Verified").length },
                      { value: "pending", label: "Pending", count: actions.filter(a => a.status === "Pending").length },
                      { value: "rejected", label: "Rejected", count: actions.filter(a => a.status === "Rejected").length },
                    ].map(t => (
                      <TabsTrigger
                        key={t.value}
                        value={t.value}
                        className="h-8 px-4 text-sm font-medium rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-foreground gap-2 transition-all"
                      >
                        {t.label}
                        <Badge variant="secondary" className="h-5 px-1.5 text-[10px] font-bold tabular-nums bg-muted/50 data-[state=active]:bg-muted shadow-none">
                          {t.count}
                        </Badge>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                {/* Rich List Display */}
                {["all", "verified", "pending", "rejected"].map(tabValue => (
                  <TabsContent key={tabValue} value={tabValue} className="m-0 focus-visible:outline-none">
                    <div className="divide-y divide-border">
                      {filtered.length === 0 ? (
                        <div className="py-12 text-center text-muted-foreground flex flex-col items-center">
                          <Leaf className="size-10 text-muted-foreground/30 mb-3" />
                          <p className="text-sm font-medium">No actions found in this category.</p>
                        </div>
                      ) : (
                        filtered.map((a) => (
                          <div key={a.id} className="p-6 flex flex-col md:flex-row gap-6 hover:bg-muted/30 transition-colors group">
                            
                            {/* Visual Thumbnail */}
                            <div className="w-full md:w-[160px] aspect-video md:aspect-auto md:h-[110px] shrink-0 overflow-hidden rounded-xl border border-border bg-muted shadow-sm">
                              <img src={a.img} alt={a.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            </div>

                            {/* Main Details */}
                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="secondary" className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-secondary text-secondary-foreground shadow-none">
                                  {a.category}
                                </Badge>
                                <span className="text-xs font-mono font-medium text-muted-foreground">{a.id}</span>
                              </div>
                              <h4 className="text-lg font-bold tracking-tight text-foreground mb-1.5 group-hover:text-emerald-600 transition-colors">
                                {a.title}
                              </h4>
                              <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-3">
                                {a.desc}
                              </p>
                              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-muted-foreground">
                                <span className="flex items-center gap-1.5">
                                  <Avatar className="size-5 border shadow-sm">
                                    <AvatarFallback className="text-[8px] bg-muted">{a.avatarFallback}</AvatarFallback>
                                  </Avatar>
                                  {a.contributor}
                                </span>
                                <span className="flex items-center gap-1.5">
                                  <MapPin className="size-3.5" /> {a.location}
                                </span>
                                <span className="flex items-center gap-1.5">
                                  <Clock className="size-3.5" /> {a.time}
                                </span>
                                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                                  <Droplets className="size-3.5" /> {a.co2} CO₂e
                                </span>
                              </div>
                            </div>

                            {/* Score & Controls */}
                            <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center w-full md:w-auto gap-4 pt-4 md:pt-0 border-t md:border-t-0 border-border shrink-0 md:pl-6">
                              <ScoreIndicator score={a.score} />
                              <div className="flex items-center gap-3 mt-1">
                                <StatusBadge status={a.status as keyof typeof statusConfig} />
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="icon" className="size-8 rounded-lg shadow-sm">
                                      <MoreHorizontal className="size-4 text-muted-foreground" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end" className="w-48">
                                    <DropdownMenuItem className="gap-2.5 cursor-pointer font-medium">
                                      <Eye className="size-4" /> View full proof
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="gap-2.5 cursor-pointer font-medium text-emerald-600 focus:text-emerald-700">
                                      <CheckCircle2 className="size-4" /> Approve Action
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="gap-2.5 cursor-pointer font-medium text-destructive focus:text-destructive">
                                      <XCircle className="size-4" /> Reject Action
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>

                          </div>
                        ))
                      )}
                    </div>

                    <CardFooter className="px-6 py-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 bg-muted/20">
                      <span className="text-xs font-medium text-muted-foreground">
                        Showing {filtered.length} of 8,432 total records
                      </span>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-8 text-xs font-semibold rounded-lg bg-background shadow-sm">Previous</Button>
                        <Button variant="outline" size="sm" className="h-8 text-xs font-semibold rounded-lg bg-background shadow-sm">Next</Button>
                      </div>
                    </CardFooter>
                  </TabsContent>
                ))}
              </Card>

            </Tabs>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="flex flex-col gap-6">

            {/* Impact Summary */}
            <Card className="rounded-2xl shadow-sm border-border bg-card">
              <CardHeader className="px-6 py-5 border-b border-border flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="text-lg font-bold">Todays Impact</CardTitle>
                  <CardDescription className="text-xs font-medium mt-1">Across all verified actions</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 -mr-2">
                  Report <ArrowUpRight className="size-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {impactStats.map((stat) => (
                    <div key={stat.label} className="p-5 flex items-center justify-between hover:bg-muted/20 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={cn("size-10 rounded-xl flex items-center justify-center shrink-0", stat.bg)}>
                          <stat.icon className={cn("size-4.5", stat.color)} />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-semibold text-muted-foreground leading-none">{stat.label}</p>
                          <p className="text-xl font-bold tracking-tight text-foreground leading-none">
                            {stat.value} <span className="text-xs font-medium text-muted-foreground">{stat.unit}</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1.5">
                        <Badge variant="secondary" className="gap-1 px-1.5 py-0 h-5 text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-100 font-bold shadow-none">
                          <TrendingUp className="size-3" /> +{stat.delta}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Category Breakdown */}
            <Card className="rounded-2xl shadow-sm border-border bg-card">
              <CardHeader className="px-6 py-5 border-b border-border flex-row items-center justify-between space-y-0">
                <CardTitle className="text-lg font-bold">By Category</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-5">
                {categoryBreakdown.map((cat) => (
                  <div key={cat.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-muted-foreground">{cat.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-muted-foreground font-medium">{cat.count.toLocaleString()}</span>
                        <span className="font-bold tabular-nums w-8 text-right">{cat.pct}%</span>
                      </div>
                    </div>
                    <Progress value={cat.pct} className={cn("h-2 bg-muted [&>div]:", cat.color)} />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Verified Banner */}
            <Card className="rounded-2xl border-emerald-200/50 dark:border-emerald-900/40 shadow-sm bg-gradient-to-br from-emerald-50/50 to-transparent dark:from-emerald-950/20 overflow-hidden group cursor-pointer hover:border-emerald-300 transition-colors">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="size-10 rounded-full border border-emerald-200 dark:border-emerald-800 bg-white dark:bg-background flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                    <ShieldCheck className="size-5 text-emerald-600" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="relative flex size-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                      </span>
                      <p className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-widest">
                        Blockchain Verified
                      </p>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                      Every action undergoes strict AI verification and is immutably recorded on-chain.
                    </p>
                    <Button variant="link" className="h-auto p-0 text-xs font-bold text-emerald-600 dark:text-emerald-500 gap-1 mt-1">
                      Learn how it works <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-1" />
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