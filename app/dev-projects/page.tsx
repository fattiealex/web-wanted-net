import { ExternalLink, Terminal, Cpu, Home, ArrowUpRight, Zap } from "lucide-react";

export default function DevProjects() {
  const projects = [
    {
      id: "01",
      title: "SOFIA_VALUATION_LAB",
      status: "LIVE",
      description: "Smart valuation engine for the real estate market. High-precision calculation logic transformed from a legacy WordPress monolith into a high-performance Next.js application.",
      tech: ["Next.js 14", "TypeScript", "Tailwind CSS"],
      link: "https://sofia-property-valuation.vercel.app/",
      architecture: "Client-Side Hydration // Calculation Engine v1.0.4",
      icon: <Home size={20} className="text-[#00ff41]" />
    },
    {
      id: "02",
      title: "AGK_COMMERCE_CORE",
      status: "BUILDING",
      description: "Headless E-commerce infrastructure for digital audio assets. Leveraging MedusaJS for scalable inventory management and secure automated distribution.",
      tech: ["MedusaJS", "PostgreSQL", "Stripe API"],
      link: "#",
      architecture: "Headless Backend // REST API Integration",
      icon: <Zap size={20} className="text-[#00ff41]" />
    }
  ];

  return (
    <main className="min-h-screen bg-black pt-32 pb-20 px-6 font-mono text-white">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="mb-20 border-l-2 border-[#00ff41] pl-6 py-2">
          <h1 className="text-6xl font-[900] italic tracking-tighter uppercase leading-none">
            DEV_<span className="text-[#00ff41]">ARCHIVE</span>
          </h1>
          <p className="text-zinc-600 text-[10px] tracking-[0.4em] mt-2 uppercase font-bold">
            // SYSTEM_RECORDS // ACCESS_LEVEL_01
          </p>
        </div>

        {/* PROJECTS LIST */}
        <div className="grid gap-20">
          {projects.map((p) => (
            <div key={p.id} className="group relative">
              <div className="grid md:grid-cols-[1fr_350px] gap-12 border-b border-zinc-900 pb-16">
                
                {/* INFO SIDE */}
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-2 bg-[#00ff41]/5 border border-[#00ff41]/20">
                      {p.icon}
                    </div>
                    <h2 className="text-4xl font-[900] italic uppercase group-hover:text-[#00ff41] transition-colors tracking-tight">
                      {p.title}
                    </h2>
                  </div>
                  
                  <p className="text-zinc-400 text-lg mb-8 italic leading-relaxed max-w-2xl">
                    {p.description}
                  </p>

                  <div className="flex gap-4">
                    <a 
                      href={p.link} 
                      target="_blank" 
                      className="group/link flex items-center gap-2 bg-[#00ff41] text-black px-6 py-3 font-black text-xs hover:bg-white transition-all uppercase italic"
                    >
                      EXECUTE_LINK <ArrowUpRight size={16} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </div>

                {/* TECH SIDE */}
                <div className="bg-zinc-950/50 border border-zinc-900 p-6 font-mono relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 opacity-10">
                    <Terminal size={40} className="text-[#00ff41]" />
                  </div>
                  
                  <div className="space-y-6 relative z-10">
                    <div>
                      <span className="text-[9px] text-zinc-600 uppercase tracking-widest block mb-2">Build_Stack</span>
                      <div className="flex flex-wrap gap-2">
                        {p.tech.map(t => (
                          <span key={t} className="text-[10px] text-[#00ff41] bg-[#00ff41]/5 px-2 py-1 border border-[#00ff41]/10">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-zinc-900">
                      <span className="text-[9px] text-zinc-600 uppercase tracking-widest block mb-2">Architecture_Log</span>
                      <p className="text-[11px] text-zinc-500 italic leading-snug font-bold">
                        {`> ${p.architecture}`}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${p.status === 'LIVE' ? 'bg-[#00ff41] animate-pulse' : 'bg-orange-500 opacity-50'}`} />
                      <span className="text-[10px] text-zinc-400 font-bold tracking-widest uppercase">Status: {p.status}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}