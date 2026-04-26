"use client";

import { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  ShieldCheck,
  Target,
  Building2,
  CreditCard,
  Rocket,
  Wallet,
  Calendar,
  MapPin,
  CheckSquare,
  Square,
  Info,
  Database,
  User,
  LogOut,
  X,
  Loader2,
  CheckCircle2,
  Copy,
  Landmark,
  Clock,
} from "lucide-react";

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

const BANK_OPTIONS = [
  {
    id: "bca",
    name: "BCA",
    acc: "8291 0029 11",
    owner: "PT Klimabot Teknologi Hijau",
  },
  {
    id: "mandiri",
    name: "Mandiri",
    acc: "137 000 291 8821",
    owner: "PT Klimabot Teknologi Hijau",
  },
  {
    id: "bri",
    name: "BRI",
    acc: "0219 0100 2911 301",
    owner: "PT Klimabot Teknologi Hijau",
  },
];

// ─── Shared Navbar ─────────────────────────────────

function Navbar() {
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
      <div className="flex items-center">
        <a href="/dashboard">
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
        </a>
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen((v) => !v)}
          className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/2d/Indofood_logo-id.svg"
            alt="Profile"
            className="w-8 h-8 rounded-full border border-gray-200 object-contain bg-white p-1"
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
                window.location.href = "/profile";
                setDropdownOpen(false);
              }}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-green-700 bg-green-50 font-medium transition-colors"
            >
              <User size={15} className="text-green-600" />
              Profil Perusahaan
            </button>
            <div className="border-t border-gray-100 my-1" />
            <button
              onClick={() => {
                localStorage.removeItem("auth_token");
                window.location.href = "/";
                setDropdownOpen(false);
              }}
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

  const [saldoCSR, setSaldoCSR] = useState<number>(50000000);
  const [billingDate, setBillingDate] = useState<Date>(new Date(2026, 4, 25));

  // States Modal Top Up
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false);
  const [topUpStep, setTopUpStep] = useState<1 | 2>(1); // 1: Input Nominal, 2: Detail Transfer
  const [topUpAmount, setTopUpAmount] = useState<number | "">("");
  const [selectedBank, setSelectedBank] = useState<
    (typeof BANK_OPTIONS)[0] | null
  >(null);

  // States Modal Langganan
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
  const [subStep, setSubStep] = useState<1 | 2>(1);
  const [subSelectedBank, setSubSelectedBank] = useState<
    (typeof BANK_OPTIONS)[0] | null
  >(null);

  const [isProcessing, setIsProcessing] = useState(false);
  const [toastMessage, setToastMessage] = useState<{
    show: boolean;
    msg: string;
    isPending?: boolean;
  }>({ show: false, msg: "" });

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const toggleFocus = (id: string) => {
    setSelectedFocus((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  };

  const showToast = (msg: string, isPending: boolean = false) => {
    setToastMessage({ show: true, msg, isPending });
    setTimeout(
      () => setToastMessage({ show: false, msg: "", isPending: false }),
      4000,
    );
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Nomor rekening berhasil disalin!");
  };

  // --- ALUR TOP UP MANUAL ---
  const handleNextTopUp = () => {
    if (!topUpAmount || topUpAmount < 1000000 || !selectedBank) return;
    setTopUpStep(2); // Pindah ke halaman instruksi transfer
  };

  const handleConfirmTopUp = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsProcessing(false);
    setIsTopUpModalOpen(false);
    setTopUpStep(1);
    setTopUpAmount("");
    setSelectedBank(null);
    showToast(
      `Instruksi Top Up ${formatRupiah(Number(topUpAmount))} dikirim. Menunggu verifikasi admin.`,
      true,
    );
  };

  // --- ALUR LANGGANAN MANUAL ---
  const handleNextSubscribe = () => {
    if (!subSelectedBank) return;
    setSubStep(2);
  };

  const handleConfirmSubscribe = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsProcessing(false);
    setIsSubscribeModalOpen(false);
    setSubStep(1);
    setSubSelectedBank(null);
    showToast(
      `Konfirmasi perpanjangan diterima. Menunggu verifikasi admin.`,
      true,
    );
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-4 md:p-8 font-sans pb-24">
      <div className="max-w-7xl mx-auto">
        <Navbar />

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
            <div className="w-16 h-16 rounded-xl border border-gray-100 bg-white flex items-center justify-center flex-shrink-0 p-2">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/2d/Indofood_logo-id.svg"
                alt="Logo Indofood"
                className="w-full h-full object-contain"
              />
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
                            ? "border-green-600 bg-green-50/50"
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
                                ? "text-green-700 font-medium bg-green-50/50"
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
                <Info size={12} /> Target ini akan digunakan untuk menghitung
                progress dampak di dashboard.
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Paket Saat Ini */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 text-green-600 flex items-center justify-center mb-3 shadow-sm">
                <Rocket size={20} />
              </div>
              <p className="text-xs text-gray-500 mb-0.5">Paket Saat Ini</p>
              <p className="text-sm font-bold text-gray-900">
                Enterprise Plan (SaaS)
              </p>
              <p className="text-xs text-gray-400 mt-0.5 leading-tight">
                Akses penuh ke semua fitur premium
              </p>
            </div>

            {/* Harga Langganan */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 text-green-600 flex items-center justify-center mb-3 shadow-sm">
                <Wallet size={20} />
              </div>
              <p className="text-xs text-gray-500 mb-0.5">Harga Langganan</p>
              <p className="text-sm font-bold text-gray-900">
                Rp 15.000.000{" "}
                <span className="font-normal text-gray-400 text-xs">
                  / Bulan
                </span>
              </p>
              <p className="text-xs text-gray-400 mt-0.5 leading-tight">
                Termasuk semua fitur & dukungan prioritas
              </p>
            </div>

            {/* Status Tagihan */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 text-green-600 flex items-center justify-center mb-3 shadow-sm">
                  <Calendar size={20} />
                </div>
                <p className="text-xs text-gray-500 mb-0.5">Status Tagihan</p>
                <p className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />{" "}
                  Aktif
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Next billing: {formatDate(billingDate)}
                </p>
              </div>

              <button
                onClick={() => {
                  setSubStep(1);
                  setIsSubscribeModalOpen(true);
                }}
                className="mt-4 w-full py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-50 transition-colors shadow-sm"
              >
                Perpanjang Paket
              </button>
            </div>

            {/* Sisa Saldo Dana CSR */}
            <div className="bg-green-50/40 rounded-xl p-4 border border-green-100 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-white border border-green-200 text-green-600 flex items-center justify-center mb-3 shadow-sm">
                  <Database size={20} />
                </div>
                <p className="text-xs text-gray-600 mb-0.5">
                  Sisa Saldo Dana CSR
                </p>
                <p className="text-lg font-bold text-gray-900">
                  {formatRupiah(saldoCSR)}
                </p>
                <p className="text-xs text-green-700/60 mt-0.5">
                  Alokasi insentif untuk warga
                </p>
              </div>

              <button
                onClick={() => {
                  setTopUpStep(1);
                  setIsTopUpModalOpen(true);
                }}
                className="mt-4 w-full py-2 bg-white border border-green-600 text-green-700 rounded-lg text-xs font-bold hover:bg-green-50 transition-colors shadow-sm flex items-center justify-center gap-1.5"
              >
                <Wallet size={14} /> Top Up Saldo
              </button>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* --- MODAL TOP UP SALDO CSR --- */}
      {isTopUpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <Database className="w-5 h-5 text-green-600" /> Top Up Dana CSR
              </h3>
              <button
                onClick={() => setIsTopUpModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              {topUpStep === 1 ? (
                <>
                  <p className="text-sm text-gray-500 mb-4">
                    Pilih nominal instan atau masukkan jumlah kustom (Minimum Rp
                    1.000.000).
                  </p>

                  {/* Quick Select Buttons */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[10000000, 50000000, 100000000].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setTopUpAmount(amt)}
                        className={`py-2 border rounded-xl text-xs font-semibold transition-all ${
                          topUpAmount === amt
                            ? "border-green-600 bg-green-50 text-green-700"
                            : "border-gray-200 bg-white text-gray-600 hover:border-green-300"
                        }`}
                      >
                        {amt / 1000000} Juta
                      </button>
                    ))}
                  </div>

                  {/* Custom Input */}
                  <div className="relative mb-6">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                      Rp
                    </span>
                    <input
                      type="number"
                      value={topUpAmount}
                      onChange={(e) => setTopUpAmount(Number(e.target.value))}
                      placeholder="0"
                      className="w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 font-bold focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600"
                    />
                  </div>

                  <p className="text-sm font-semibold text-gray-800 mb-3">
                    Metode Transfer Bank
                  </p>
                  <div className="space-y-2 mb-6">
                    {BANK_OPTIONS.map((bank) => (
                      <div
                        key={bank.id}
                        onClick={() => setSelectedBank(bank)}
                        className={`p-3 border rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                          selectedBank?.id === bank.id
                            ? "border-green-600 bg-green-50"
                            : "border-gray-200 hover:border-green-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Landmark
                            className={`w-5 h-5 ${selectedBank?.id === bank.id ? "text-green-600" : "text-gray-400"}`}
                          />
                          <span className="text-sm font-semibold text-gray-700">
                            Bank {bank.name}
                          </span>
                        </div>
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            selectedBank?.id === bank.id
                              ? "border-green-600"
                              : "border-gray-300"
                          }`}
                        >
                          {selectedBank?.id === bank.id && (
                            <div className="w-2 h-2 rounded-full bg-green-600" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setIsTopUpModalOpen(false)}
                      className="flex-1 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50"
                    >
                      Batal
                    </button>
                    <button
                      onClick={handleNextTopUp}
                      disabled={
                        !topUpAmount || topUpAmount < 1000000 || !selectedBank
                      }
                      className="flex-1 py-2.5 bg-[#0C6B37] text-white rounded-xl text-sm font-semibold hover:bg-[#095229] disabled:opacity-50"
                    >
                      Lanjut
                    </button>
                  </div>
                </>
              ) : (
                // STEP 2: INSTRUKSI TRANSFER TOP UP
                <div className="animate-in slide-in-from-right-4 duration-300">
                  <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded-xl text-xs flex items-start gap-2 mb-4">
                    <Clock className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>
                      Selesaikan pembayaran dalam <b>24 jam</b> ke depan agar
                      dana bisa segera masuk ke saldo Anda.
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 mb-1">
                    Transfer tepat sebesar:
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mb-6">
                    {formatRupiah(Number(topUpAmount))}
                  </p>

                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6 relative">
                    <p className="text-xs text-gray-500 mb-1">Bank Tujuan</p>
                    <p className="text-sm font-bold text-gray-900 mb-3">
                      Bank {selectedBank?.name}
                    </p>

                    <p className="text-xs text-gray-500 mb-1">Nomor Rekening</p>
                    <div className="flex items-center gap-2 mb-3">
                      <p className="text-lg font-mono font-bold tracking-wider text-green-700">
                        {selectedBank?.acc}
                      </p>
                      <button
                        onClick={() => copyToClipboard(selectedBank?.acc || "")}
                        className="p-1.5 bg-green-100 text-green-700 rounded-md hover:bg-green-200"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs text-gray-500 mb-1">Atas Nama</p>
                    <p className="text-sm font-bold text-gray-900">
                      {selectedBank?.owner}
                    </p>
                  </div>

                  <button
                    onClick={handleConfirmTopUp}
                    disabled={isProcessing}
                    className="w-full py-2.5 bg-[#0C6B37] text-white rounded-xl text-sm font-semibold hover:bg-[#095229] disabled:opacity-50 flex justify-center items-center gap-2"
                  >
                    {isProcessing ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      "Saya Sudah Transfer"
                    )}
                  </button>
                  <button
                    onClick={() => setTopUpStep(1)}
                    disabled={isProcessing}
                    className="w-full mt-2 py-2.5 text-gray-500 text-sm font-medium hover:text-gray-700"
                  >
                    Kembali
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL LANGGANAN (SUBSCRIPTION) --- */}
      {isSubscribeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <Rocket className="w-5 h-5 text-green-600" /> Perpanjang Paket
              </h3>
              <button
                onClick={() => setIsSubscribeModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              {subStep === 1 ? (
                <>
                  <div className="bg-green-50/50 border border-green-100 rounded-xl p-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-gray-900">
                        Enterprise Plan (SaaS)
                      </span>
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-700 font-bold rounded-full">
                        1 Bulan
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">
                      Masa aktif langganan Anda akan diperpanjang hingga{" "}
                      <strong className="text-gray-700">
                        {formatDate(
                          new Date(
                            new Date(billingDate).setMonth(
                              billingDate.getMonth() + 1,
                            ),
                          ),
                        )}
                      </strong>
                      .
                    </p>

                    <div className="pt-3 border-t border-green-100 flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Total Tagihan
                      </span>
                      <span className="text-lg font-bold text-green-700">
                        Rp 15.000.000
                      </span>
                    </div>
                  </div>

                  <p className="text-sm font-semibold text-gray-800 mb-3">
                    Pilih Metode Pembayaran
                  </p>
                  <div className="space-y-2 mb-6">
                    {BANK_OPTIONS.map((bank) => (
                      <div
                        key={bank.id}
                        onClick={() => setSubSelectedBank(bank)}
                        className={`p-3 border rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                          subSelectedBank?.id === bank.id
                            ? "border-green-600 bg-green-50"
                            : "border-gray-200 hover:border-green-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Landmark
                            className={`w-5 h-5 ${subSelectedBank?.id === bank.id ? "text-green-600" : "text-gray-400"}`}
                          />
                          <span className="text-sm font-semibold text-gray-700">
                            Bank {bank.name}
                          </span>
                        </div>
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            subSelectedBank?.id === bank.id
                              ? "border-green-600"
                              : "border-gray-300"
                          }`}
                        >
                          {subSelectedBank?.id === bank.id && (
                            <div className="w-2 h-2 rounded-full bg-green-600" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setIsSubscribeModalOpen(false)}
                      className="flex-1 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50"
                    >
                      Batal
                    </button>
                    <button
                      onClick={handleNextSubscribe}
                      disabled={!subSelectedBank}
                      className="flex-1 py-2.5 bg-[#0C6B37] text-white rounded-xl text-sm font-semibold hover:bg-[#095229] disabled:opacity-50"
                    >
                      Lanjut
                    </button>
                  </div>
                </>
              ) : (
                // STEP 2: INSTRUKSI TRANSFER LANGGANAN
                <div className="animate-in slide-in-from-right-4 duration-300">
                  <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded-xl text-xs flex items-start gap-2 mb-4">
                    <Clock className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>
                      Selesaikan pembayaran dalam <b>24 jam</b> agar langganan
                      segera diperpanjang.
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 mb-1">
                    Transfer tepat sebesar:
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mb-6">
                    Rp 15.000.000
                  </p>

                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6 relative">
                    <p className="text-xs text-gray-500 mb-1">Bank Tujuan</p>
                    <p className="text-sm font-bold text-gray-900 mb-3">
                      Bank {subSelectedBank?.name}
                    </p>

                    <p className="text-xs text-gray-500 mb-1">Nomor Rekening</p>
                    <div className="flex items-center gap-2 mb-3">
                      <p className="text-lg font-mono font-bold tracking-wider text-green-700">
                        {subSelectedBank?.acc}
                      </p>
                      <button
                        onClick={() =>
                          copyToClipboard(subSelectedBank?.acc || "")
                        }
                        className="p-1.5 bg-green-100 text-green-700 rounded-md hover:bg-green-200"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs text-gray-500 mb-1">Atas Nama</p>
                    <p className="text-sm font-bold text-gray-900">
                      {subSelectedBank?.owner}
                    </p>
                  </div>

                  <button
                    onClick={handleConfirmSubscribe}
                    disabled={isProcessing}
                    className="w-full py-2.5 bg-[#0C6B37] text-white rounded-xl text-sm font-semibold hover:bg-[#095229] disabled:opacity-50 flex justify-center items-center gap-2"
                  >
                    {isProcessing ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      "Saya Sudah Transfer"
                    )}
                  </button>
                  <button
                    onClick={() => setSubStep(1)}
                    disabled={isProcessing}
                    className="w-full mt-2 py-2.5 text-gray-500 text-sm font-medium hover:text-gray-700"
                  >
                    Kembali
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- TOAST NOTIFICATION --- */}
      {toastMessage.show && (
        <div
          className={`fixed bottom-6 right-6 z-50 ${toastMessage.isPending ? "bg-yellow-50 border-2 border-yellow-200 text-yellow-800" : "bg-gray-900 text-white"} px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300`}
        >
          {toastMessage.isPending ? (
            <Clock className="w-5 h-5 text-yellow-600" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-green-400" />
          )}
          <p className="text-sm font-medium max-w-[280px]">
            {toastMessage.msg}
          </p>
        </div>
      )}
    </div>
  );
}
