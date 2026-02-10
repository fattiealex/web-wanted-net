export default function CodeLaboratory() {
  const experiments = [
    { id: "01", title: "MOTION_GLITCH_ENGINE", status: "STABLE", tech: "GSAP" },
    { id: "02", title: "NEURAL_INTERFACE_V3", status: "TESTING", tech: "THREE.JS" },
    { id: "03", title: "DATABASE_ENCRYPTION_LAYER", status: "STABLE", tech: "PRISMA" },
  ];

  return (
    <main className="min-h-screen bg-black pt-32 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-white text-6xl font-black italic tracking-tighter mb-4 uppercase">
          CODE_<span className="text-[#00ff41]">LABORATORY</span>
        </h1>
        <p className="text-zinc-500 mb-12 font-mono uppercase text-sm tracking-widest">
          // ACCESSING_EXPERIMENTAL_RESOURCES...
        </p>

        <div className="grid gap-6">
          {experiments.map((exp) => (
            <div key={exp.id} className="border border-zinc-800 p-6 bg-zinc-950/50 group hover:border-[#00ff41]/50 transition-all cursor-crosshair">
              <div className="flex justify-between items-center">
                <span className="text-[#00ff41] font-mono text-xs tracking-widest">EXP_{exp.id}</span>
                <span className="bg-[#00ff41]/10 text-[#00ff41] px-2 py-1 text-[10px] font-black">{exp.status}</span>
              </div>
              <h2 className="text-white text-2xl font-black mt-2 group-hover:text-[#00ff41] transition-colors italic">{exp.title}</h2>
              <div className="mt-4 text-[10px] text-zinc-600 font-mono tracking-widest uppercase">TECH_STACK: {exp.tech}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}