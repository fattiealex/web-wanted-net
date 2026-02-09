import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { FileText, ChevronRight, Terminal, Search, Activity } from "lucide-react";

export default function WantedInsights() {
  // Пътят до папките - използваме process.cwd() за сигурност във Vercel
  const blogDirectory = path.join(process.cwd(), "content/blog");

  // Проверка и създаване на папката, ако липсва (предотвратява грешки при билд)
  if (!fs.existsSync(blogDirectory)) {
    console.warn("Directory not found, creating empty blog directory...");
    fs.mkdirSync(blogDirectory, { recursive: true });
  }

  const fileNames = fs.readdirSync(blogDirectory);

  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(blogDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        meta: data,
      };
    })
    // Сортиране по дата (от най-новите към най-старите)
    .sort((a, b) => (new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()));

  return (
    <div className="min-h-screen bg-[#050505] text-[#00ff41] font-mono p-4 md:p-12 selection:bg-[#00ff41] selection:text-black">
      <div className="max-w-6xl mx-auto">
        
        {/* TOP STATUS BAR */}
        <div className="flex justify-between items-center mb-4 px-2">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em]">
            <Activity size={12} className="animate-pulse" />
            Database_Status: <span className="text-white underline">Encrypted</span>
          </div>
          <div className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest italic">
            v2.0.48_stable
          </div>
        </div>

        <header className="border-2 border-[#00ff41]/20 bg-black p-8 md:p-12 mb-12 relative overflow-hidden group">
          {/* BACKGROUND GRID EFFECT */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-4 text-pink-500">
                <Terminal size={16} />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] italic">Accessing_Intel_Core...</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase italic leading-none">
                Wanted_<span className="text-[#00ff41]">Insights</span>
              </h1>
              <div className="flex items-center gap-4 mt-6">
                <p className="bg-[#00ff41] text-black text-[10px] font-black px-3 py-1 uppercase italic shadow-[0_0_15px_rgba(0,255,65,0.4)]">
                   Total_Logs: {allPosts.length} 
                </p>
                <p className="text-zinc-700 text-[10px] font-bold uppercase tracking-widest">Security_Level: Alpha</p>
              </div>
            </div>

            {/* SEARCH BOX */}
            <div className="w-full md:w-auto bg-zinc-950 border-b-2 border-zinc-800 focus-within:border-[#00ff41] px-6 py-4 flex items-center transition-all group/search">
               <Search size={16} className="text-zinc-800 group-focus-within/search:text-[#00ff41]" />
               <input 
                 className="bg-transparent border-none outline-none ml-4 text-xs uppercase text-[#00ff41] placeholder:text-zinc-800 w-full md:w-48 font-black tracking-widest italic" 
                 placeholder="SCAN_FOR_LOGS..." 
               />
            </div>
          </div>
        </header>

        {/* POSTS LIST */}
        <div className="space-y-3">
          {allPosts.map((post: any) => (
            <Link key={post.slug} href={`/wanted-insights/${post.slug}`} className="block group">
              <div className="grid grid-cols-1 md:grid-cols-12 items-center bg-zinc-950/30 border border-zinc-900 group-hover:border-[#00ff41]/50 p-8 transition-all relative overflow-hidden backdrop-blur-sm">
                
                {/* ID NUMBER */}
                <div className="col-span-1 text-zinc-900 font-black text-xl hidden md:block group-hover:text-pink-500/50 transition-colors italic">
                  #{post.meta.id || "00"}
                </div>

                {/* CONTENT */}
                <div className="col-span-1 md:col-span-8 space-y-2">
                  <h3 className="text-2xl font-black text-white group-hover:text-[#00ff41] uppercase italic flex items-center gap-4 transition-all tracking-tighter">
                    <div className="h-1.5 w-1.5 bg-[#00ff41] rounded-full opacity-0 group-hover:opacity-100 animate-pulse" />
                    {post.meta.title}
                  </h3>
                  <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest group-hover:text-zinc-300 transition-colors">
                    {post.meta.preview || "No preview available for this encrypted data log."}
                  </p>
                </div>

                {/* DATE */}
                <div className="col-span-2 text-right text-[10px] text-zinc-800 font-black hidden md:block uppercase tracking-widest group-hover:text-zinc-400">
                  {post.meta.date}
                </div>

                {/* ARROW */}
                <div className="col-span-1 flex justify-end">
                  <ChevronRight size={24} className="text-zinc-900 group-hover:text-[#00ff41] group-hover:translate-x-2 transition-all" />
                </div>

                {/* HOVER ACCENT */}
                <div className="absolute left-0 top-0 h-full w-1 bg-[#00ff41] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center shadow-[0_0_15px_#00ff41]"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}