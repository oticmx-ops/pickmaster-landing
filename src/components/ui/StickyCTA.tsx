"use client";

import { appUrls } from "@/lib/app-urls";

export default function StickyCTA() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{
        background: "rgba(6,8,15,0.9)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div className="px-4 py-3">
        <a
          href={appUrls.pools}
          className="flex items-center justify-center w-full rounded-xl font-semibold text-white active:scale-[0.97] transition-transform duration-150"
          style={{
            height: 52,
            fontSize: 15,
            background: "linear-gradient(180deg, #4F7FFF, #3B6FF5)",
            boxShadow: "0 4px 20px rgba(59,111,245,0.5)",
          }}
        >
          Ver quinielas activas
        </a>
      </div>
    </div>
  );
}
