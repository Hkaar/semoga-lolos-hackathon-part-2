"use client";

import React, { useState } from 'react';
import { 
  Bell, 
  Pencil, 
  CheckCircle2, 
  Target, 
  Building, 
  CreditCard,
  Recycle,
  Cloud,
  Leaf,
  MapPin,
  Rocket,
  Wallet,
  CalendarCheck,
  Coins,
  ChevronDown,
  Info,
  Check
} from 'lucide-react';

export default function ProfilePage() {
  // State untuk interaktivitas form filter dampak
  const [categories, setCategories] = useState({
    plastic: true,
    air: false,
    general: false
  });
  
  const [region, setRegion] = useState('Nasional');
  const [volume, setVolume] = useState('100.000');

  // Fungsi toggle checkbox kategori
  const toggleCategory = (key: keyof typeof categories) => {
    setCategories(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-4 md:p-8 font-sans pb-12">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER NAVBAR --- */}
        <nav className="flex flex-col md:flex-row justify-between items-start md:items-center py-4 mb-8 bg-white px-6 shadow-sm rounded-2xl border border-gray-100">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            {/* Logo */}
            <div className="flex items-center gap-2">
               <img 
                src="images/logo.png" 
                alt="Klimabot Logo" 
                className="h-8 object-contain" 
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<Leaf className="w-6 h-6 text-green-600" /><span class="text-xl font-bold text-green-700 tracking-tight">klimabot</span>';
                }}
              />
            </div>
            
            {/* Divider */}
            <div className="hidden md:block h-10 w-px bg-gray-200 mx-2"></div>
            
            {/* Page Title */}
            <div>
              <h1 className="text-lg font-bold text-gray-900 leading-tight">Profil Perusahaan</h1>
              <p className="text-xs text-gray-500 mt-0.5">Kelola informasi perusahaan, preferensi dampak, dan pengaturan akun Anda.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-end">
            {/* Notification Bell */}
            <button className="relative p-2 text-gray-400 hover:bg-gray-50 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            {/* User Profile */}
            <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-colors">
              <div className="flex flex-col text-right hidden sm:flex">
                <span className="text-sm font-semibold text-gray-700">Siti Aminah</span>
                <span className="text-xs text-gray-500">Head of CSR & ESG Target</span>
              </div>
              <img 
                src="https://i.pravatar.cc/150?u=siti" 
                alt="Profile" 
                className="w-10 h-10 rounded-full border border-gray-200 bg-green-50"
              />
            </div>
          </div>
        </nav>

        {/* --- SECTION 1: PROFIL PERUSAHAAN CARD --- */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 w-full md:w-auto text-center sm:text-left">
            {/* Company Logo Badge */}
            <div className="w-24 h-24 rounded-full border-2 border-gray-50 shadow-sm flex items-center justify-center p-2 bg-white flex-shrink-0">
              <img 
                src="https://upload.wikimedia.org/wikipedia/id/thumb/e/e1/Indofood_logo.svg/1200px-Indofood_logo.svg.png" 
                alt="Indofood Logo" 
                className="w-full object-contain"
                onError={(e) => {
                   e.currentTarget.src = "https://ui-avatars.com/api/?name=Indofood&background=f0fdf4&color=166534&bold=true";
                }}
              />
            </div>
            
            {/* Company Details */}
            <div className="pt-2">
              <h2 className="text-2xl font-bold text-gray-900">PT Indofood Sukses Makmur Tbk.</h2>
              <p className="text-gray-800 font-medium mt-2">Siti Aminah</p>
              <p className="text-sm text-gray-500">Head of CSR & ESG Target</p>
              
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold border border-green-200">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified Corporate
              </div>
            </div>
          </div>
          
          <button className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm">
            <Pencil className="w-4 h-4" /> Ubah Profil
          </button>
        </div>

        {/* --- MIDDLE GRID (Filter & Legality) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          
          {/* SECTION 2: Pengaturan Filter Dampak */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-50 rounded-lg text-green-700">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">2. Pengaturan Filter Dampak & Alokasi</h3>
                <p className="text-xs text-gray-500 mt-0.5">Tentukan fokus dampak dan target alokasi perusahaan Anda.</p>
              </div>
            </div>

            <div className="space-y-6 flex-grow">
              {/* Kategori Fokus */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">Kategori Fokus</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  {/* Option 1: Plastic Waste */}
                  <div 
                    onClick={() => toggleCategory('plastic')}
                    className={`relative border rounded-xl p-3 cursor-pointer transition-all ${
                      categories.plastic ? 'border-green-600 bg-green-50/30' : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded flex items-center justify-center border ${
                        categories.plastic ? 'bg-green-600 border-green-600 text-white' : 'border-gray-300'
                      }`}>
                        {categories.plastic && <Check className="w-3 h-3" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 text-sm font-medium text-gray-800 mb-1">
                          <Recycle className="w-4 h-4 text-green-600" /> Plastic Waste
                        </div>
                        <p className="text-[10px] text-gray-500 leading-tight">Pengelolaan sampah plastik (botol, sachet)</p>
                      </div>
                    </div>
                  </div>

                  {/* Option 2: Air Pollution */}
                  <div 
                    onClick={() => toggleCategory('air')}
                    className={`relative border rounded-xl p-3 cursor-pointer transition-all ${
                      categories.air ? 'border-green-600 bg-green-50/30' : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded flex items-center justify-center border ${
                        categories.air ? 'bg-green-600 border-green-600 text-white' : 'border-gray-300'
                      }`}>
                        {categories.air && <Check className="w-3 h-3" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 text-sm font-medium text-gray-800 mb-1">
                          <Cloud className="w-4 h-4 text-gray-400" /> Air Pollution
                        </div>
                        <p className="text-[10px] text-gray-500 leading-tight">Penyerapan karbon / emisi</p>
                      </div>
                    </div>
                  </div>

                  {/* Option 3: General */}
                  <div 
                    onClick={() => toggleCategory('general')}
                    className={`relative border rounded-xl p-3 cursor-pointer transition-all ${
                      categories.general ? 'border-green-600 bg-green-50/30' : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded flex items-center justify-center border ${
                        categories.general ? 'bg-green-600 border-green-600 text-white' : 'border-gray-300'
                      }`}>
                        {categories.general && <Check className="w-3 h-3" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 text-sm font-medium text-gray-800 mb-1">
                          <Leaf className="w-4 h-4 text-green-600" /> General Environment
                        </div>
                        <p className="text-[10px] text-gray-500 leading-tight">Aksi hijau lainnya (bersih pantai, dll)</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Target Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Target Wilayah CSR</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <select 
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className="w-full pl-9 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 appearance-none text-gray-800"
                    >
                      <option value="Nasional">Nasional</option>
                      <option value="Jawa">Pulau Jawa</option>
                      <option value="Sumatera">Pulau Sumatera</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Target Volume Tahunan</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={volume}
                      onChange={(e) => setVolume(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 text-gray-800"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 pointer-events-none">
                      Kg Plastik
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex items-start gap-2 text-gray-500">
              <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <p className="text-xs">Target ini akan digunakan untuk menghitung progress dampak di dashboard.</p>
            </div>
          </div>

          {/* SECTION 3: Detail Legalitas Perusahaan */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-50 rounded-lg text-green-700">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">3. Detail Legalitas Perusahaan</h3>
                <p className="text-xs text-gray-500 mt-0.5">Informasi legalitas dan identitas perusahaan.</p>
              </div>
            </div>

            <div className="flex-grow flex flex-col justify-center">
              <div className="space-y-0 text-sm">
                
                <div className="flex flex-col sm:flex-row sm:items-center py-4 border-b border-gray-100">
                  <span className="text-gray-500 sm:w-1/3 mb-1 sm:mb-0">Nama Perusahaan</span>
                  <span className="hidden sm:block text-gray-400 mr-4">:</span>
                  <span className="text-gray-900 font-medium sm:w-2/3">PT Indofood Sukses Makmur Tbk.</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center py-4 border-b border-gray-100">
                  <span className="text-gray-500 sm:w-1/3 mb-1 sm:mb-0">Nomor Induk Berusaha (NIB)</span>
                  <span className="hidden sm:block text-gray-400 mr-4">:</span>
                  <span className="text-gray-900 font-medium sm:w-2/3">8120391xxxxxx</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center py-4 border-b border-gray-100">
                  <span className="text-gray-500 sm:w-1/3 mb-1 sm:mb-0">Sektor Industri</span>
                  <span className="hidden sm:block text-gray-400 mr-4">:</span>
                  <span className="text-gray-900 font-medium sm:w-2/3">FMCG (Fast Moving Consumer Goods)</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-start py-4">
                  <span className="text-gray-500 sm:w-1/3 mb-1 sm:mb-0">Alamat Kantor Pusat</span>
                  <span className="hidden sm:block text-gray-400 mr-4">:</span>
                  <span className="text-gray-900 font-medium sm:w-2/3 leading-relaxed">
                    Sudirman Plaza,<br />
                    Jakarta Selatan 12920
                  </span>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* --- SECTION 4: Paket Langganan --- */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-50 rounded-lg text-green-700">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">4. Paket Langganan & Tagihan</h3>
              <p className="text-xs text-gray-500 mt-0.5">Informasi paket berlangganan dan pengelolaan dana CSR.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Paket Saat Ini */}
            <div className="p-5 rounded-xl bg-gray-50/50 border border-gray-100 flex items-start gap-4">
              <div className="p-2.5 bg-white rounded-full shadow-sm border border-gray-100">
                <Rocket className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Paket Saat Ini</p>
                <p className="text-sm font-bold text-gray-900">Enterprise Plan (SaaS)</p>
                <p className="text-xs text-gray-500 mt-1">Akses penuh ke semua fitur premium</p>
              </div>
            </div>

            {/* Harga Langganan */}
            <div className="p-5 rounded-xl bg-gray-50/50 border border-gray-100 flex items-start gap-4">
              <div className="p-2.5 bg-white rounded-full shadow-sm border border-gray-100">
                <Wallet className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Harga Langganan</p>
                <p className="text-sm font-bold text-gray-900">Rp 15.000.000 <span className="font-normal text-xs text-gray-500">/ Bulan</span></p>
                <p className="text-xs text-gray-500 mt-1 leading-tight">Termasuk semua fitur & dukungan prioritas</p>
              </div>
            </div>

            {/* Status Tagihan */}
            <div className="p-5 rounded-xl bg-gray-50/50 border border-gray-100 flex items-start gap-4">
              <div className="p-2.5 bg-white rounded-full shadow-sm border border-gray-100">
                <CalendarCheck className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Status Tagihan</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <p className="text-sm font-bold text-gray-900">Aktif</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">Next billing: 25 Mei 2026</p>
              </div>
            </div>

            {/* Sisa Saldo Dana */}
            <div className="p-5 rounded-xl bg-green-50/30 border border-green-100 flex flex-col justify-between">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-2.5 bg-white rounded-full shadow-sm border border-green-100">
                  <Coins className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Sisa Saldo Dana CSR</p>
                  <p className="text-lg font-bold text-gray-900">Rp 50.000.000</p>
                  <p className="text-xs text-gray-500 mt-0.5">Alokasi insentif untuk warga</p>
                </div>
              </div>
              <button className="w-full py-2 bg-white border border-green-600 text-green-700 rounded-lg text-xs font-semibold hover:bg-green-50 transition-colors flex justify-center items-center gap-2">
                <Wallet className="w-3.5 h-3.5" /> Top Up Saldo
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}