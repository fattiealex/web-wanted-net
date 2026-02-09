"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, BrainCircuit, Clock, Share2, Twitter, Facebook, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useEffect } from "react"

// This is a static mapping of blog posts for GitHub Pages
const blogPosts: Record<string, any> = {
  "evolution-of-gans": {
    title: "The Evolution of Generative Adversarial Networks: From GAN to StyleGAN-3",
    date: "May 15, 2023",
    author: "Dr. Alex Chen",
    category: "GenAI",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?q=80&w=2000&h=1000&auto=format&fit=crop",
    content: `
      <p>Generative Adversarial Networks (GANs) have revolutionized the field of artificial intelligence since their introduction by Ian Goodfellow and his colleagues in 2014.</p>
      <h2>The Original GAN</h2>
      <p>The original GAN architecture introduced a novel approach to generative modeling...</p>
    `,
    relatedPosts: [
      {
        title: "The Rise of Multimodal AI Models: Bridging Text, Image, and Beyond",
        category: "AI Research",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&h=400&auto=format&fit=crop",
        slug: "multimodal-ai-models",
      },
    ],
  },
  "multimodal-ai-models": {
    title: "The Rise of Multimodal AI Models: Bridging Text, Image, and Beyond",
    date: "February 5, 2024",
    author: "Dr. Michael Zhang",
    category: "AI Research",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&h=1000&auto=format&fit=crop",
    content: `<p>Artificial intelligence has undergone a remarkable evolution...</p>`,
    relatedPosts: [],
  },
  "ai-in-2025": {
    title: "AI in 2025: Transforming Daily Life",
    date: "October 18, 2023",
    author: "Dr. Sarah Johnson",
    category: "Future Tech",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=2000&h=1000&auto=format&fit=crop",
    content: `<p>As we approach 2025...</p>`,
    relatedPosts: [],
  }
  // Добави тук и останалите си статии от оригиналния файл...
}

// --- ТОВА Е КЛЮЧОВАТА ЧАСТ, КОЯТО ОПРАВЯ ГРЕШКАТА ВЪВ VERCEL ---
export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug: slug,
  }))
}
// ---------------------------------------------------------

export default function BlogPost({ params }: { params: { slug: string } }) {
  const { toast } = useToast()
  const post = blogPosts[params.slug]

  useEffect(() => {
    if (!post) {
      toast({
        title: "Post not found",
        description: "The requested blog post could not be found.",
        variant: "destructive",
      })
    }
  }, [post, toast])

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="mb-6">The blog post you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    )
  }

  const handleShare = (platform: string) => {
    const url = typeof window !== "undefined" ? window.location.href : ""
    const text = `Check out this article: ${post.title}`
    let shareUrl = ""

    switch (platform) {
      case "twitter": shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`; break
      case "facebook": shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`; break
      case "linkedin": shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`; break
      default:
        navigator.clipboard.writeText(url)
        toast({ title: "Link copied", description: "The article link has been copied." })
        return
    }
    if (shareUrl) window.open(shareUrl, "_blank")
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="container mx-auto py-6 px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tighter">
            Neural<span className="text-purple-500">Pulse</span>
          </Link>
          <Button variant="outline" className="border-purple-500 text-purple-500 hover:bg-purple-950">
            Subscribe
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Link href="/articles/" className="inline-flex items-center text-gray-400 hover:text-white mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to articles
          </Link>

          <div className="flex items-center gap-2 text-sm text-purple-500 mb-4">
            <BrainCircuit className="h-5 w-5" />
            <span>{post.category}</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">{post.title}</h1>

          <div className="flex items-center gap-4 text-sm text-gray-400 mb-8">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
            <div>{post.date}</div>
            <div>By {post.author}</div>
          </div>

          <div className="relative aspect-video mb-12 rounded-xl overflow-hidden border border-gray-800">
            <Image src={post.image} alt={post.title} fill className="object-cover" priority />
          </div>

          <div 
            className="prose prose-invert prose-purple max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="flex items-center justify-between py-8 border-y border-gray-800 mb-12">
            <span className="font-medium">Share this article</span>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" onClick={() => handleShare("twitter")}><Twitter className="h-4 w-4" /></Button>
              <Button size="icon" variant="ghost" onClick={() => handleShare("facebook")}><Facebook className="h-4 w-4" /></Button>
              <Button size="icon" variant="ghost" onClick={() => handleShare("linkedin")}><Linkedin className="h-4 w-4" /></Button>
              <Button size="icon" variant="ghost" onClick={() => handleShare("copy")}><Share2 className="h-4 w-4" /></Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}