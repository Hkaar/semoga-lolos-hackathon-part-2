import Sidebar from "@/components/sidebar";
import { Geist } from "next/font/google";

const geistSans = Geist({
  subsets: ["latin"],
});

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${geistSans.className} flex h-screen w-full bg-white text-slate-900`}>
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-white border-l border-gray-100">
        {children}
      </main>
    </div>
  );
}