"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Monitor, Smartphone, Terminal, Activity, ShieldCheck, ShieldAlert, Info, Zap, Eye, BarChart3 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function SpeedCheck() {
  const [url, setUrl] = useState("");
  const [strategy, setStrategy] = useState<'mobile' | 'desktop'>('mobile');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const { toast } = useToast();

  const apiKey = process.env.NEXT_PUBLIC_PAGESPEED_API_KEY;

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setLoading(true);
    setData(null);

    try {
      const targetUrl = url.startsWith('http') ? url : `https://${url}`;
      const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${targetUrl}&strategy=${strategy}${apiKey ? `&key=${apiKey}` : ""}`;
      
      const res = await fetch(apiUrl);
      const json = await res.json();

      if (json.error) throw new Error(json.error.message);

      const scores = json.lighthouseResult.categories;
      const audit = json.lighthouseResult.audits;
      
      // Core Web Vitals Logic: Generally, if Performance is > 90 and LCP is healthy, it's a "Pass"
      const perfScore = scores.performance.score * 100;
      const lcpValue = audit['largest-contentful-paint'].numericValue; // in ms
      const isPassed = perfScore >= 90 && lcpValue < 2500;

      setData({
        performance: Math.round(perfScore),
        accessibility: Math.round(scores.accessibility.score * 100),
        bestPractices: Math.round(scores['best-practices'].score * 100),
        seo: Math.round(scores.seo.score * 100),
        lcp: audit['largest-contentful-paint'].displayValue,
        cls: audit['cumulative-layout-shift'].displayValue,
        fcp: audit['first-contentful-paint'].displayValue,
        speedIndex: audit['speed-index'].displayValue,
        passed: isPassed,
        screenshot: json.lighthouseResult.audits['final-screenshot']?.details?.data 
      });
    } catch (error: any) {
      toast({
        title: "SCAN_FAILED",
        description: error.message || "Connection to Google API lost.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-[#00ff41] font-mono p-4 md:p-10">
      <div className="max-w-6xl mx-auto border border-[#003b00] bg-zinc-950 p-6 shadow-2xl">
        
        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-8 border-b border-[#003b00] pb-4">
          <div className="flex items-center gap-2">
            <Terminal size={18} />
            <span className="text-xs font-bold tracking-[0.2em] text-white">WEB_WANTED // SPEED_DIAGNOSTICS_V3</span>
          </div>
          <div className="hidden md:block text-[10px] text-zinc-600 tracking-tighter">
            ENCRYPTION: AES-256 // STATUS: SECURE
          </div>
        </div>

        {/* URL INPUT */}
        <form onSubmit={handleScan} className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-[#003b00]" size={18} />
            <Input 
              placeholder="ENTER_TARGET_DOMAIN_FOR_ANALYSIS..." 
              className="bg-black border-[#003b00] text-[#00ff41] pl-10 h-12 rounded-none focus-visible:ring-[#00ff41] placeholder:text-zinc-800"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={loading} className="bg-[#00ff41] hover:bg-white text-black h-12 px-12 font-black rounded-none transition-colors">
            {loading ? "ANALYZING..." : "INITIALIZE"}
          </Button>
        </form>

        {/* DEVICE SELECTOR */}
        <div className="flex gap-4 mb-12">
          <button onClick={() => setStrategy('mobile')} className={`flex items-center gap-2 px-6 py-2 border transition-all ${strategy === 'mobile' ? 'bg-[#00ff41] text-black border-[#00ff41]' : 'border-[#003b00] text-[#003b00] hover:text-[#00ff41]'}`}>
            <Smartphone size={16} /> MOBILE
          </button>
          <button onClick={() => setStrategy('desktop')} className={`flex items-center gap-2 px-6 py-2 border transition-all ${strategy === 'desktop' ? 'bg-[#00ff41] text-black border-[#00ff41]' : 'border-[#003b00] text-[#003b00] hover:text-[#00ff41]'}`}>
            <Monitor size={16} /> DESKTOP
          </button>
        </div>

        {loading && (
          <div className="py-24 text-center space-y-4">
            <Activity className="mx-auto animate-spin text-[#00ff41]" size={50} />
            <p className="text-xl tracking-[0.4em] animate-pulse">INTERCEPTING_PACKETS...</p>
          </div>
        )}

        {data && !loading && (
          <div className="space-y-12 animate-in fade-in zoom-in duration-500">
            
            {/* ASSESSMENT STATUS */}
            <div className={`p-6 border-l-8 flex items-center justify-between ${data.passed ? 'border-green-500 bg-green-950/10' : 'border-red-600 bg-red-950/10'}`}>
              <div className="flex items-center gap-4">
                {data.passed ? <ShieldCheck size={32} className="text-green-500" /> : <ShieldAlert size={32} className="text-red-600" />}
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tighter">Core Web Vitals Assessment</h2>
                  <p className={`text-sm ${data.passed ? 'text-green-500' : 'text-red-500'}`}>Target host has {data.passed ? 'PASSED' : 'FAILED'} the performance audit.</p>
                </div>
              </div>
              <div className="hidden md:block text-4xl font-black opacity-20 uppercase tracking-widest">
                {data.passed ? 'Verified' : 'Critical'}
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* CIRCLE SCORES */}
              <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <ScoreCard label="PERFORMANCE" score={data.performance} />
                <ScoreCard label="ACCESSIBILITY" score={data.accessibility} />
                <ScoreCard label="BEST_PRACTICES" score={data.bestPractices} />
                <ScoreCard label="SEO" score={data.seo} />
              </div>

              {/* LIVE SCREENSHOT */}
              <div className="border border-[#003b00] bg-black p-2 shadow-xl group">
                <div className="flex items-center gap-2 mb-2 px-2 text-[10px] text-zinc-600 uppercase tracking-widest">
                  <Eye size={12} /> Target_Visual_Capture
                </div>
                <div className="relative aspect-video bg-zinc-900 overflow-hidden">
                   {data.screenshot ? (
                     <img src={data.screenshot} alt="Visual Capture" className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700" />
                   ) : (
                     <div className="flex items-center justify-center h-full text-zinc-800">NO_IMAGE_SIGNAL</div>
                   )}
                </div>
              </div>
            </div>

            {/* SPECS AND TERMS GUIDE */}
            <div className="grid md:grid-cols-2 gap-8 border-t border-[#003b00] pt-10">
              {/* Technical Metrics */}
              <div className="space-y-4 bg-black/40 p-6 border border-[#003b00]/30">
                <h3 className="text-white text-xs font-bold mb-6 flex items-center gap-2">
                  <BarChart3 size={14} className="text-[#00ff41]" /> DETAILED_METRICS
                </h3>
                <MetricLine label="Largest Contentful Paint (LCP)" value={data.lcp} />
                <MetricLine label="First Contentful Paint (FCP)" value={data.fcp} />
                <MetricLine label="Cumulative Layout Shift (CLS)" value={data.cls} />
                <MetricLine label="Speed Index" value={data.speedIndex} />
              </div>

              {/* TERMINOLOGY GUIDE */}
              <div className="bg-[#001a00] p-6 border border-[#00ff41]/20">
                <h3 className="text-[#00ff41] text-xs font-bold mb-4 flex items-center gap-2">
                  <Info size={14} /> FIELD_GUIDE
                </h3>
                <div className="space-y-4 text-[11px] leading-relaxed text-zinc-400">
                  <p><strong className="text-white uppercase">[LCP]:</strong> Measures loading performance. For a good user experience, LCP should occur within 2.5 seconds.</p>
                  <p><strong className="text-white uppercase">[CLS]:</strong> Measures visual stability. It quantifies how much the content shifts on the screen.</p>
                  <p><strong className="text-white uppercase">[Accessibility]:</strong> Evaluates how well users with assistive technologies (like screen readers) can navigate your site.</p>
                  <p><strong className="text-white uppercase">[SEO]:</strong> Scans for proper metadata, crawlability, and mobile-friendliness for search engine ranking.</p>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

// UI HELPER COMPONENTS
function ScoreCard({ label, score }: { label: string, score: number }) {
  const color = score >= 90 ? "text-[#00ff41]" : score >= 50 ? "text-yellow-500" : "text-red-600";
  return (
    <div className="border border-[#003b00] p-4 text-center bg-zinc-950">
      <div className={`text-4xl font-black mb-1 ${color}`}>{score}</div>
      <div className="text-[9px] text-zinc-600 font-bold tracking-widest">{label}</div>
    </div>
  );
}

function MetricLine({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between border-b border-[#003b00]/20 py-2 text-xs">
      <span className="text-zinc-500">{label}</span>
      <span className="text-white font-mono">{value}</span>
    </div>
  );
}

function SearchIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
  );
}