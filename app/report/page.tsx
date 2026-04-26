"use client";

import { useEffect, useState } from "react";
import { Leaf, Shield, Trees, Droplets, Users } from "lucide-react";

interface ReportData {
  overview: {
    total_actions: number;
    verified: number;
    rejected: number;
    verification_rate: number;
  };
  today: {
    waste_kg: number;
    trees_planted: number;
    co2e_reduced_kg: number;
    active_citizens: number;
    deltas: {
      waste_kg: number | null;
      trees_planted: number | null;
      co2e_reduced_kg: number | null;
      active_citizens: number | null;
    };
  };
  reports: Array<{
    title: string;
    actionType: string;
    isAuthentic: boolean;
    impactScore: number;
    location_name: string;
    createdAt: string;
    extractedMetrics?: {
      waste_kg: number;
      trees_planted: number;
      co2e_reduced_kg: number;
    };
  }>;
}

const formatNum = (n: number) =>
  new Intl.NumberFormat("id-ID", { maximumFractionDigits: 1 }).format(n);

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const today = new Date().toLocaleDateString("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function CSRReportPage() {
  const API_BASE = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";
  const [data, setData] = useState<ReportData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOptions = {
    headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [overviewRes, todayRes, reportsRes] = await Promise.all([
          fetch(`${API_BASE}/api/v1/stats/overview`, fetchOptions).then((r) =>
            r.json(),
          ),
          fetch(`${API_BASE}/api/v1/stats/today`, fetchOptions).then((r) =>
            r.json(),
          ),
          fetch(`${API_BASE}/api/v1/reports?limit=50`, fetchOptions).then((r) =>
            r.json(),
          ),
        ]);

        if (
          overviewRes.status === "success" &&
          todayRes.status === "success" &&
          reportsRes.status === "success"
        ) {
          setData({
            overview: overviewRes.data,
            today: todayRes.data,
            reports: reportsRes.data,
          });
        }
      } catch (e) {
        console.error("Gagal fetch data laporan:", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAll();
  }, []);

  // Auto-print once data is loaded
  useEffect(() => {
    if (!isLoading && data) {
      const timeout = setTimeout(() => window.print(), 800);
      return () => clearTimeout(timeout);
    }
  }, [isLoading, data]);

  if (isLoading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <Leaf className="w-8 h-8 text-green-600 animate-pulse" />
          <p className="text-sm text-gray-400 font-light tracking-widest uppercase">
            Menyiapkan laporan...
          </p>
        </div>
      </div>
    );
  }

  const verifiedReports = data.reports.filter((r) => r.isAuthentic);
  const rejectedReports = data.reports.filter((r) => !r.isAuthentic);

  return (
    <>
      {/* Print styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; }
        body { font-family: 'DM Sans', sans-serif; }

        @media print {
          @page {
            margin: 20mm 18mm;
            size: A4;
          }
          .no-print { display: none !important; }
          .page-break { page-break-before: always; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>

      <div
        className="min-h-screen bg-white text-gray-900"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <div className="max-w-4xl mx-auto px-10 py-12">
          {/* Print button — hidden on print */}
          <div className="no-print flex justify-end mb-8">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Unduh / Cetak Laporan
            </button>
          </div>

          {/* ── HEADER ── */}
          <div className="flex items-start justify-between mb-12 pb-8 border-b border-gray-100">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center">
                  <Leaf className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-sm font-semibold text-green-700 tracking-wide uppercase">
                  Klimabot
                </span>
              </div>
              <h1
                className="text-4xl text-gray-900 leading-tight mb-2"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                Laporan Dampak
                <br />
                <span className="italic text-green-700">Lingkungan</span>
              </h1>
              <p className="text-sm text-gray-400 mt-3">
                Periode: {today} · Diverifikasi AI & Blockchain Solana
              </p>
            </div>

            <div className="text-right">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-100 rounded-full mb-3">
                <Shield className="w-3.5 h-3.5 text-green-600" />
                <span className="text-xs font-medium text-green-700">
                  Terverifikasi AI
                </span>
              </div>
              <p className="text-xs text-gray-400 block">PT. Hijau Lestari</p>
              <p className="text-xs text-gray-400">CSR Admin</p>
            </div>
          </div>

          {/* ── KPI SUMMARY ── */}
          <section className="mb-12">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5">
              Ringkasan Dampak
            </h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                {
                  label: "Total Aksi",
                  value: formatNum(data.overview.total_actions),
                  sub: "submission masuk",
                  icon: Shield,
                  color: "text-gray-900",
                },
                {
                  label: "Sampah Terkumpul",
                  value: `${formatNum(data.today.waste_kg)} kg`,
                  sub: "total berat",
                  icon: Leaf,
                  color: "text-green-700",
                },
                {
                  label: "Pohon Ditanam",
                  value: formatNum(data.today.trees_planted),
                  sub: "batang pohon",
                  icon: Trees,
                  color: "text-emerald-700",
                },
                {
                  label: "Reduksi CO₂",
                  value: `${formatNum(data.today.co2e_reduced_kg)} kg`,
                  sub: "CO₂e berkurang",
                  icon: Droplets,
                  color: "text-blue-700",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-5 rounded-xl border border-gray-100 bg-gray-50/50"
                >
                  <item.icon className={`w-4 h-4 mb-3 ${item.color}`} />
                  <p className={`text-2xl font-semibold mb-0.5 ${item.color}`}>
                    {item.value}
                  </p>
                  <p className="text-xs text-gray-400">{item.label}</p>
                  <p className="text-xs text-gray-300 mt-0.5">{item.sub}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── VERIFICATION STATS ── */}
          <section className="mb-12">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5">
              Status Verifikasi
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-5 rounded-xl border border-green-100 bg-green-50/40">
                <p className="text-2xl font-semibold text-green-700 mb-0.5">
                  {formatNum(data.overview.verified)}
                </p>
                <p className="text-xs text-gray-500">Aksi Terverifikasi</p>
              </div>
              <div className="p-5 rounded-xl border border-red-100 bg-red-50/40">
                <p className="text-2xl font-semibold text-red-600 mb-0.5">
                  {formatNum(data.overview.rejected)}
                </p>
                <p className="text-xs text-gray-500">Aksi Ditolak</p>
              </div>
              <div className="p-5 rounded-xl border border-gray-100 bg-gray-50/50">
                <p className="text-2xl font-semibold text-gray-900 mb-0.5">
                  {data.overview.verification_rate}%
                </p>
                <p className="text-xs text-gray-500">Tingkat Verifikasi</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full"
                style={{ width: `${data.overview.verification_rate}%` }}
              />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-xs text-gray-400">0%</span>
              <span className="text-xs text-green-600 font-medium">
                {data.overview.verification_rate}% verified
              </span>
              <span className="text-xs text-gray-400">100%</span>
            </div>
          </section>

          {/* ── CITIZEN IMPACT ── */}
          <section className="mb-12">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5">
              Partisipasi Warga
            </h2>
            <div className="flex items-center gap-4 p-5 rounded-xl border border-gray-100 bg-gray-50/50">
              <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                <Users className="w-5 h-5 text-gray-700" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-gray-900">
                  {formatNum(data.today.active_citizens)}
                </p>
                <p className="text-xs text-gray-400">
                  warga aktif berkontribusi hari ini
                </p>
              </div>
              {data.today.deltas.active_citizens !== null && (
                <div className="ml-auto">
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
                    +{data.today.deltas.active_citizens}% dari kemarin
                  </span>
                </div>
              )}
            </div>
          </section>

          {/* ── VERIFIED ACTIONS TABLE ── */}
          <div className="page-break" />
          <section className="mb-10">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5">
              Daftar Aksi Terverifikasi ({verifiedReports.length})
            </h2>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs text-gray-400 font-medium pb-3 pr-4">
                    Aksi
                  </th>
                  <th className="text-left text-xs text-gray-400 font-medium pb-3 pr-4">
                    Kategori
                  </th>
                  <th className="text-left text-xs text-gray-400 font-medium pb-3 pr-4">
                    Lokasi
                  </th>
                  <th className="text-right text-xs text-gray-400 font-medium pb-3 pr-4">
                    Skor
                  </th>
                  <th className="text-right text-xs text-gray-400 font-medium pb-3">
                    CO₂e (kg)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {verifiedReports.slice(0, 30).map((r, i) => (
                  <tr key={i} className="hover:bg-gray-50/50">
                    <td className="py-3 pr-4">
                      <span className="font-medium text-gray-800 text-xs">
                        {r.title || "Aksi Lingkungan"}
                      </span>
                      <br />
                      <span className="text-xs text-gray-400">
                        {formatDate(r.createdAt)}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="px-2 py-0.5 text-xs text-green-700 bg-green-50 border border-green-100 rounded-full">
                        {r.actionType}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-xs text-gray-500">
                      {r.location_name || "—"}
                    </td>
                    <td className="py-3 pr-4 text-right">
                      <span className="text-xs font-bold text-gray-900">
                        {r.impactScore}
                        <span className="font-normal text-gray-400">/100</span>
                      </span>
                    </td>
                    <td className="py-3 text-right text-xs text-blue-700 font-medium">
                      {r.extractedMetrics?.co2e_reduced_kg ?? 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {verifiedReports.length > 30 && (
              <p className="text-xs text-gray-400 mt-3 text-center">
                + {verifiedReports.length - 30} aksi lainnya tidak ditampilkan
              </p>
            )}
          </section>

          {/* ── FOOTER ── */}
          <div className="pt-8 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-600 rounded flex items-center justify-center">
                <Leaf className="w-2.5 h-2.5 text-white" />
              </div>
              <span className="text-xs text-gray-400">
                klimabot · AI verification. Real impact. Better future.
              </span>
            </div>
            <p className="text-xs text-gray-300">Dibuat otomatis · {today}</p>
          </div>
        </div>
      </div>
    </>
  );
}
