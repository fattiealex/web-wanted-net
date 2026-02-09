import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { FileText, ChevronRight, Terminal, Search } from "lucide-react";

export default function WantedInsights() {
  const blogDirectory = path.join(process.cwd(), "content/blog");

  if (!fs.existsSync(blogDirectory)) {
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
    .sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1));

  return (
    <div className="min-h-screen bg-[#050505] text-[#00ff41] font-mono p-4 md:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="border-2 border-[#00ff41]/20 bg-black p-10 mb-12 relative">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2 text-pink-500 animate-pulse">
                <Terminal size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest italic">Connection: Secure</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase italic leading-none">
                Wanted_<span className="text-[#00ff41]">Insights</span>
              </h1>
              <p className="text-zinc-600 text-[10px] font-bold mt-4 uppercase tracking-[0.3em]">
                [ TOTAL_FILES_FOUND: {allPosts.length} ]
              </p>
            </div>
            <div className="bg-zinc-950 border border-zinc-900 px-4 py-3 flex items-center">
               <Search size={14} className="text-zinc-700" />
               <input className="bg-transparent border-none outline-none ml-3 text-xs uppercase text-[#00ff41] w-40" placeholder="SEARCH_LOGS..." />
            </div>
          </div>
        </header>

        <div className="space-y-2">
          {allPosts.map((post: any) => (
            <Link key={post.slug} href={`/wanted-insights/${post.slug}`} className="block group">
              <div className="grid grid-cols-1 md:grid-cols-12 items-center bg-zinc-950/50 border border-zinc-900 group-hover:border-[#00ff41]/40 p-6 transition-all relative overflow-hidden">
                <div className="col-span-1 text-zinc-800 font-black text-xs hidden md:block group-hover:text-pink-500">#{post.meta.id || "00"}</div>
                <div className="col-span-1 md:col-span-8">
                  <h3 className="text-lg font-black text-white group-hover:text-[#00ff41] uppercase italic flex items-center gap-3 transition-colors">
                    <FileText size={16} /> {post.meta.title}
                  </h3>
                  <p className="text-[10px] text-zinc-600 uppercase font-bold">{post.meta.preview}</p>
                </div>
                <div className="col-span-2 text-right text-[11px] text-zinc-700 font-black hidden md:block">{post.meta.date}</div>
                <div className="col-span-1 flex justify-end">
                  <ChevronRight size={20} className="text-zinc-900 group-hover:text-[#00ff41]" />
                </div>
                <div className="absolute left-0 top-0 h-full w-1 bg-[#00ff41] scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}