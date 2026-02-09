"use client"

import React, { useState, useRef, type FormEvent } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BrainCircuit, Clock, Cpu, Eye, Github, Linkedin, Twitter, Terminal, Gauge } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function Home() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const newsletterRef = useRef<HTMLElement>(null)

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Successfully Subscribed!",
        description: "Thank you for joining the WebWanted newsletter.",
      })
      setEmail("")
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="container mx-auto px-4 py-12">
        {/* HERO SECTION */}
        <section className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Engineering the Future of <span className="text-purple-500">High-Performance Web</span>
              </h1>
              <p className="text-gray-400 text-lg md:text-xl">
                From Medusa Headless E-commerce to ultra-fast Next.js applications. Explore our code laboratory and optimization tools designed for the modern web.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Link href="/dev-projects">View Projects</Link>
                </Button>
                <Button variant="outline" className="border-gray-700 hover:bg-gray-900 bg-transparent">
                  <Link href="/speed-check">Test Performance</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden border border-gray-800 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?q=80&w=1200&h=800&auto=format&fit=crop"
                alt="Modern Web Development Visualization"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            </div>
          </div>
        </section>

        {/* INSIGHTS PREVIEW SECTION */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8 border-l-4 border-purple-500 pl-4">
            <h2 className="text-2xl font-bold uppercase tracking-wider">Wanted Insights Highlights</h2>
            <Link href="/wanted-insights" className="text-purple-500 hover:text-purple-400 text-sm flex items-center gap-2 transition-all">
              View All <Eye className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeaturedCard
              title="Optimizing Medusa: Headless E-commerce"
              description="How we built Agkbeatz using Medusa and why headless architecture is the future of online retail."
              image="https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=600&h=400&auto=format&fit=crop"
              date="February 2026"
              category="E-commerce"
              icon={<Cpu className="h-5 w-5" />}
              slug="medusa-optimization"
            />
            <FeaturedCard
              title="Next.js App Router: The Ultimate Guide"
              description="Why we migrated to the new App Router and how it fundamentally improves Core Web Vitals (LCP)."
              image="https://images.unsplash.com/photo-1614853316476-de00d14cb1fc?q=80&w=600&h=400&auto=format&fit=crop"
              date="January 2026"
              category="Next.js"
              icon={<BrainCircuit className="h-5 w-5" />}
              slug="nextjs-app-router"
            />
            <FeaturedCard
              title="Hacker Speed Test: Under the Hood"
              description="A deep dive into how we leverage the Google PageSpeed API to build our terminal diagnostic tool."
              image="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&h=400&auto=format&fit=crop"
              date="December 2025"
              category="Tools"
              icon={<Gauge className="h-5 w-5" />}
              slug="speed-test-api"
            />
          </div>
        </section>

        {/* NEWSLETTER SECTION */}
        <section ref={newsletterRef} id="newsletter" className="bg-zinc-950 border border-zinc-900 rounded-xl p-8 mb-20 shadow-inner">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Stay Ahead of the Curve</h2>
              <p className="text-gray-400">
                Subscribe to receive the latest tools, code laboratory experiments, and tutorials from WebWanted.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-black border-gray-800 focus-visible:ring-purple-500 text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 whitespace-nowrap text-white font-bold"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Join Newsletter"}
              </Button>
            </form>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-gray-900 py-12">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <div className="flex justify-center space-x-6 mb-6">
            <Link href="https://github.com" className="hover:text-purple-500 transition-colors"><Github /></Link>
            <Link href="#" className="hover:text-purple-500 transition-colors"><Linkedin /></Link>
            <Link href="#" className="hover:text-purple-500 transition-colors"><Twitter /></Link>
          </div>
          <p>© {new Date().getFullYear()} webwanted.net. All rights reserved.</p>
          <div className="mt-2 text-[10px] uppercase tracking-widest opacity-30 italic">
            Built for speed // Engineered for performance
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeaturedCard({ title, description, image, date, category, icon, slug = "" }: any) {
  return (
    <Card className="bg-zinc-950 border-zinc-900 overflow-hidden hover:border-purple-500/50 transition-all duration-300 group">
      <div className="relative h-48 overflow-hidden">
        <Image 
          src={image} 
          alt={title} 
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-500" 
        />
      </div>
      <CardHeader>
        <div className="flex items-center gap-2 text-xs font-bold text-purple-500 mb-2 uppercase tracking-tighter">
          {icon}
          <span>{category}</span>
        </div>
        <CardTitle className="text-xl text-white group-hover:text-purple-400 transition-colors">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-400 line-clamp-2">{description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between items-center text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>{date}</span>
        </div>
        <Link href={`/wanted-insights/${slug}`} className="text-purple-500 hover:text-white font-black transition-colors">
          READ ARTICLE →
        </Link>
      </CardFooter>
    </Card>
  )
}