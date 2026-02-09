"use client"

import React, { useState, type FormEvent } from "react"
import Link from "next/link"
import Image from "next/image"
import { BrainCircuit, Cpu, Github, Terminal, Gauge, ChevronRight, Activity } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function Home() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes("@")) {
      toast({
        title: "[ ERROR_INVALID_EMAIL ]",
        description: "SYSTEM_MESS: PLEASE ENTER A VALID TARGET ADDRESS.",
        variant: "destructive",
      })
      return
    }
    setIsSubmitting(true)
    setTimeout(() => {
      toast({
        title: "[ ACCESS_GRANTED ]",
        description: "YOU HAVE BEEN ADDED TO THE PERSISTENT NOTIFICATION LOG.",
      })
      setEmail("")
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-black text-[#00ff41] font-mono selection:bg-[#00ff41] selection:text-black">
      <main className="container mx-auto px-4 py-6 md:py-12">
        
        {/* HERO SECTION */}
        <section className="mb-16 md:mb-32 border-b border-[#00ff41]/10 pb-12 md:pb-20">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 lg:order-1 space-y-6 md:space-y-8">
              <div className="text-[9px] md:text-xs text-pink-500 font-black animate-pulse tracking-[0.3em] md:tracking-[0.4em] uppercase flex items-center gap-2">
                <Activity size={14} /> $ INITIALIZING_WANTED_PROTOCOL_V3
              </div>
              
              <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[0.85] tracking-tighter text-white uppercase italic">
                Engineering <br className="hidden sm:block"/> 
                The_<span className="text-[#00ff41]">Cyber</span>_Future
              </h1>

              <p className="text-zinc-500 text-[10px] md:text-base font-bold leading-relaxed max-w-xl uppercase border-l-2 border-[#00ff41]/20 pl-4">
                We don&apos;t just build websites. We code high-yield digital assets. 
                From Medusa Headless ecosystems to ultra-fast Next.js architectures.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link href="/dev-projects" className="w-full sm:w-auto">
                  <button className="w-full bg-[#00ff41] text-black px-8 py-4 font-black text-xs md:text-sm hover:bg-white transition-all shadow-[4px_4px_0px_#003b00] uppercase italic">
                    [ VIEW_PROJECTS ]
                  </button>
                </Link>
                <Link href="/speed-check" className="w-full sm:w-auto">
                  <button className="w-full border-2 border-zinc-800 text-zinc-400 px-8 py-4 font-black text-xs md:text-sm hover:border-[#00ff41] hover:text-[#00ff41] transition-all uppercase italic text-center">
                    Run_Diagnostics
                  </button>
                </Link>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative h-[200px] sm:h-[300px] md:h-[450px] border-2 border-[#00ff41]/20 bg-zinc-950 group overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?q=80&w=1200&h=800&auto=format&fit=crop"
                alt="Visualization"
                fill
                priority
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 opacity-40 group-hover:opacity-100"
              />
              <div className="absolute bottom-4 right-4 bg-black/80 border border-[#00ff41]/30 p-2 text-[8px] md:text-[10px] text-white">
                <Terminal size={10} className="inline mr-2 text-[#00ff41]"/> SYSTEM_VISUAL_01.JPG
              </div>
            </div>
          </div>
        </section>

        {/* INSIGHTS PREVIEW */}
        <section className="mb-16 md:mb-32">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 md:mb-12 border-l-4 border-[#00ff41] bg-zinc-950/50 p-4 md:p-6 gap-4">
            <h2 className="text-lg md:text-2xl font-black uppercase tracking-tighter text-white italic">
              [ WANTED_INSIGHTS_DATABASE ]
            </h2>
            <Link href="/wanted-insights" className="text-[#00ff41] hover:text-white text-[9px] font-black flex items-center gap-2 tracking-[0.2em] uppercase transition-all">
              Access_All_Intel <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <FeaturedCard
              title="Optimizing Medusa: Headless E-commerce"
              description="How we built Agkbeatz using Medusa and why headless is the future of retail."
              image="https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=600&h=400&auto=format&fit=crop"
              date="09_FEB_2026"
              category="E-COMMERCE"
              icon={<Cpu className="h-4 w-4" />}
              slug="medusa-optimization"
            />
             <FeaturedCard
              title="Next.js App Router: Performance Guide"
              description="Migrating to the App Router for superior Core Web Vitals and LCP scores."
              image="https://images.unsplash.com/photo-1614853316476-de00d14cb1fc?q=80&w=600&h=400&auto=format&fit=crop"
              date="24_JAN_2026"
              category="PERFORMANCE"
              icon={<BrainCircuit className="h-4 w-4" />}
              slug="nextjs-performance"
            />
             <FeaturedCard
              title="Diagnostic Tooling with PageSpeed"
              description="Building automated speed checks using Google's Lighthouse API."
              image="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&h=400&auto=format&fit=crop"
              date="12_DEC_2025"
              category="SYSTEM"
              icon={<Gauge className="h-4 w-4" />}
              slug="diagnostic-tools"
            />
          </div>
        </section>

        {/* NEWSLETTER */}
        <section id="newsletter" className="bg-zinc-950 border-2 border-dashed border-zinc-800 p-6 md:p-10 mb-16 md:mb-32 relative">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-xl md:text-3xl font-black uppercase text-white tracking-tighter italic">Stay_Ahead_of_Curve</h2>
              <p className="text-zinc-500 text-[10px] md:text-sm font-bold uppercase leading-relaxed">
                Subscribe for the latest experiments. No ads. Just raw data.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="ENTER_EMAIL_ADDR..."
                className="bg-black border border-zinc-800 focus:border-[#00ff41] text-[#00ff41] px-4 py-4 outline-none text-[10px] md:text-sm font-bold uppercase tracking-widest transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-zinc-900 border border-[#00ff41]/50 text-[#00ff41] px-6 py-4 font-black text-[10px] hover:bg-[#00ff41] hover:text-black transition-all uppercase italic"
                disabled={isSubmitting}
              >
                {isSubmitting ? "PROCESSING..." : "[ JOIN_NETWORK ]"}
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t-2 border-[#00ff41]/10 py-12 md:py-16 bg-black relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-black px-4 -translate-y-1/2 text-[8px] md:text-[10px] text-zinc-700 font-black tracking-[0.3em] uppercase">
          END_OF_TRANSMISSION
        </div>
        
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8 mb-12">
            <Link href="https://github.com/fattiealex" target="_blank" className="text-zinc-600 hover:text-[#00ff41] transition-all uppercase font-black text-[10px] tracking-widest flex items-center gap-2">
              <Github size={14} /> [ GITHUB ]
            </Link>
            <Link href="https://upwork.com" target="_blank" className="text-zinc-600 hover:text-orange-500 transition-all uppercase font-black text-[10px] tracking-widest flex items-center gap-2">
               [ UPWORK ]
            </Link>
            <Link href="mailto:contact@webwanted.net" className="text-zinc-600 hover:text-pink-500 transition-all uppercase font-black text-[10px] tracking-widest flex items-center gap-2">
               [ EMAIL ]
            </Link>
          </div>
          <div className="text-zinc-800 text-[8px] md:text-[10px] font-black tracking-[0.2em] uppercase">
             © {new Date().getFullYear()} WEBWANTED.NET // AUTHENTIC_ASSET_LOG
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeaturedCard({ title, description, image, date, category, icon, slug }: any) {
  return (
    <div className="bg-black border-2 border-zinc-900 hover:border-[#00ff41]/50 transition-all duration-500 group relative flex flex-col h-full">
      <div className="relative h-40 md:h-52 overflow-hidden border-b border-zinc-900">
        <Image src={image} alt={title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
      </div>
      <div className="p-5 md:p-8 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-[8px] md:text-[9px] font-black text-pink-500 mb-3 tracking-widest uppercase">
          {icon} <span>LOG::{date}</span>
        </div>
        <h3 className="text-base md:text-xl font-black text-white uppercase group-hover:text-[#00ff41] transition-colors italic mb-3">
          {title}
        </h3>
        <p className="text-zinc-500 text-[9px] md:text-xs font-bold leading-relaxed mb-6 uppercase line-clamp-2">
          {description}
        </p>
        <Link href={`/wanted-insights/${slug}`} className="mt-auto text-[#00ff41] text-[9px] font-black hover:text-white transition-all tracking-[0.2em] uppercase block">
          [ ACCESS_DATA_LOGS ]
        </Link>
      </div>
    </div>
  )
}