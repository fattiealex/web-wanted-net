"use client"

import React from "react"
import Link from "next/link"
import { Home, Zap, ArrowUpRight, Terminal, Database, Activity, Layout } from "lucide-react"

export default function DevProjects() {
  return (
    <div className="min-h-screen bg-black text-[#00ff41] font-mono selection:bg-[#00ff41] selection:text-black pt-32 pb-20 px-6">
      <main className="max-w-6xl mx-auto">
        
        {/* PAGE HEADER */}
        <div className="mb-20 border-l-4 border-[#00ff41] pl-8">
          <h1 className="text-5xl md:text-8xl font-[900] italic text-white uppercase tracking-tighter leading-none">
            DEV_<span className="text-[#00ff41]">ARCHIVE</span>
          </h1>
          <p className="text-zinc-500 text-xs md:text-sm mt-4 font-bold uppercase tracking-[0.2em]">
            // ACTIVE_PROJECT_LOGS // SYSTEM_ARCHITECTURE_V3
          </p>
        </div>

        <div className="grid gap-12">
          
          {/* PROJECT 01: REAL ESTATE VALUATION ENGINE */}
          <section className="group relative bg-zinc-950/40 border border-zinc-900 p-8 md:p-12 hover:border-[#00ff41]/40 transition-all duration-500">
            <div className="absolute -top-3 left-10 bg-black px-3 py-1 text-[9px] text-[#00ff41] font-black border border-[#00ff41]/20">
              PROJECT_ID: 001
            </div>

            <div className="grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-zinc-900 rounded-sm">
                    <Home className="text-white" size={24} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-[1000] italic text-white uppercase tracking-tighter">
                      SOFIA_VALUATION_LAB
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[9px] bg-[#00ff41]/10 text-[#00ff41] px-2 py-0.5 font-black uppercase">
                        MARKET_COMPARISON_ENGINE
                      </span>
                      <span className="text-[9px] text-zinc-600 font-black uppercase tracking-widest">
                        // Real_Estate_Intelligence
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-zinc-400 text-sm font-bold leading-relaxed uppercase">
                  A proprietary valuation algorithm engineered for the real estate market. 
                  It utilizes a <span className="text-white">Comparative Analysis Framework</span> to calculate asset value by processing 
                  real-time market analogues. The system automatically adjusts for floor levels, 
                  construction materials, and location-specific demand vectors.
                </p>

                <div className="flex flex-wrap gap-3">
                  <TechBadge text="Next.js 14" />
                  <TechBadge text="TypeScript" />
                  <TechBadge text="Market_Logic_V2" />
                  <TechBadge text="PostgreSQL" />
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between border-l border-zinc-900 pl-10">
                <div className="space-y-4">
                  <StatusLine label="METHODOLOGY" value="Market_Comparative_Analysis" />
                  <StatusLine label="CALC_LATENCY" value="Sub-Second" />
                  <StatusLine label="DATA_ACCURACY" value="HIGH_PRECISION" color="text-[#00ff41]" />
                  <StatusLine label="STATUS" value="LIVE_PRODUCTION" color="text-pink-500" />
                </div>

                <Link href="https://sofia-property-valuation.vercel.app" target="_blank">
                  <button className="w-full mt-8 bg-white text-black py-4 font-black uppercase italic text-sm hover:bg-[#00ff41] transition-all flex items-center justify-center gap-2 shadow-[4px_4px_0px_#111]">
                    EXECUTE_ANALYSIS <ArrowUpRight size={18} />
                  </button>
                </Link>
              </div>
            </div>
          </section>

          {/* PROJECT 02: E-COMMERCE CORE */}
          <section className="group relative bg-zinc-950/40 border border-zinc-900 p-8 md:p-12 hover:border-[#00ff41]/40 transition-all duration-500">
            <div className="absolute -top-3 left-10 bg-black px-3 py-1 text-[9px] text-[#00ff41] font-black border border-[#00ff41]/20">
              PROJECT_ID: 002
            </div>

            <div className="grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-zinc-900 rounded-sm">
                    <Zap className="text-white" size={24} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-[1000] italic text-white uppercase tracking-tighter">
                      AGK_COMMERCE_CORE
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[9px] bg-pink-500/10 text-pink-500 px-2 py-0.5 font-black uppercase">
                        Headless_Ecosystem
                      </span>
                      <span className="text-[9px] text-zinc-600 font-black uppercase tracking-widest">
                        // Digital_Assets_Market
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-zinc-400 text-sm font-bold leading-relaxed uppercase">
                  Enterprise-grade headless commerce infrastructure designed for high-velocity digital sales. 
                  Leveraging <span className="text-white">MedusaJS</span> for modular business logic and 
                  secure transaction processing. Engineered for 100% customizable checkout experiences.
                </p>

                <div className="flex flex-wrap gap-3">
                  <TechBadge text="MedusaJS" />
                  <TechBadge text="TailwindCSS" />
                  <TechBadge text="Redis" />
                  <TechBadge text="Stripe_Secure" />
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between border-l border-zinc-900 pl-10">
                <div className="space-y-4">
                  <StatusLine label="ARCHITECTURE" value="Modular Headless" />
                  <StatusLine label="PAYMENT_GW" value="Stripe_API" />
                  <StatusLine label="SCALABILITY" value="Enterprise_Ready" />
                  <StatusLine label="STATUS" value="DEVELOPMENT" color="text-yellow-500" />
                </div>

                <button disabled className="w-full mt-8 border-2 border-zinc-800 text-zinc-600 py-4 font-black uppercase italic text-sm cursor-not-allowed">
                  [ ACCESS_RESTRICTED ]
                </button>
              </div>
            </div>
          </section>

        </div>

        {/* FOOTER INFO */}
        <div className="mt-24 text-center border-t border-zinc-900 pt-10">
          <div className="flex justify-center gap-8 mb-6 opacity-30">
             <div className="flex items-center gap-2"><Database size={12}/> DATA_INTEGRITY</div>
             <div className="flex items-center gap-2"><Terminal size={12}/> SECURE_SHELL</div>
             <div className="flex items-center gap-2"><Layout size={12}/> UX_OPTIMIZED</div>
          </div>
          <p className="text-[9px] text-zinc-800 font-[1000] tracking-[0.5em] uppercase">
             Authenticated Log // WebWanted Project Database
          </p>
        </div>
      </main>
    </div>
  )
}

function TechBadge({ text }: { text: string }) {
  return (
    <span className="text-[10px] font-black text-zinc-500 border border-zinc-800 px-3 py-1 hover:border-[#00ff41] hover:text-[#00ff41] transition-colors uppercase">
      {text}
    </span>
  )
}

function StatusLine({ label, value, color = "text-zinc-400" }: { label: string, value: string, color?: string }) {
  return (
    <div className="flex justify-between items-center text-[10px] font-black tracking-widest uppercase italic">
      <span className="text-zinc-700">{label}:</span>
      <span className={color}>{value}</span>
    </div>
  )
}