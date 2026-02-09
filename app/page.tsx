"use client"

import React, { useState, useRef, type FormEvent } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BrainCircuit, Clock, Cpu, Eye, Github, Linkedin, Mail, Rss, Twitter, Terminal, Gauge } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function Home() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const newsletterRef = useRef<HTMLElement>(null)

  const scrollToNewsletter = () => {
    newsletterRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes("@")) {
      toast({
        title: "Грешен имейл",
        description: "Моля, въведете валиден имейл адрес.",
        variant: "destructive",
      })
      return
    }
    setIsSubmitting(true)
    setTimeout(() => {
      toast({
        title: "Абонаментът е успешен!",
        description: "Благодарим ви, че се записахме за нашия нюзлетър.",
      })
      setEmail("")
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HEADER-ЪТ Е ПРЕМАХНАТ - ВЕЧЕ Е В LAYOUT.TSX */}

      <main className="container mx-auto px-4 py-12">
        <section className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Engineering the Future of <span className="text-purple-500">High-Performance Web</span>
              </h1>
              <p className="text-gray-400 text-lg md:text-xl">
                От Medusa Headless E-commerce до свръхбързи Next.js приложения. Разгледайте нашия лабораторен код и инструменти за оптимизация.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Link href="/dev-projects">Виж Проектите</Link>
                </Button>
                <Button variant="outline" className="border-gray-700 hover:bg-gray-900 bg-transparent">
                  <Link href="/speed-check">Тествай Скорост</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden border border-gray-800">
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

        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Акценти от Wanted Insights</h2>
            <Link href="/wanted-insights" className="text-purple-500 hover:text-purple-400 text-sm flex items-center gap-2">
              Виж всички <Eye className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeaturedCard
              title="Оптимизация на Medusa: Headless E-commerce"
              description="Как изградихме Agkbeatz ползвайки Medusa и защо това е бъдещето на онлайн магазините."
              image="https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=600&h=400&auto=format&fit=crop"
              date="Февруари 2026"
              category="E-commerce"
              icon={<Cpu className="h-5 w-5" />}
              slug="medusa-optimization"
            />
            <FeaturedCard
              title="Next.js App Router: Пълно ръководство"
              description="Защо преминахме към новия App Router и как той променя скоростта на зареждане (LCP)."
              image="https://images.unsplash.com/photo-1614853316476-de00d14cb1fc?q=80&w=600&h=400&auto=format&fit=crop"
              date="Януари 2026"
              category="Next.js"
              icon={<BrainCircuit className="h-5 w-5" />}
              slug="nextjs-app-router"
            />
            <FeaturedCard
              title="Hacker Speed Test: Зад кулисите"
              description="Как използваме Google PageSpeed API, за да направим нашия терминал за диагностика."
              image="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&h=400&auto=format&fit=crop"
              date="Декември 2025"
              category="Tools"
              icon={<Gauge className="h-5 w-5" />}
              slug="speed-test-api"
            />
          </div>
        </section>

        <section ref={newsletterRef} id="newsletter" className="bg-gray-900 rounded-xl p-8 mb-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Бъди в крак с технологиите</h2>
              <p className="text-gray-400">
                Абонирай се за най-новите инструменти и уроци от WebWanted лабораторията.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="Твоят имейл"
                className="bg-black border-gray-800 focus-visible:ring-purple-500 text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 whitespace-nowrap text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Записване..." : "Абонирай се"}
              </Button>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-800 py-12">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
          <div className="flex justify-center space-x-6 mb-6">
            <Link href="https://github.com" className="hover:text-white"><Github /></Link>
            <Link href="#" className="hover:text-white"><Linkedin /></Link>
            <Link href="#" className="hover:text-white"><Twitter /></Link>
          </div>
          <p>© {new Date().getFullYear()} webwanted.net. Всички права запазени.</p>
        </div>
      </footer>
    </div>
  )
}

function FeaturedCard({ title, description, image, date, category, icon, slug = "" }: any) {
  return (
    <Card className="bg-gray-900 border-gray-800 overflow-hidden hover:border-purple-500/50 transition-colors">
      <div className="relative h-48">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <CardHeader>
        <div className="flex items-center gap-2 text-sm text-purple-500 mb-2">
          {icon}
          <span>{category}</span>
        </div>
        <CardTitle className="text-xl text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-400">{description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{date}</span>
        </div>
        <Link href={`/wanted-insights/${slug}`} className="text-purple-500 hover:text-purple-400 font-bold">
          Прочети →
        </Link>
      </CardFooter>
    </Card>
  )
}