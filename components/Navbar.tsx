"use client";
import { useState } from "react";
import Link from "next/link";
import { Terminal, ChevronRight, Menu, X, Activity } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "HOME", href: "/" },
    { name: "CODE_LAB", href: "/code-laboratory" },
    { name: "INSIGHTS", href: "/wanted-insights" },
    { name: "SPEED_CHECK", href: "/speed-check" }
  ];

  return (
    <nav className="sticky top-0 z-[100] bg-black border-b-2 border-[#00ff41]/30 px-6 py-4 font-mono">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* LOGO */}
        <Link href="/" className="group flex items-center">
          <span className="text-[#00ff41] font-black text-xl tracking-tighter">
            [WEB<span className="bg-[#00ff41] text-black px-1 group-hover:bg-white transition-all">WANTED</span>]
          </span>
        </Link>

        {/* DESKTOP MENU LINKS */}
        <div className="hidden md:flex gap-1 items-center font-bold">
          {links.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-[11px] text-[#00ff41]/60 hover:text-[#00ff41] transition-all px-4 py-1.5 border border-transparent hover:border-[#00ff41]/20 hover:bg-zinc-900"
            >
              [ {link.name} ]
            </Link>
          ))}
        </div>

        {/* SYSTEM STATUS (Desktop Only) */}
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

        {/* MOBILE MENU BUTTON (Visible only on small screens) */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-[#00ff41] p-1 border border-[#00ff41]/20 bg-zinc-900/50"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {isOpen && (
        <div className="fixed inset-0 top-[66px] bg-black/95 backdrop-blur-md z-[99] md:hidden animate-in fade-in slide-in-from-top-5 duration-300">
          <div className="flex flex-col p-8 gap-4">
            <div className="text-[10px] text-zinc-600 mb-4 tracking-[0.3em] flex items-center gap-2">
               <Activity size={10} className="animate-pulse" /> ACCESSING_SYSTEM_NODES...
            </div>
            {links.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-2xl font-black text-[#00ff41]/60 hover:text-[#00ff41] border-b border-[#00ff41]/10 py-4 transition-all flex justify-between items-center group"
              >
                {link.name}
                <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
            <div className="mt-10 p-4 border border-pink-500/20 bg-pink-500/5 text-[10px] text-pink-500 font-black animate-pulse">
              [!] ALERT: MOBILE_SESSION_ENCRYPTED
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}