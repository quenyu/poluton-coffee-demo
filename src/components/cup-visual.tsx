"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

const CupScene = dynamic(() => import("./cup-scene"), { ssr: false });

type NavigatorWithMemory = Navigator & { deviceMemory?: number };

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch { return false; }
}

export function CupVisual() {
  const [enhance, setEnhance] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !window.matchMedia("(min-width: 769px)").matches || !supportsWebGL()) return;
    const memory = (navigator as NavigatorWithMemory).deviceMemory;
    if (memory && memory <= 2) return;
    const win = window as typeof window & { requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
    if (win.requestIdleCallback) {
      const id = win.requestIdleCallback(() => setEnhance(true), { timeout: 1200 });
      return () => win.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(() => setEnhance(true), 420);
    return () => window.clearTimeout(id);
  }, [reduced]);

  return (
    <div className="relative h-full min-h-[430px] w-full" data-3d={enhance ? "active" : "fallback"}>
      <Image className={`absolute inset-0 h-full w-full object-contain p-6 transition-opacity duration-500 ${enhance ? "opacity-0" : "opacity-100"}`} src="/assets/poluton-cup.webp" alt="Двухцветный фирменный стакан ПОЛУТОН" width={900} height={1125} priority sizes="(max-width: 768px) 90vw, 48vw" />
      {enhance && <div className="absolute inset-0"><CupScene reduced={Boolean(reduced)} /></div>}
      <p className="absolute right-4 bottom-4 rounded-full bg-white/70 px-3 py-1.5 text-[10px] font-bold tracking-[0.08em] uppercase backdrop-blur">{enhance ? "pointer reactive · webgl" : "light fallback"}</p>
    </div>
  );
}
