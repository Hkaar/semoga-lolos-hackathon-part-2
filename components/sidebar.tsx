"use client";
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  ClipboardList, 
  ShieldCheck, 
  BarChart2, 
  Wallet, 
  Settings, 
  Send, 
  Leaf, 
  LucideIcon ,
  ArrowRight
} from 'lucide-react';
import { Button } from './ui/button';

interface NavItem {
  name: string;
  icon: LucideIcon;
  href: string;
}

export default function Sidebar() {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
    { name: 'Actions', icon: ClipboardList, href: '/admin/actions' },
    { name: 'Proofs', icon: ShieldCheck, href: '/admin/proofs' },
    { name: 'Impact', icon: BarChart2, href: '/admin/impact' },
    { name: 'Funding', icon: Wallet, href: '/admin/funding' },
    { name: 'Settings', icon: Settings, href: '/admin/settings' },
  ];

  return (
    <aside className="font-geist-sans w-64 bg-sidebar-primary-foreground flex flex-col justify-between py-6 px-4 shrink-0 overflow-y-auto">
      {/* Logo & Navigasi */}
      <div>
        <Link href={"/admin"} className="flex items-center gap-2 px-2 mb-8 cursor-pointer">
             <Image
              src="/images/logo.svg"
              width={500}
              height={500}
              alt="Logo KlimaBot"
            />
        </Link>

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition duration-200 w-full text-left
                  ${isActive ? 'bg-[#2b6a41] text-white shadow-sm' : 'text-gray-600 hover:bg-[#e6f4ec] hover:text-green-900'}`}
              >
                <Icon 
                  className={`w-5 h-5 ${isActive ? 'text-white fill-current' : 'text-gray-500'}`} 
                  strokeWidth={isActive ? 2.5 : 2} 
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-8">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-green-50">
          <p className="text-sm font-bold text-green-900 mb-3">Input via Telegram</p>
          <div className="w-10 h-10 bg-[#299042] rounded-full flex items-center justify-center mb-3">
            <Send className="w-4 h-4 text-white ml-[-2px] mt-[2px]" />
          </div>
          <p className="text-xs text-gray-500 leading-relaxed mb-4">
            Citizens submit environmental actions directly through Telegram.
          </p>
          <Button className="flex items-center gap-1 text-xs font-semibold text-gray-600 bg-white border border-gray-200 rounded-lg p-4 w-full justify-center hover:bg-gray-50 transition-colors">
            How it works <span className="text-gray-400 text-sm ml-1"><ArrowRight className='size-4'/></span>
          </Button>
        </div>
      </div>
    </aside>
  );
}