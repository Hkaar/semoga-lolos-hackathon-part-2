"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0f1a12]">
      <div className="flex items-center gap-2">
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
        <span className="text-white text-xl font-bold tracking-tight">
          klimabot
        </span>
      </div>
      <div className="mt-6 w-40 h-0.5 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-green-500 rounded-full animate-[loading_1.5s_ease-in-out_infinite]" />
      </div>
    </div>
  );
}
