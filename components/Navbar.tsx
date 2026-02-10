"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Menu, X, Search } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [command, setCommand] = useState("");

  const links = [
    { name: "HOME", href: "/" },
    { name: "CODE_LABORATORY", href: "/code-laboratory" },
    { name: "DEV_PROJECTS", href: "/dev-projects" },
    { name: "WANTED_INSIGHTS", href: "/wanted-insights" },
    { name: "SPEED_CHECK", href: "/speed-check" }
  ];

  return (
    <nav className="sticky top-0 z-[100] bg-black border-b border-[#00ff41]/10 px-6 py-4 font-mono text-white">
      <div className="max-w-[1800px] mx-auto flex justify-between items-center">
        
        {/* ЛОГО: >_ WEB WANTED */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[#00ff41] font-black text-2xl animate-pulse tracking-tighter">{`>_`}</span>
            <span className="text-white font-black tracking-tighter text-xl uppercase leading-none group-hover:text-[#00ff41] transition-colors">
              WEB<span className="text-[#00ff41]">WANTED</span>
            </span>
          </div>
        </Link>

        {/* ДЕСКТОП МЕНЮ */}
        <div className="hidden lg:flex gap-2 items-center mx-10">
          {links.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-[11px] font-black tracking-[0.2em] flex items-center px-3 py-2 italic group transition-all"
            >
              <span className="text-[#00ff41] mr-1 transition-transform group-hover:-translate-x-1">[</span>
              <span className="text-white group-hover:text-[#00ff41] transition-colors">
                {link.name}
              </span>
              <span className="text-[#00ff41] ml-1 transition-transform group-hover:translate-x-1">]</span>
            </Link>
          ))}
        </div>

        {/* ТЕРМИНАЛНА ТЪРСАЧКА */}
        <div className="hidden md:flex items-center group/search border-l border-zinc-900 pl-6">
          <div className="flex items-center bg-zinc-950/50 border border-zinc-800 rounded-sm px-3 py-1.5 focus-within:border-[#00ff41]/40 transition-all">
            <Search size={14} className="text-zinc-700 group-focus-within/search:text-[#00ff41] transition-colors" />
            <input 
              className="bg-transparent border-none outline-none ml-3 text-[10px] font-black text-[#00ff41] uppercase w-28 lg:w-40 placeholder:text-zinc-800 tracking-widest italic"
              placeholder="RUN_CMD..."
              value={command}
              onChange={(e) => setCommand(e.target.value)}
            />
          </div>
        </div>

        {/* МОБИЛЕН БУТОН (BURGER) */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="lg:hidden text-[#00ff41] p-1 border border-[#00ff41]/20 hover:bg-[#00ff41]/10 transition-all"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* МОБИЛНО МЕНЮ (FIXED OVERLAY) */}
      {isOpen && (
        <div className="fixed inset-0 z-[150] bg-black lg:hidden animate-in fade-in duration-300">
          {/* HEADER ВЪТРЕ В МЕНЮТО */}
          <div className="flex justify-between items-center px-6 py-4 border-b border-[#00ff41]/10">
            <div className="flex items-center gap-2">
              <span className="text-[#00ff41] font-black animate-pulse">{`>_`}</span>
              <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold italic">System_Node_v2</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-[#00ff41] p-1 border border-[#00ff41]/40 bg-[#00ff41]/5"
            >
              <X size={24} />
            </button>
          </div>

          {/* ЛИНКОВЕ */}
          <div className="flex flex-col p-8 gap-6 h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-zinc-900/20 via-black to-black">
            <div className="text-[9px] text-zinc-600 tracking-[0.4em] font-black uppercase mb-2">
              // SELECT_DESTINATION
            </div>

            {links.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-2xl font-black italic flex items-center group w-fit"
              >
                <span className="text-[#00ff41] mr-3 opacity-40 group-hover:opacity-100 transition-opacity">[</span>
                <span className="text-white group-hover:text-[#00ff41] transition-all group-hover:pl-2">
                  {link.name}
                </span>
                <span className="text-[#00ff41] ml-3 opacity-40 group-hover:opacity-100 transition-opacity">]</span>
              </Link>
            ))}

            {/* SYSTEM STATUS FOOTER */}
            <div className="mt-auto mb-20">
              <div className="p-4 border border-zinc-900 bg-zinc-950/50 rounded-sm">
                <div className="flex items-center gap-3 text-[10px] font-mono text-zinc-500">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff41] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff41]"></span>
                  </span>
                  SESSION: AUTHORIZED_ACCESS
                </div>
                <div className="text-[8px] text-zinc-700 mt-1 font-mono tracking-tighter">
                  IP_LOGGED: 127.0.0.1 // PROTOCOL: NEXT_JS_SECURE
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}