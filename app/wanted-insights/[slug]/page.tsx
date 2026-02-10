import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Terminal, ChevronLeft, Clock } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
// 1. Добавяме импорта на компонента
import ReadingProgressBar from "@/components/ReadingProgressBar";

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const postPath = path.join(process.cwd(), "content/blog", `${slug}.mdx`);

  // Проверка дали файлът съществува
  if (!fs.existsSync(postPath)) {
    return notFound();
  }

  const fileContent = fs.readFileSync(postPath, "utf8");
  const { data, content } = matter(fileContent);

  return (
    <>
      {/* 2. Поставяме лентата най-отгоре, за да следи целия документ */}
      <ReadingProgressBar />

      <article className="min-h-screen bg-black text-white font-mono selection:bg-[#00ff41] selection:text-black pb-20">
        <header className="border-b border-[#00ff41]/20 py-12 md:py-20 bg-zinc-950/50">
          <div className="container mx-auto px-4">
            <Link href="/wanted-insights" className="text-[#00ff41] text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 mb-8 hover:underline">
              <ChevronLeft size={14} /> [ BACK_TO_DATABASE ]
            </Link>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-pink-500 text-[10px] font-black tracking-widest uppercase">
                <span className="bg-pink-500/10 px-2 py-1 border border-pink-500/20">{data.category || "INTEL"}</span>
                <span className="flex items-center gap-2"><Clock size={12}/> {data.date}</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-black uppercase italic leading-[0.9] tracking-tighter">
                {data.title}
              </h1>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-invert prose-green max-w-none prose-p:text-zinc-400 prose-p:uppercase prose-p:text-xs prose-p:font-bold prose-headings:italic prose-headings:tracking-tighter prose-headings:uppercase">
              <div className="whitespace-pre-wrap leading-relaxed">
                {content}
              </div>
            </div>
            
            <div className="mt-20 pt-10 border-t border-zinc-900">
              <div className="text-[10px] text-zinc-600 uppercase tracking-[0.5em]">
                EOF_DATA_TRANSMISSION // {slug}_LOG
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}