"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Leaf,
  Trees,
  Cloud,
  TrendingUp,
  ChevronDown,
  User,
  LogOut,
  Settings,
} from "lucide-react";

// --- TYPESCRIPT INTERFACES ---

interface StatDetail {
  value: string;
  unit?: string;
  trend: string;
}

interface StatsData {
  totalImpact: StatDetail;
  pohonDitanam: StatDetail;
  totalCO2: StatDetail;
}

interface ReportData {
  title: string;
  userName?: string;
  aiReasoning: string;
  actionType: string;
  isAuthentic: boolean;
  impactScore: number;
  location_name: string;
  imageUrl: string;
  createdAt: string;
  extractedMetrics?: {
    waste_kg: number;
    trees_planted: number;
    co2e_reduced_kg: number;
  };
}

interface MapPoint {
  location: { lat: number; lng: number };
  location_name: string;
  actionType: string;
  impactScore: number;
  createdAt: string;
}

// --- HELPERS ---

const timeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.round(diffMs / 60000);
  const diffHrs = Math.round(diffMins / 60);
  const diffDays = Math.round(diffHrs / 24);
  if (diffMins < 60) return `${diffMins} menit lalu`;
  if (diffHrs < 24) return `${diffHrs} jam lalu`;
  return `${diffDays} hari lalu`;
};

const formatNumber = (num: number) =>
  new Intl.NumberFormat("id-ID", { maximumFractionDigits: 1 }).format(num);

const formatTrend = (delta: number | null | undefined) => {
  if (delta === null || delta === undefined) return "+0";
  return delta > 0 ? `+${delta}` : `${delta}`;
};

// --- NAVBAR WITH DROPDOWN ---

const Navbar = () => {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
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
      {/* Logo */}
      <div className="flex items-center">
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
      </div>

      {/* Profile dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen((v) => !v)}
          className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors"
        >
          <img
            src="https://media.licdn.com/dms/image/v2/D4E0BAQEk57sKsLxvfQ/company-logo_200_200/company-logo_200_200/0/1691398200285?e=2147483647&v=beta&t=Y9kCZcFSAhF6Q3WqQwFqpsKoYQqLrW8YOyE3OUwiY1k"
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
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <User size={15} className="text-gray-400" />
              Profil Perusahaan
            </button>
            <div className="border-t border-gray-100 my-1" />
            <button
              onClick={() => {
                localStorage.removeItem("auth_token");
                window.location.href = "/login";
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
};

// --- STAT CARD ---

interface StatCardProps {
  title: string;
  value?: string;
  unit?: string;
  trend?: string;
  icon: React.ElementType;
  isActive?: boolean;
}

const StatCard = ({
  title,
  value,
  unit,
  trend,
  icon: Icon,
  isActive,
}: StatCardProps) => (
  <div
    className={`p-6 rounded-2xl flex flex-col justify-between ${
      isActive
        ? "bg-green-50/30 border-2 border-green-500/30"
        : "bg-white border border-gray-100 shadow-sm"
    }`}
  >
    <div className="flex justify-between items-start mb-4">
      <div className="flex gap-3 items-center">
        <div
          className={`p-3 rounded-xl ${isActive ? "bg-green-100" : "bg-green-50"}`}
        >
          <Icon
            className={`w-6 h-6 ${isActive ? "text-green-700" : "text-green-600"}`}
          />
        </div>
        <div className="text-sm font-medium text-gray-500">{title}</div>
      </div>
      <div className="flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
        <TrendingUp className="w-3 h-3" />
        {trend}%
      </div>
    </div>
    <div>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold text-gray-900">{value || "0"}</span>
        {unit && (
          <span className="text-xl font-bold text-gray-900">{unit}</span>
        )}
      </div>
      <div className="text-xs text-gray-400 mt-1">dari kemarin</div>
    </div>
  </div>
);

// --- FEED TABLE ---

interface FeedTableProps {
  data: ReportData[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const FeedTable = ({
  data,
  isLoading,
  currentPage,
  totalPages,
  onPageChange,
}: FeedTableProps) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
    <h2 className="text-lg font-bold text-gray-900 mb-6">
      Feed Aksi Terverifikasi
    </h2>
    <div className="overflow-x-auto flex-grow">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-500 border-b border-gray-100">
          <tr>
            <th className="pb-4 font-medium">Nama Pahlawan</th>
            <th className="pb-4 font-medium">Kategori Aksi</th>
            <th className="pb-4 font-medium">AI Score</th>
            <th className="pb-4 font-medium">Waktu</th>
            <th className="pb-4 font-medium text-right pr-4">Dampak Reduksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {isLoading ? (
            <tr>
              <td colSpan={5} className="text-center py-10 text-gray-400">
                Memuat data feed...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-10 text-gray-400">
                Tidak ada aksi terverifikasi.
              </td>
            </tr>
          ) : (
            data.map((item, index) => {
              const displayName =
                item.userName || item.title || "Pahlawan Anonim";
              return (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(displayName)}`}
                        alt={displayName}
                        className="w-8 h-8 rounded-full bg-gray-200"
                      />
                      <span
                        className="font-semibold text-gray-900 max-w-[150px] truncate"
                        title={displayName}
                      >
                        {displayName}
                      </span>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="px-3 py-1 text-xs font-medium text-green-700 border border-green-200 rounded-full">
                      {item.actionType}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className="px-3 py-1 text-xs font-bold text-white bg-gray-900 rounded-full">
                      {item.impactScore}/100
                    </span>
                  </td>
                  <td className="py-4 text-gray-500 text-xs">
                    {timeAgo(item.createdAt)}
                  </td>
                  <td className="py-4 text-right pr-2">
                    {item.isAuthentic ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 rounded-full shadow-sm">
                        {item.extractedMetrics?.co2e_reduced_kg || 0} kg CO2e ↓
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-white bg-red-500 rounded-full">
                        Ditolak
                      </span>
                    )}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
    <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-100">
      <span className="text-sm text-gray-500">
        Halaman {currentPage} dari {totalPages || 1}
      </span>
      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
          className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Sebelumnya
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages || isLoading}
          className="px-4 py-2 text-sm font-medium text-green-700 border border-green-600 rounded-lg hover:bg-green-50 disabled:border-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Selanjutnya
        </button>
      </div>
    </div>
  </div>
);

// --- IMPACT MAP ---

const ImpactMap = ({ mapPoints }: { mapPoints: MapPoint[] }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }
    if (!document.getElementById("leaflet-js")) {
      const script = document.createElement("script");
      script.id = "leaflet-js";
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = () => setMapLoaded(true);
      document.head.appendChild(script);
    } else {
      // @ts-ignore
      if (window.L) setMapLoaded(true);
    }
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    // @ts-ignore
    if (mapLoaded && mapRef.current && window.L) {
      // @ts-ignore
      const L = window.L;
      if (!mapInstanceRef.current) {
        mapInstanceRef.current = L.map(mapRef.current).setView(
          [-2.5489, 118.0149],
          5,
        );
        L.tileLayer(
          "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
          {
            attribution: "&copy; OpenStreetMap contributors",
          },
        ).addTo(mapInstanceRef.current);
        setTimeout(() => {
          if (mapInstanceRef.current) mapInstanceRef.current.invalidateSize();
        }, 250);
      }
      mapInstanceRef.current.eachLayer((layer: any) => {
        // @ts-ignore
        if (layer instanceof L.Marker)
          mapInstanceRef.current.removeLayer(layer);
      });
      const customIcon = new L.DivIcon({
        className: "custom-icon",
        html: `<div style="width:14px;height:14px;background:#22c55e;border-radius:50%;border:2px solid white;box-shadow:0 2px 4px rgba(0,0,0,0.2);"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
        popupAnchor: [0, -10],
      });
      mapPoints.forEach((point) => {
        if (point.location?.lat && point.location?.lng) {
          L.marker([point.location.lat, point.location.lng], {
            icon: customIcon,
          }).addTo(mapInstanceRef.current).bindPopup(`
              <div style="font-family:sans-serif;font-size:14px;min-width:120px;">
                <p style="font-weight:bold;margin:0 0 4px 0;color:#111827;">${point.location_name || "Lokasi Hijau"}</p>
                <p style="margin:0;color:#15803d;background:#f0fdf4;padding:4px 8px;border-radius:6px;display:inline-block;font-size:12px;font-weight:500;border:1px solid #bbf7d0;">${point.actionType}</p>
                <p style="margin:6px 0 0 0;font-size:11px;color:#6b7280;">Skor: <b>${point.impactScore}</b></p>
              </div>
            `);
        }
      });
    }
  }, [mapLoaded, mapPoints]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
      <h2 className="text-lg font-bold text-gray-900 mb-6">Peta Dampak</h2>
      <div className="rounded-xl flex-grow relative overflow-hidden flex items-center justify-center min-h-[350px] bg-gray-50 z-0">
        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 z-10">
            Memuat peta interaktif...
          </div>
        )}
        <div
          ref={mapRef}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
          <span className="text-sm text-gray-500">
            Aksi Hijau Terverifikasi
          </span>
        </div>
        <span className="text-xs text-gray-400 font-medium">
          Total: {mapPoints.length} titik
        </span>
      </div>
    </div>
  );
};

// --- MAIN PAGE ---

export default function App() {
  const API_BASE = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

  const [stats, setStats] = useState<StatsData | null>(null);
  const [isStatsLoading, setIsStatsLoading] = useState(true);
  const [feed, setFeed] = useState<ReportData[]>([]);
  const [isFeedLoading, setIsFeedLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [mapPoints, setMapPoints] = useState<MapPoint[]>([]);

  const fetchOptions = {
    headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsStatsLoading(true);
        const [overviewRes, todayRes, mapRes] = await Promise.all([
          fetch(`${API_BASE}/api/v1/stats/overview`, fetchOptions).then((r) =>
            r.json(),
          ),
          fetch(`${API_BASE}/api/v1/stats/today`, fetchOptions).then((r) =>
            r.json(),
          ),
          fetch(`${API_BASE}/api/v1/map-points`, fetchOptions).then((r) =>
            r.json(),
          ),
        ]);
        if (overviewRes.status === "success" && todayRes.status === "success") {
          setStats({
            totalImpact: {
              value: formatNumber(overviewRes.data.total_waste_kg || 0),
              unit: "kg",
              trend: formatTrend(todayRes.data.deltas?.waste_kg),
            },
            pohonDitanam: {
              value: formatNumber(overviewRes.data.total_trees_planted || 0),
              trend: formatTrend(todayRes.data.deltas?.trees_planted),
            },
            totalCO2: {
              value: formatNumber(overviewRes.data.total_co2e_reduced_kg || 0),
              unit: "kg",
              trend: formatTrend(todayRes.data.deltas?.co2e_reduced_kg),
            },
          });
        }
        if (mapRes.status === "success") setMapPoints(mapRes.data);
      } catch (error) {
        console.error("Gagal mengambil data Overview/Stats", error);
      } finally {
        setIsStatsLoading(false);
      }
    };
    fetchDashboardData();
  }, [API_BASE]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setIsFeedLoading(true);
        const res = await fetch(
          `${API_BASE}/api/v1/reports?page=${currentPage}&limit=5`,
          fetchOptions,
        );
        const result = await res.json();
        if (result.status === "success") {
          setFeed(result.data);
          setTotalPages(result.pagination.pages);
        }
      } catch (error) {
        console.error("Gagal mengambil data Feed Laporan", error);
      } finally {
        setIsFeedLoading(false);
      }
    };
    fetchReports();
  }, [currentPage, API_BASE]);

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <Navbar />
        {isStatsLoading && !stats ? (
          <div className="animate-pulse flex space-x-4 mb-6">
            <div className="flex-1">
              <div className="h-24 bg-gray-200 rounded-xl" />
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <StatCard
                title="Total Impact"
                value={stats?.totalImpact.value}
                unit={stats?.totalImpact.unit}
                trend={stats?.totalImpact.trend}
                icon={Leaf}
                isActive
              />
              <StatCard
                title="Pohon Ditanam"
                value={stats?.pohonDitanam.value}
                trend={stats?.pohonDitanam.trend}
                icon={Trees}
              />
              <StatCard
                title="Total Reduksi CO2"
                value={stats?.totalCO2.value}
                unit={stats?.totalCO2.unit}
                trend={stats?.totalCO2.trend}
                icon={Cloud}
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <FeedTable
                  data={feed}
                  isLoading={isFeedLoading}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
              <div className="lg:col-span-1 min-h-[450px]">
                <ImpactMap mapPoints={mapPoints} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
