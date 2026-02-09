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
      <main className="container mx-auto px-4 py-8 md:py-12">
        
        {/* HERO SECTION */}
        <section className="mb-20 md:mb-32 border-b border-[#00ff41]/10 pb-12 md:pb-20">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6 md:space-y-8">
              <div className="text-[10px] md:text-xs text-pink-500 font-black animate-pulse tracking-[0.3em] md:tracking-[0.4em] uppercase flex items-center gap-2">
                <Activity size={14} /> $ INITIALIZING_WANTED_PROTOCOL_V3
              </div>
              
              {/* РЕШЕНИЕ ЗА ТЕКСТА: По-малък на мобилни (text-4xl), голям на десктоп (md:text-8xl) */}
              <h1 className="text-4xl sm:text-5xl md:text-8xl font-black leading-[0.9] tracking-tighter text-white uppercase italic">
                Engineering <br className="hidden sm:block"/> 
                The_<span className="text-[#00ff41]">Cyber</span>_Future
              </h1>

              <p className="text-zinc-500 text-xs md:text-base font-bold leading-relaxed max-w-xl uppercase">
                Ние не правим просто сайтове. Ние кодираме цифрови активи с висока възвръщаемост. 
                От Medusa Headless до ултра-бързи Next.js архитектури.
              </p>

              {/* БУТОНИ: На мобилни са един под друг (flex-col), на десктоп са един до друг (sm:flex-row) */}
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 pt-4">
                <Link href="/dev-projects" className="w-full sm:w-auto">
                  <button className="w-full bg-[#00ff41] text-black px-10 py-4 font-black text-sm hover:bg-white transition-all shadow-[4px_4px_0px_#003b00] md:shadow-[6px_6px_0px_#003b00] uppercase italic">
                    [ VIEW_PROJECTS ]
                  </button>
                </Link>
                <Link href="/speed-check" className="w-full sm:w-auto">
                  <button className="w-full border-2 border-zinc-800 text-zinc-400 px-10 py-4 font-black text-sm hover:border-[#00ff41] hover:text-[#00ff41] transition-all uppercase italic text-center">
                    Run_Diagnostics
                  </button>
                </Link>
              </div>
            </div>

            {/* ВИЗУАЛИЗАЦИЯ: На мобилни е по-ниска (h-[300px]) */}
            <div className="relative h-[250px] sm:h-[350px] md:h-[450px] border-2 border-[#00ff41]/20 bg-zinc-950 group overflow-hidden">
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
        <section className="mb-20 md:mb-32">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 md:mb-12 border-l-4 md:border-l-8 border-[#00ff41] bg-zinc-950 p-4 md:p-6 gap-4">
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-white italic">
              [ WANTED_INSIGHTS_DATABASE ]
            </h2>
            <Link href="/wanted-insights" className="text-[#00ff41] hover:underline text-[10px] font-black flex items-center gap-2 tracking-[0.2em] uppercase transition-all">
              Access_All_Intel <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <FeaturedCard
              title="Optimizing Medusa: Headless E-commerce"
              description="How we built Agkbeatz using Medusa and why headless is the future."
              image="https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=600&h=400&auto=format&fit=crop"
              date="09_FEB_2026"
              category="E-COMMERCE"
              icon={<Cpu className="h-4 w-4" />}
              slug="medusa-optimization"
            />
            {/* ... другите карти са същите ... */}
          </div>
        </section>

        {/* NEWSLETTER: По-компактен за мобилни */}
        <section id="newsletter" className="bg-zinc-950 border-2 border-dashed border-zinc-800 p-6 md:p-10 mb-20 md:mb-32 relative">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-black uppercase text-white tracking-tighter italic">Stay_Ahead_of_Curve</h2>
              <p className="text-zinc-500 text-xs md:text-sm font-bold uppercase leading-relaxed">
                Абонирай се за последните експерименти. Нулева реклама. Само данни.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="ENTER_EMAIL_ADDR..."
                className="bg-black border border-zinc-800 focus:border-[#00ff41] text-[#00ff41] px-6 py-4 outline-none text-xs md:text-sm font-bold uppercase tracking-widest transition-all"
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

      {/* FOOTER: Оптимизиран за мобилни линкове */}
      <footer className="border-t-2 border-[#00ff41]/10 py-12 md:py-16 bg-black relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-black px-4 -translate-y-1/2 text-[9px] md:text-[10px] text-zinc-700 font-black tracking-[0.3em] md:tracking-[0.5em] whitespace-nowrap">
          END_OF_TRANSMISSION
        </div>
        
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col gap-6 md:flex-row justify-center items-center md:gap-8 mb-12">
            <Link href="https://github.com/fattiealex" target="_blank" className="text-zinc-600 hover:text-[#00ff41] transition-all uppercase font-black text-[10px] tracking-widest flex items-center gap-2 group">
              <Github size={16} /> [ GITHUB ]
            </Link>
            <Link href="https://www.upwork.com/agencies/1974474615754880912/" target="_blank" className="text-zinc-600 hover:text-orange-500 transition-all uppercase font-black text-[10px] tracking-widest flex items-center gap-2 group">
              <span className="text-orange-500">$</span> [ UPWORK ]
            </Link>
            <Link href="mailto:contact@webwanted.net" className="text-zinc-600 hover:text-pink-500 transition-all uppercase font-black text-[10px] tracking-widest flex items-center gap-2 group">
              <span className="text-pink-500">@</span> [ EMAIL ]
            </Link>
          </div>

          <div className="space-y-4">
            <div className="text-zinc-800 text-[9px] md:text-[11px] font-black tracking-[0.2em] md:tracking-[0.4em] uppercase">
              © {new Date().getFullYear()} WEBWANTED.NET // AUTHENTIC_ASSET_LOG
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeaturedCard({ title, description, image, date, category, icon, slug = "" }: any) {
  return (
    <div className="bg-black border-2 border-zinc-900 hover:border-[#00ff41]/50 transition-all duration-500 group relative flex flex-col h-full">
      <div className="relative h-48 md:h-56 overflow-hidden border-b border-zinc-900">
        <Image src={image} alt={title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
        <div className="absolute top-4 left-4 bg-black border border-[#00ff41]/30 px-3 py-1 text-[9px] font-black text-[#00ff41] uppercase">
          {category}
        </div>
      </div>
      <div className="p-6 md:p-8 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-black text-pink-500 mb-4 tracking-widest uppercase">
          {icon} <span>LOG::{date}</span>
        </div>
        <h3 className="text-lg md:text-xl font-black text-white uppercase group-hover:text-[#00ff41] transition-colors italic mb-4">
          {title}
        </h3>
        <p className="text-zinc-500 text-[10px] md:text-xs font-bold leading-relaxed mb-6 md:mb-8 uppercase line-clamp-3">
          {description}
        </p>
        <Link href={`/wanted-insights/${slug}`} className="mt-auto text-[#00ff41] text-[10px] font-black hover:text-white transition-all tracking-[0.3em] uppercase block">
          [ ACCESS_DATA_LOGS ]
        </Link>
      </div>
    </div>
  )
}