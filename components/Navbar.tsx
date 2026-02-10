"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Menu, X, Search } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [command, setCommand] = useState("");

  // 1. ЧИСТ СПИСЪК (БЕЗ РЪЧНИ СКОБИ)
  const links = [
    { name: "HOME", href: "/" },
    { name: "CODE_LABORATORY", href: "/code-laboratory" },
    { name: "DEV_PROJECTS", href: "/dev-projects" },
    { name: "WANTED_INSIGHTS", href: "/wanted-insights" },
    { name: "SPEED_CHECK", href: "/speed-check" }
  ];

  return (
    <nav className="sticky top-0 z-[100] bg-black border-b border-[#00ff41]/10 px-6 py-4 font-mono">
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

        {/* 2. ДЕСКТОП МЕНЮ: ЗЕЛЕНИ СКОБИ И БЯЛ ТЕКСТ */}
        <div className="hidden lg:flex gap-2 items-center mx-10">
          {links.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-[11px] font-black tracking-[0.2em] flex items-center px-3 py-2 italic group transition-all"
            >
              {/* ЛЯВА СКОБА: ЗЕЛЕНА */}
              <span className="text-[#00ff41] mr-1 transition-transform group-hover:-translate-x-1">[</span>
              
              {/* ТЕКСТ: БЯЛ (СВЕТВА В ЗЕЛЕНО ПРИ HOVER) */}
              <span className="text-white group-hover:text-[#00ff41] transition-colors">
                {link.name}
              </span>
              
              {/* ДЯСНА СКОБА: ЗЕЛЕНА */}
              <span className="text-[#00ff41] ml-1 transition-transform group-hover:translate-x-1">]</span>
            </Link>
          ))}
        </div>

        {/* ТЕРМИНАЛНА ТЪРСАЧКА RUN_CMD */}
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

        {/* МОБИЛЕН БУТОН */}
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-[#00ff41] p-1 border border-[#00ff41]/20">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* МОБИЛНО МЕНЮ (СЪС СЪЩИЯ СТИЛ) */}
      {isOpen && (
        <div className="fixed inset-0 top-[65px] bg-black/98 z-[99] lg:hidden p-8 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-2xl font-black flex items-center italic group"
              >
                <span className="text-[#00ff41] mr-2">[</span>
                <span className="text-white group-hover:text-[#00ff41]">{link.name}</span>
                <span className="text-[#00ff41] ml-2">]</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}