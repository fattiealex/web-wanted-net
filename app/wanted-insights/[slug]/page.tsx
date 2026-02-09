import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Terminal, ChevronLeft, Clock } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

// Динамичен импорт без SSR, за да избегнем грешката с 'fs' в браузъра
const ReadingProgressBar = dynamic(() => import("@/components/ReadingProgressBar"), { 
  ssr: false 
});

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const postPath = path.join(process.cwd(), "content/blog", `${slug}.mdx`);
  
  // Проверка дали файлът съществува
  if (!fs.existsSync(postPath)) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center font-mono p-10">
        <div className="text-[#00ff41] border border-[#00ff41] p-10 uppercase tracking-[0.5em] animate-pulse text-center">
          [ 404_DATA_CORRUPTION_DETECTED ]
        </div>
      </div>
    );
  }

  const fileContent = fs.readFileSync(postPath, "utf-8");
  const { data: frontmatter, content } = matter(fileContent);

  return (
    <article className="min-h-screen bg-[#050505] text-[#00ff41] font-mono p-4 md:p-12 selection:bg-[#00ff41] selection:text-black">
      <ReadingProgressBar />

      <div className="max-w-4xl mx-auto pt-10">
        <Link 
          href="/wanted-insights" 
          className="inline-flex items-center gap-2 text-zinc-600 hover:text-[#00ff41] mb-12 text-[10px] font-black uppercase tracking-widest transition-colors group"
        >
          <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-all" /> 
          [ BACK_TO_DATABASE ]
        </Link>

        <header className="border-l-4 border-[#00ff41] pl-8 mb-16 space-y-6">
          <div className="flex gap-6 text-[10px] font-black text-zinc-600 uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <Clock size={12}/> {frontmatter.date || "2024-02-09"}
            </span>
            <span className="flex items-center gap-2 text-pink-500">
              <Terminal size={12}/> ID: {frontmatter.id || slug}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-[0.9]">
            {frontmatter.title}
          </h1>
          
          <p className="text-zinc-500 text-sm italic border-t border-zinc-900 pt-4 uppercase">
            {frontmatter.preview}
          </p>
        </header>

        <div className="prose prose-invert prose-green max-w-none pb-32">
          <div className="whitespace-pre-wrap leading-relaxed text-zinc-400 text-lg">
            {content}
          </div>
        </div>

        <footer className="py-10 border-t border-zinc-900/50 text-[10px] text-zinc-800 uppercase italic flex justify-between">
          <span>Source: Secure_Node_v4</span>
          <span className="text-[#00ff41]/10">End of Transmission</span>
        </footer>
      </div>
    </article>
  );
}