"use client";
import Link from "next/link";
import { Terminal, ChevronRight } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-[100] bg-black border-b-2 border-[#00ff41]/30 px-6 py-4 font-mono">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* LOGO */}
        <Link href="/" className="group flex items-center">
          <span className="text-[#00ff41] font-black text-xl tracking-tighter">
            [WEB<span className="bg-[#00ff41] text-black px-1 group-hover:bg-white transition-all">WANTED</span>]
          </span>
        </Link>

        {/* MENU LINKS */}
        <div className="hidden md:flex gap-1 items-center font-bold">
          {[
            { name: "HOME", href: "/" },
            { name: "CODE_LAB", href: "/code-laboratory" },
            { name: "INSIGHTS", href: "/wanted-insights" },
            { name: "SPEED_CHECK", href: "/speed-check" }
          ].map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-[11px] text-[#00ff41]/60 hover:text-[#00ff41] transition-all px-4 py-1.5 border border-transparent hover:border-[#00ff41]/20 hover:bg-zinc-900"
            >
              [ {link.name} ]
            </Link>
          ))}
        </div>

        {/* SYSTEM STATUS */}
        <div className="hidden lg:flex items-center gap-4 text-[10px]">
          <div className="flex items-center gap-2 text-pink-500 animate-pulse font-black">
            <span className="w-2 h-2 bg-pink-500 shadow-[0_0_8px_#ec4899]"></span>
            BREACH_DETECTED
          </div>
          <div className="bg-zinc-900 border border-zinc-800 px-3 py-1 flex items-center gap-2">
            <ChevronRight size={12} className="text-[#00ff41]" />
            <span className="text-zinc-500 uppercase">root@wanted:~$</span>
          </div>
        </div>
      </div>
    </nav>
  );
}