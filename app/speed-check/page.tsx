"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Monitor, Smartphone, Terminal, Activity, ShieldCheck, 
  ShieldAlert, Info, Zap, Eye, BarChart3, Search 
} from "lucide-react";
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

      const scores = json.lighthouseResult?.categories;
      const audits = json.lighthouseResult?.audits;

      if (!scores || !audits) {
        throw new Error("INCOMPLETE_RESPONSE: Lighthouse failed to analyze this URL.");
      }

      const perfScore = (scores.performance?.score || 0) * 100;
      const lcpValue = audits['largest-contentful-paint']?.numericValue || 0; 
      const isPassed = perfScore >= 90 && lcpValue < 2500;

      setData({
        performance: Math.round(perfScore),
        accessibility: Math.round((scores.accessibility?.score || 0) * 100),
        bestPractices: Math.round((scores['best-practices']?.score || 0) * 100),
        seo: Math.round((scores.seo?.score || 0) * 100),
        lcp: audits['largest-contentful-paint']?.displayValue || "N/A",
        cls: audits['cumulative-layout-shift']?.displayValue || "N/A",
        fcp: audits['first-contentful-paint']?.displayValue || "N/A",
        speedIndex: audits['speed-index']?.displayValue || "N/A",
        passed: isPassed,
        screenshot: audits['final-screenshot']?.details?.data || null
      });

    } catch (error: any) {
      console.error("DIAGNOSTIC_ERROR:", error);
      toast({
        title: "[ SCAN_FAILED ]",
        description: error.message || "Connection lost to Google API.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#00ff41] font-mono p-4 md:p-10 selection:bg-[#00ff41] selection:text-black">
      <div className="max-w-6xl mx-auto border border-[#003b00] bg-zinc-950/50 backdrop-blur-xl p-5 md:p-10 shadow-[0_0_60px_-15px_rgba(0,255,65,0.2)] rounded-[2rem] md:rounded-[3rem]">
        
        {/* HEADER BAR */}
        <div className="flex items-center justify-between mb-10 border-b border-[#003b00]/30 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#00ff41]/10 rounded-xl border border-[#00ff41]/20">
              <Terminal size={20} className="text-[#00ff41]" />
            </div>
            <span className="text-xs md:text-sm font-black tracking-[0.3em] text-white uppercase italic">Web_Wanted // Speed_Lab_v3</span>
          </div>
          <div className="hidden sm:block text-[10px] text-[#00ff41] animate-pulse font-bold tracking-[0.4em] uppercase">
            LINK_STABLE
          </div>
        </div>

        {/* SEARCH FORM */}
        <form onSubmit={handleScan} className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#003b00] group-focus-within:text-[#00ff41] transition-colors" size={20} />
            <Input 
              placeholder="ENTER_TARGET_DOMAIN..." 
              className="bg-black/50 border-[#003b00] text-[#00ff41] pl-12 h-14 rounded-2xl focus-visible:ring-1 focus-visible:ring-[#00ff41] placeholder:text-zinc-800 text-base md:text-lg transition-all"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={loading} className="bg-[#00ff41] hover:bg-white text-black h-14 px-10 font-black rounded-2xl transition-all active:scale-95 uppercase italic shadow-lg shadow-[#00ff41]/10">
            {loading ? "ANALYZING..." : "INITIALIZE SCAN"}
          </Button>
        </form>

        {/* DEVICE TOGGLE */}
        <div className="flex gap-3 mb-12">
          <button 
            type="button"
            onClick={() => setStrategy('mobile')} 
            className={`flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-4 rounded-2xl border font-black text-[10px] tracking-widest transition-all ${strategy === 'mobile' ? 'bg-[#00ff41] text-black border-[#00ff41] shadow-lg shadow-[#00ff41]/20' : 'border-[#003b00] text-zinc-600 hover:border-[#00ff41] hover:text-[#00ff41]'}`}
          >
            <Smartphone size={16} /> MOBILE
          </button>
          <button 
            type="button"
            onClick={() => setStrategy('desktop')} 
            className={`flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-4 rounded-2xl border font-black text-[10px] tracking-widest transition-all ${strategy === 'desktop' ? 'bg-[#00ff41] text-black border-[#00ff41] shadow-lg shadow-[#00ff41]/20' : 'border-[#003b00] text-zinc-600 hover:border-[#00ff41] hover:text-[#00ff41]'}`}
          >
            <Monitor size={16} /> DESKTOP
          </button>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="py-24 text-center space-y-8 border-2 border-dashed border-[#003b00]/30 rounded-[2rem]">
            <div className="relative inline-block">
                <Activity className="mx-auto animate-spin text-[#00ff41] opacity-20" size={100} />
                <Zap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#00ff41] animate-pulse" size={40} />
            </div>
            <p className="text-xl md:text-2xl tracking-[0.4em] font-black italic animate-pulse text-white uppercase pr-[-0.4em]">Intercepting_Data...</p>
          </div>
        )}

        {/* RESULTS PANEL */}
        {data && !loading && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            
            {/* BIG STATUS CARD */}
            <div className={`p-8 rounded-[2rem] border-l-[12px] flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl ${data.passed ? 'border-green-500 bg-green-500/5' : 'border-red-600 bg-red-600/5'}`}>
              <div className="flex items-center gap-6 text-center md:text-left">
                <div className={`p-4 rounded-2xl ${data.passed ? 'bg-green-500/20 text-green-500' : 'bg-red-600/20 text-red-600'}`}>
                    {data.passed ? <ShieldCheck size={48} /> : <ShieldAlert size={48} />}
                </div>
                <div>
                  <h2 className="text-2xl md:text-4xl font-black text-white tracking-tighter uppercase italic">Diagnostic_Report</h2>
                  <p className={`text-xs font-bold tracking-[0.2em] mt-2 uppercase ${data.passed ? 'text-green-500' : 'text-red-500'}`}>
                    SYSTEM_STATUS: {data.passed ? 'CRITICAL_PASS_SUCCESS' : 'OPTIMIZATION_REQUIRED'}
                  </p>
                </div>
              </div>
            </div>

            {/* SCORE GRID */}
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <ScoreCard label="PERF" score={data.performance} />
                <ScoreCard label="ACCESS" score={data.accessibility} />
                <ScoreCard label="PRACTICES" score={data.bestPractices} />
                <ScoreCard label="SEO" score={data.seo} />
              </div>

              {/* SCREENSHOT PREVIEW */}
              <div className="border-2 border-[#003b00] bg-black rounded-[2rem] p-3 group overflow-hidden shadow-2xl">
                <div className="flex items-center gap-2 mb-3 px-3 text-[10px] text-zinc-600 uppercase font-black italic tracking-widest">
                  <Eye size={14} className="text-[#00ff41]" /> Capture_View_01
                </div>
                <div className="relative aspect-video bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-900">
                   {data.screenshot ? (
                     <img src={data.screenshot} alt="Visual" className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-1000" />
                   ) : (
                     <div className="flex items-center justify-center h-full text-zinc-800 italic text-[10px]">SIGNAL_LOST</div>
                   )}
                </div>
              </div>
            </div>

            {/* BOTTOM STATS */}
            <div className="grid md:grid-cols-2 gap-8 border-t border-[#003b00]/30 pt-10">
              <div className="space-y-4 bg-black/60 p-8 rounded-[2rem] border border-[#003b00]/20 shadow-inner">
                <h3 className="text-white text-xs font-black mb-6 flex items-center gap-2 tracking-[0.3em] uppercase italic">
                  <BarChart3 size={18} className="text-[#00ff41]" /> Core_WebVitals_Log
                </h3>
                <MetricLine label="Largest Contentful Paint" value={data.lcp} />
                <MetricLine label="First Contentful Paint" value={data.fcp} />
                <MetricLine label="Cumulative Layout Shift" value={data.cls} />
                <MetricLine label="Speed Index" value={data.speedIndex} />
              </div>

              <div className="bg-[#001a00]/20 p-8 rounded-[2rem] border border-[#00ff41]/10">
                <h3 className="text-[#00ff41] text-xs font-black mb-6 flex items-center gap-2 tracking-[0.3em] uppercase italic">
                  <Info size={18} /> Optimization_Guide
                </h3>
                <div className="space-y-4 text-[11px] md:text-xs text-zinc-500 font-bold uppercase leading-relaxed">
                  <p><span className="text-white">[LCP]:</span> Focus on hero image compression.</p>
                  <p><span className="text-white">[CLS]:</span> Define height/width for all assets.</p>
                  <p><span className="text-white">[SEO]:</span> Ensure meta-tags and semantic HTML.</p>
                  <p className="pt-4 text-[#00ff41]/50 italic tracking-widest">// AUTO_GENERATED_BY_WANTED_SYSTEM</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Sub-components for cleaner structure
function ScoreCard({ label, score }: { label: string, score: number }) {
  const color = score >= 90 ? "text-[#00ff41]" : score >= 50 ? "text-orange-500" : "text-red-600";
  const border = score >= 90 ? "border-[#00ff41]/30" : score >= 50 ? "border-orange-500/30" : "border-red-600/30";

  return (
    <div className={`border-2 ${border} p-6 rounded-[2rem] text-center bg-black/40 hover:border-[#00ff41] transition-all duration-500 group`}>
      <div className={`text-4xl font-black mb-2 transition-transform group-hover:scale-110 ${color}`}>{score}</div>
      <div className="text-[9px] text-zinc-600 font-black tracking-[0.2em] uppercase">{label}</div>
    </div>
  );
}

function MetricLine({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between border-b border-[#003b00]/10 py-4 text-[10px] md:text-xs">
      <span className="text-zinc-500 font-black uppercase tracking-widest">{label}</span>
      <span className="text-white font-black italic tracking-wider pr-2">{value}</span>
    </div>
  );
}