"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-6 bg-black border-b border-gray-800 sticky top-0 z-50">
      <div className="text-xl font-bold text-white tracking-tighter">
        WEB<span className="text-purple-500">WANTED</span>
      </div>
      <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
        <Link href="/" className="hover:text-purple-500 transition">Home</Link>
        <Link href="/code-laboratory" className="hover:text-purple-500 transition">Code Lab</Link>
        <Link href="/wanted-insights" className="hover:text-purple-500 transition">Insights</Link>
        <Link href="/speed-check" className="hover:text-purple-500 transition">Speed Check</Link>
        <Link href="/dev-projects" className="hover:text-purple-500 transition">Projects</Link>
      </div>
      <div className="md:hidden text-gray-400">
        {/* Тук по-късно можем да сложим мобилно меню */}
        Menu
      </div>
    </nav>
  );
}