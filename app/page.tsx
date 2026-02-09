"use client"

import React, { useState, type FormEvent } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BrainCircuit, Clock, Cpu, Eye, Github, Terminal, Gauge, ChevronRight } from "lucide-react"
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
      <main className="container mx-auto px-4 py-12">
        
        {/* HERO SECTION */}
        <section className="mb-32 border-b border-[#00ff41]/10 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="text-xs text-pink-500 font-black animate-pulse tracking-[0.4em] uppercase">
                $ INITIALIZING_WANTED_PROTOCOL_V3
              </div>
              <h1 className="text-5xl md:text-8xl font-black leading-none tracking-tighter text-white uppercase italic">
                Engineering <br/> 
                The_<span className="text-[#00ff41]">Cyber</span>_Future
              </h1>
              <p className="text-zinc-500 text-sm md:text-base font-bold leading-relaxed max-w-xl uppercase">
                Ние не правим просто сайтове. Ние кодираме цифрови активи с висока възвръщаемост. 
                От Medusa Headless до ултра-бързи Next.js архитектури.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <Link href="/dev-projects">
                  <button className="bg-[#00ff41] text-black px-10 py-4 font-black text-sm hover:bg-white transition-all shadow-[6px_6px_0px_#003b00] uppercase italic">
                    [ VIEW_PROJECTS ]
                  </button>
                </Link>
                <Link href="/speed-check">
                  <button className="border-2 border-zinc-800 text-zinc-400 px-10 py-4 font-black text-sm hover:border-[#00ff41] hover:text-[#00ff41] transition-all uppercase italic">
                    Run_Diagnostics
                  </button>
                </Link>
              </div>
            </div>
            <div className="relative h-[450px] border-2 border-[#00ff41]/20 bg-zinc-950 group">
              <Image
                src="https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?q=80&w=1200&h=800&auto=format&fit=crop"
                alt="Visualization"
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 opacity-50 group-hover:opacity-100"
              />
              <div className="absolute top-4 left-4 bg-black/80 border border-[#00ff41]/30 p-2 text-[10px] text-white">
                <Terminal size={12} className="inline mr-2 text-[#00ff41]"/> SYSTEM_VISUAL_01.JPG
              </div>
            </div>
          </div>
        </section>

        {/* INSIGHTS PREVIEW */}
        <section className="mb-32">
          <div className="flex items-center justify-between mb-12 border-l-8 border-[#00ff41] bg-zinc-950 p-6">
            <h2 className="text-2xl font-black uppercase tracking-tighter text-white italic">
              [ WANTED_INSIGHTS_DATABASE ]
            </h2>
            <Link href="/wanted-insights" className="text-[#00ff41] hover:underline text-[10px] font-black flex items-center gap-2 tracking-[0.2em] uppercase transition-all">
              Access_All_Intel <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeaturedCard
              title="Optimizing Medusa: Headless E-commerce"
              description="How we built Agkbeatz using Medusa and why headless is the future."
              image="https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=600&h=400&auto=format&fit=crop"
              date="09_FEB_2026"
              category="E-COMMERCE"
              icon={<Cpu className="h-4 w-4" />}
              slug="medusa-optimization"
            />
            <FeaturedCard
              title="Next.js App Router: The Ultimate Guide"
              description="Migrating to the new App Router for superior Core Web Vitals (LCP)."
              image="https://images.unsplash.com/photo-1614853316476-de00d14cb1fc?q=80&w=600&h=400&auto=format&fit=crop"
              date="24_JAN_2026"
              category="NEXT.JS"
              icon={<BrainCircuit className="h-4 w-4" />}
              slug="nextjs-app-router"
            />
            <FeaturedCard
              title="Hacker Speed Test: Under the Hood"
              description="Leveraging Google PageSpeed API to build our terminal diagnostic tool."
              image="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&h=400&auto=format&fit=crop"
              date="12_DEC_2025"
              category="TOOLS"
              icon={<Gauge className="h-4 w-4" />}
              slug="speed-test-api"
            />
          </div>
        </section>

        {/* NEWSLETTER */}
        <section id="newsletter" className="bg-zinc-950 border-2 border-dashed border-zinc-800 p-10 mb-32 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-black uppercase text-white tracking-tighter italic">Stay_Ahead_of_Curve</h2>
              <p className="text-zinc-500 text-sm font-bold uppercase leading-relaxed">
                Абонирай се за последните експерименти. Нулева реклама. Само данни.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="ENTER_EMAIL_ADDR..."
                className="flex-1 bg-black border border-zinc-800 focus:border-[#00ff41] text-[#00ff41] px-6 py-4 outline-none text-sm font-bold uppercase tracking-widest transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-zinc-900 border border-[#00ff41]/50 text-[#00ff41] px-8 py-4 font-black text-xs hover:bg-[#00ff41] hover:text-black transition-all uppercase italic"
                disabled={isSubmitting}
              >
                {isSubmitting ? "PROCESSING..." : "[ JOIN_NETWORK ]"}
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* FOOTER - ЕТО ТУК Е ПРОМЯНАТА */}
      <footer className="border-t-2 border-[#00ff41]/10 py-16 bg-black relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-black px-4 -translate-y-1/2 text-[10px] text-zinc-700 font-black tracking-[0.5em]">
          END_OF_TRANSMISSION
        </div>
        
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-12">
            <Link 
              href="https://github.com/fattiealex" 
              target="_blank"
              className="text-zinc-600 hover:text-[#00ff41] transition-all uppercase font-black text-[11px] tracking-widest flex items-center gap-2 group"
            >
              <Github size={16} className="group-hover:rotate-12 transition-transform" /> 
              [ GITHUB_REPOSITORY ]
            </Link>

            <Link 
              href="https://www.upwork.com/agencies/1974474615754880912/" 
              target="_blank"
              className="text-zinc-600 hover:text-orange-500 transition-all uppercase font-black text-[11px] tracking-widest flex items-center gap-2 group"
            >
              <span className="text-orange-500 font-bold">$</span> 
              [ UPWORK_AGENCY_PORTAL ]
            </Link>

            <Link 
              href="mailto:contact@webwanted.net" 
              className="text-zinc-600 hover:text-pink-500 transition-all uppercase font-black text-[11px] tracking-widest flex items-center gap-2 group"
            >
              <span className="text-pink-500 italic">@</span> 
              [ ESTABLISH_COMM_LINK ]
            </Link>
          </div>

          <div className="space-y-4">
            <div className="text-zinc-800 text-[11px] font-black tracking-[0.4em] uppercase">
              © {new Date().getFullYear()} WEBWANTED.NET // AUTHENTIC_ASSET_LOG
            </div>
            <div className="text-[9px] uppercase tracking-[0.3em] text-[#00ff41]/40 font-black">
                contact@webwanted.net
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeaturedCard({ title, description, image, date, category, icon, slug = "" }: any) {
  return (
    <div className="bg-black border-2 border-zinc-900 hover:border-[#00ff41]/50 transition-all duration-500 group relative">
      <div className="relative h-56 overflow-hidden border-b border-zinc-900">
        <Image src={image} alt={title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
        <div className="absolute top-4 left-4 bg-black border border-[#00ff41]/30 px-3 py-1 text-[9px] font-black text-[#00ff41] uppercase">
          {category}
        </div>
      </div>
      <div className="p-8">
        <div className="flex items-center gap-2 text-[10px] font-black text-pink-500 mb-4 tracking-widest uppercase">
          {icon} <span>LOG::{date}</span>
        </div>
        <h3 className="text-xl font-black text-white uppercase group-hover:text-[#00ff41] transition-colors italic mb-4">
          {title}
        </h3>
        <p className="text-zinc-500 text-xs font-bold leading-relaxed mb-8 uppercase line-clamp-2">
          {description}
        </p>
        <Link href={`/wanted-insights/${slug}`} className="text-[#00ff41] text-[10px] font-black hover:text-white transition-all tracking-[0.3em] uppercase block">
          [ ACCESS_DATA_LOGS ]
        </Link>
      </div>
    </div>
  )
}