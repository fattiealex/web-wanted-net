import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, BrainCircuit, Clock, Share2, Twitter, Facebook, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"

// 1. Данните (Пълен списък за билда)
const blogPosts: Record<string, any> = {
  "evolution-of-gans": {
    title: "The Evolution of Generative Adversarial Networks: From GAN to StyleGAN-3",
    date: "May 15, 2023",
    author: "Dr. Alex Chen",
    category: "GenAI",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?q=80&w=2000&h=1000&auto=format&fit=crop",
    content: `<h2>The Evolution</h2><p>GANs have revolutionized the field of AI...</p>`
  },
  "multimodal-ai-models": {
    title: "The Rise of Multimodal AI Models: Bridging Text, Image, and Beyond",
    date: "February 5, 2024",
    author: "Dr. Michael Zhang",
    category: "AI Research",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&h=1000&auto=format&fit=crop",
    content: `<p>Multimodal models are the future...</p>`
  },
  "ai-in-2025": {
    title: "AI in 2025: Transforming Daily Life",
    date: "October 18, 2023",
    author: "Dr. Sarah Johnson",
    category: "Future Tech",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=2000&h=1000&auto=format&fit=crop",
    content: `<p>AI is now part of our pockets...</p>`
  },
  "deep-learning-nlp": {
    title: "Deep Learning for Natural Language Processing",
    date: "November 7, 2024",
    author: "Dr. Lisa Park",
    category: "NLP",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2000&h=1000&auto=format&fit=crop",
    content: `<p>NLP advances rapidly...</p>`
  },
  "future-of-ai-research": {
    title: "The Future of AI Research: What's Next?",
    date: "February 28, 2025",
    author: "Dr. Thomas Anderson",
    category: "Future of AI",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2000&h=1000&auto=format&fit=crop",
    content: `<p>Exploring the next frontier...</p>`
  },
  "ethical-considerations-genai": {
    title: "Ethical Considerations in Generative AI",
    date: "January 14, 2025",
    author: "Dr. Maya Patel",
    category: "AI Ethics",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?q=80&w=2000&h=1000&auto=format&fit=crop",
    content: `<p>Ethics remain the core...</p>`
  },
  "ai-regulation-landscape-2025": {
    title: "AI Regulation Landscape in 2025: Global Policies",
    date: "March 1, 2025",
    author: "Dr. Elena Kowalski",
    category: "AI Policy",
    readTime: "11 min read",
    image: "https://images.unsplash.com/photo-1589254065909-b7086229d08c?q=80&w=2000&h=1000&auto=format&fit=crop",
    content: `<p>The global race for regulation...</p>`
  }
}

// 2. Генератор на статични пътища (Задължително за Vercel)
export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug: slug,
  }))
}

// 3. Основен компонент (Server Component по подразбиране)
export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug]

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-2xl">Статията не е намерена.</h1>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="container mx-auto py-6 px-4">
        <Link href="/" className="text-xl font-bold tracking-tighter">
          Neural<span className="text-purple-500">Pulse</span>
        </Link>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" /> Назад
          </Link>

          <div className="flex items-center gap-2 text-sm text-purple-500 mb-4">
            <BrainCircuit className="h-5 w-5" />
            <span>{post.category}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-6">{post.title}</h1>

          <div className="flex items-center gap-4 text-sm text-gray-400 mb-8">
            <Clock className="h-4 w-4" /> <span>{post.readTime}</span>
            <span>{post.date}</span>
            <span>By {post.author}</span>
          </div>

          <div className="relative aspect-video mb-12 rounded-xl overflow-hidden border border-gray-800">
            <Image src={post.image} alt={post.title} fill className="object-cover" priority />
          </div>

          <article 
            className="prose prose-invert prose-purple max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </main>
    </div>
  )
}