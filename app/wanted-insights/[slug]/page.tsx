"use client";

import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Terminal, ChevronLeft, Clock, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";

export default function PostPage({ params }: { params: { slug: string } }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Четене на съдържанието (Това работи само в Next.js App Router при правилна конфигурация)
  const postPath = path.join(process.cwd(), "content/blog", `${params.slug}.mdx`);
  const fileContent = fs.readFileSync(postPath, "utf-8");
  const { data: frontmatter, content } = matter(fileContent);

  return (
    <article className="min-h-screen bg-[#050505] text-[#00ff41] font-mono p-4 md:p-12 selection:bg-[#00ff41] selection:text-black">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-[#00ff41] origin-left z-[100] shadow-[0_0_10px_#00ff41]" style={{ scaleX }} />

      <div className="max-w-4xl mx-auto pt-10">
        <Link href="/wanted-insights" className="inline-flex items-center gap-2 text-zinc-600 hover:text-[#00ff41] mb-12 text-[10px] font-black uppercase tracking-widest transition-colors">
          <ChevronLeft size={14} /> [ BACK_TO_DATABASE ]
        </Link>

        <header className="border-l-4 border-[#00ff41] pl-8 mb-16 space-y-6">
          <div className="flex gap-6 text-[10px] font-black text-zinc-600 uppercase tracking-widest">
            <span className="flex items-center gap-2"><Clock size={12}/> {frontmatter.date}</span>
            <span className="flex items-center gap-2 text-pink-500"><Terminal size={12}/> ID: {frontmatter.id}</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-[0.9]">
            {frontmatter.title}
          </h1>
          <p className="text-zinc-500 text-sm italic border-t border-zinc-900 pt-4 uppercase">{frontmatter.preview}</p>
        </header>

        <div className="prose prose-invert prose-green max-w-none pb-32">
          <div className="whitespace-pre-wrap leading-relaxed text-zinc-400">
            {content}
          </div>
        </div>

        <footer className="py-20 border-t border-dashed border-zinc-900 flex justify-between text-[10px] text-zinc-800 font-black uppercase italic">
            <div>END_OF_LOG_ENTRY</div>
            <div className="text-[#00ff41]/20 tracking-widest">WebWanted_Secure_Node</div>
        </footer>
      </div>
    </article>
  );
}