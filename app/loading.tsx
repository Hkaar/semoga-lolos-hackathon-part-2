"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-10">
        <img
          src="images/logo.png"
          alt="Klimabot Logo"
          className="h-7 object-contain"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        <span className="text-gray-900 text-lg font-semibold tracking-tight">
          klimabot
        </span>
      </div>

      {/* Minimal dot pulse */}
      <div className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-[pulse_1.2s_ease-in-out_infinite]" />
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-[pulse_1.2s_ease-in-out_0.2s_infinite]" />
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-[pulse_1.2s_ease-in-out_0.4s_infinite]" />
      </div>
    </div>
  );
}
