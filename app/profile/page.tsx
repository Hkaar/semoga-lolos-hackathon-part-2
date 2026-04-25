"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  ChevronDown,
  Pencil,
  ShieldCheck,
  Target,
  Building2,
  CreditCard,
  Rocket,
  Wallet,
  Calendar,
  MapPin,
  PlusCircle,
  CheckSquare,
  Square,
  Info,
  Database,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FocusCategory {
  id: string;
  label: string;
  description: string;
}

const FOCUS_CATEGORIES: FocusCategory[] = [
  {
    id: "plastic",
    label: "Plastic Waste",
    description: "Pengelolaan sampah plastik (botol, sachet)",
  },
  {
    id: "air",
    label: "Air Pollution",
    description: "Penyerapan karbon / emisi",
  },
  {
    id: "general",
    label: "General Environment",
    description: "Aksi hijau lainnya (bersih pantai, dll)",
  },
];

const WILAYAH_OPTIONS = [
  "Nasional",
  "Jawa",
  "Sumatera",
  "Kalimantan",
  "Sulawesi",
  "Papua",
];

// ─── Shared Navbar (same style as dashboard) ─────────────────────────────────

function Navbar() {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="flex justify-between items-center py-4 mb-6 bg-white px-6 shadow-sm rounded-xl">
      {/* Logo — same as dashboard */}
      <div className="flex items-center">
        <Link href={"/dashboard"}>
          <img
            src="images/logo.png"
            alt="Klimabot Logo"
            className="h-10 object-contain"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.parentElement!.innerHTML =
                '<span class="text-xl font-bold text-green-700 tracking-tight">klimabot</span>';
            }}
          />
        </Link>
      </div>

      {/* Profile dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen((v) => !v)}
          className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors"
        >
          <img
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fseeklogo.com%2Fimages%2FI%2Findofood-logo-DB0FFAFA8D-seeklogo.com.png&f=1&nofb=1&ipt=03b17765d27438dcfa5c8bfe82dc145ee9ed7eed3426843af08c1c2dc3550892"
            alt="Profile"
            className="w-8 h-8 rounded-full border border-gray-200"
          />
          <span className="text-sm font-medium text-gray-700">
            PT. Indofood
          </span>
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
          />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl border border-gray-100 shadow-lg py-1 z-50">
            <button
              onClick={() => {
                router.push("/profile");
                setDropdownOpen(false);
              }}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-green-700 bg-green-50 font-medium transition-colors"
            >
              <User size={15} className="text-green-600" />
              Profil Perusahaan
            </button>
            <div className="border-t border-gray-100 my-1" />
            <button
              onClick={() => setDropdownOpen(false)}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut size={15} className="text-red-400" />
              Keluar
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

// ─── Section Card ─────────────────────────────────────────────────────────────

function SectionCard({
  number,
  icon,
  title,
  subtitle,
  children,
}: {
  number: number;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-start gap-3 mb-5">
        <div className="w-9 h-9 rounded-xl bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <div>
          <h2 className="text-sm font-semibold text-gray-800">
            {number}. {title}
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const [selectedFocus, setSelectedFocus] = useState<string[]>(["plastic"]);
  const [wilayah, setWilayah] = useState("Nasional");
  const [targetVolume, setTargetVolume] = useState("100.000");
  const [showWilayahDropdown, setShowWilayahDropdown] = useState(false);

  const toggleFocus = (id: string) => {
    setSelectedFocus((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <Navbar />

        {/* Page title */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-900">Profil Perusahaan</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Kelola informasi perusahaan, preferensi dampak, dan pengaturan akun
            Anda.
          </p>
        </div>

        {/* ── Section 1: Identity ── */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center flex-shrink-0">
              <span className="text-blue-700 font-bold text-base italic tracking-tight">
                Indofood
              </span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                PT Indofood Sukses Makmur Tbk.
              </h2>
              <p className="text-sm text-gray-500">Siti Aminah</p>
              <p className="text-sm text-gray-400">Head of CSR & ESG Target</p>
              <span className="inline-flex items-center gap-1 mt-2 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium border border-green-100">
                <ShieldCheck size={12} />
                Verified Corporate
              </span>
            </div>
          </div>
        </div>

        {/* ── Sections 2 & 3 ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Section 2 */}
          <SectionCard
            number={2}
            icon={<Target size={18} />}
            title="Pengaturan Filter Dampak & Alokasi"
            subtitle="Tentukan fokus dampak dan target alokasi perusahaan Anda."
          >
            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium text-gray-500 mb-2">
                  Kategori Fokus
                </p>
                <div className="space-y-2">
                  {FOCUS_CATEGORIES.map((cat) => {
                    const active = selectedFocus.includes(cat.id);
                    return (
                      <button
                        key={cat.id}
                        onClick={() => toggleFocus(cat.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                          active
                            ? "border-green-200 bg-green-50"
                            : "border-gray-100 bg-gray-50 hover:border-gray-200"
                        }`}
                      >
                        {active ? (
                          <CheckSquare
                            size={16}
                            className="text-green-600 flex-shrink-0"
                          />
                        ) : (
                          <Square
                            size={16}
                            className="text-gray-300 flex-shrink-0"
                          />
                        )}
                        <div>
                          <p
                            className={`text-sm font-medium ${active ? "text-green-800" : "text-gray-600"}`}
                          >
                            {cat.label}
                          </p>
                          <p className="text-xs text-gray-400">
                            {cat.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1.5">
                    Target Wilayah CSR
                  </p>
                  <div className="relative">
                    <button
                      onClick={() =>
                        setShowWilayahDropdown(!showWilayahDropdown)
                      }
                      className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 hover:border-gray-300 transition-colors"
                    >
                      <span className="flex items-center gap-1.5">
                        <MapPin size={13} className="text-gray-400" />
                        {wilayah}
                      </span>
                      <ChevronDown size={13} className="text-gray-400" />
                    </button>
                    {showWilayahDropdown && (
                      <div className="absolute top-full mt-1 left-0 w-full bg-white border border-gray-100 rounded-xl shadow-lg z-10 overflow-hidden">
                        {WILAYAH_OPTIONS.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => {
                              setWilayah(opt);
                              setShowWilayahDropdown(false);
                            }}
                            className={`w-full text-left px-3 py-2 text-sm hover:bg-green-50 transition-colors ${
                              wilayah === opt
                                ? "text-green-700 font-medium"
                                : "text-gray-600"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1.5">
                    Target Volume Tahunan
                  </p>
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:border-green-400 transition-colors bg-white">
                    <input
                      type="text"
                      value={targetVolume}
                      onChange={(e) => setTargetVolume(e.target.value)}
                      className="flex-1 px-3 py-2.5 text-sm text-gray-700 outline-none bg-transparent min-w-0"
                    />
                    <span className="px-2.5 py-2.5 text-xs text-gray-400 bg-gray-50 border-l border-gray-100 whitespace-nowrap">
                      Kg Plastik
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-400 flex items-center gap-1.5">
                <Info size={12} />
                Target ini akan digunakan untuk menghitung progress dampak di
                dashboard.
              </p>
            </div>
          </SectionCard>

          {/* Section 3 */}
          <SectionCard
            number={3}
            icon={<Building2 size={18} />}
            title="Detail Legalitas Perusahaan"
            subtitle="Informasi legalitas dan identitas perusahaan."
          >
            <div className="divide-y divide-gray-50">
              {[
                {
                  label: "Nama Perusahaan",
                  value: "PT Indofood Sukses Makmur Tbk.",
                },
                { label: "Nomor Induk Berusaha (NIB)", value: "8120391xxxxxx" },
                {
                  label: "Sektor Industri",
                  value: "FMCG (Fast Moving Consumer Goods)",
                },
                {
                  label: "Alamat Kantor Pusat",
                  value: "Sudirman Plaza,\nJakarta Selatan 12920",
                },
              ].map((row) => (
                <div key={row.label} className="flex gap-3 py-3">
                  <p className="text-sm text-gray-400 w-44 flex-shrink-0">
                    {row.label}
                  </p>
                  <p className="text-sm text-gray-700 font-medium whitespace-pre-line">
                    {row.value}
                  </p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* ── Section 4: Billing ── */}
        <SectionCard
          number={4}
          icon={<CreditCard size={18} />}
          title="Paket Langganan & Tagihan"
          subtitle="Informasi paket berlangganan dan pengelolaan dana CSR."
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center mb-3">
                <Rocket size={20} />
              </div>
              <p className="text-xs text-gray-400 mb-0.5">Paket Saat Ini</p>
              <p className="text-sm font-bold text-gray-800">
                Enterprise Plan (SaaS)
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                Akses penuh ke semua fitur premium
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center mb-3">
                <Wallet size={20} />
              </div>
              <p className="text-xs text-gray-400 mb-0.5">Harga Langganan</p>
              <p className="text-sm font-bold text-gray-800">
                Rp 15.000.000{" "}
                <span className="font-normal text-gray-400 text-xs">
                  / Bulan
                </span>
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                Termasuk semua fitur & dukungan prioritas
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center mb-3">
                <Calendar size={20} />
              </div>
              <p className="text-xs text-gray-400 mb-0.5">Status Tagihan</p>
              <p className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                Aktif
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                Next billing: 25 Mei 2026
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center mb-3">
                  <Database size={20} />
                </div>
                <p className="text-xs text-gray-400 mb-0.5">
                  Sisa Saldo Dana CSR
                </p>
                <p className="text-sm font-bold text-gray-800">Rp 50.000.000</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Alokasi insentif untuk warga
                </p>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
