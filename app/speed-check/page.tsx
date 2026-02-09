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

  // Вземаме ключа от средата
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

      // ГРЕШКА 1: Проблем с API ключа или лимит
      if (json.error) throw new Error(json.error.message);

      // ГРЕШКА 2: Google не връща резултати (Защита)
      const scores = json.lighthouseResult?.categories;
      const audits = json.lighthouseResult?.audits;

      if (!scores || !audits) {
        throw new Error("INCOMPLETE_RESPONSE: Google Lighthouse failed to analyze this URL.");
      }

      // Безопасно извличане на Performance Score
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
      console.error("DEBUG_LOG:", error);
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
    <div className="min-h-screen bg-[#050505] text-[#00ff41] font-mono p-4 md:p-10 selection:bg-[#00ff41] selection:text-black">
      <div className="max-w-6xl mx-auto border border-[#003b00] bg-zinc-950/50 backdrop-blur-xl p-8 shadow-[0_0_50px_-12px_rgba(0,255,65,0.15)] rounded-[2.5rem]">
        
        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-10 border-b border-[#003b00]/30 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#00ff41]/10 rounded-xl">
              <Terminal size={20} className="text-[#00ff41]" />
            </div>
            <span className="text-sm font-black tracking-[0.3em] text-white uppercase italic">Web_Wanted // Speed_Lab_v3</span>
          </div>
          <div className="hidden md:block text-[10px] text-zinc-600 tracking-widest font-bold">
            STATUS: <span className="text-[#00ff41] animate-pulse">SECURE_CONNECTION</span>
          </div>
        </div>

        {/* URL INPUT */}
        <form onSubmit={handleScan} className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#003b00] group-focus-within:text-[#00ff41] transition-colors" size={20} />
            <Input 
              placeholder="ENTER_TARGET_DOMAIN..." 
              className="bg-black/50 border-[#003b00] text-[#00ff41] pl-12 h-14 rounded-2xl focus-visible:ring-1 focus-visible:ring-[#00ff41] placeholder:text-zinc-800 text-lg transition-all"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={loading} className="bg-[#00ff41] hover:bg-white text-black h-14 px-10 font-black rounded-2xl transition-all active:scale-95 shadow-lg shadow-[#00ff41]/10">
            {loading ? "ANALYZING..." : "INITIALIZE SCAN"}
          </Button>
        </form>

        {/* DEVICE SELECTOR */}
        <div className="flex gap-3 mb-12">
          <button 
            type="button"
            onClick={() => setStrategy('mobile')} 
            className={`flex items-center gap-2 px-8 py-3 rounded-xl border font-bold text-xs tracking-widest transition-all ${strategy === 'mobile' ? 'bg-[#00ff41] text-black border-[#00ff41] shadow-lg shadow-[#00ff41]/20' : 'border-[#003b00] text-zinc-500 hover:border-[#00ff41] hover:text-[#00ff41]'}`}
          >
            <Smartphone size={14} /> MOBILE
          </button>
          <button 
            type="button"
            onClick={() => setStrategy('desktop')} 
            className={`flex items-center gap-2 px-8 py-3 rounded-xl border font-bold text-xs tracking-widest transition-all ${strategy === 'desktop' ? 'bg-[#00ff41] text-black border-[#00ff41] shadow-lg shadow-[#00ff41]/20' : 'border-[#003b00] text-zinc-500 hover:border-[#00ff41] hover:text-[#00ff41]'}`}
          >
            <Monitor size={14} /> DESKTOP
          </button>
        </div>

        {loading && (
          <div className="py-32 text-center space-y-6">
            <div className="relative inline-block">
                <Activity className="mx-auto animate-spin text-[#00ff41] opacity-20" size={80} />
                <Zap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#00ff41] animate-pulse" size={30} />
            </div>
            <p className="text-xl tracking-[0.5em] font-black italic animate-pulse text-white">INTERCEPTING_DATA_STREAM...</p>
          </div>
        )}

        {data && !loading && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            
            <div className={`p-8 rounded-[2rem] border-l-[12px] flex items-center justify-between shadow-xl ${data.passed ? 'border-green-500 bg-green-500/5' : 'border-red-600 bg-red-600/5'}`}>
              <div className="flex items-center gap-6">
                <div className={`p-4 rounded-2xl ${data.passed ? 'bg-green-500/20 text-green-500' : 'bg-red-600/20 text-red-600'}`}>
                    {data.passed ? <ShieldCheck size={40} /> : <ShieldAlert size={40} />}
                </div>
                <div>
                  <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">Diagnostic_Report</h2>
                  <p className={`text-sm font-bold tracking-widest mt-1 ${data.passed ? 'text-green-500' : 'text-red-500'}`}>
                    TARGET_HOST: {data.passed ? 'OPTIMIZED_PASS' : 'CRITICAL_FAILURE'}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <ScoreCard label="PERFORMANCE" score={data.performance} />
                <ScoreCard label="ACCESSIBILITY" score={data.accessibility} />
                <ScoreCard label="PRACTICES" score={data.bestPractices} />
                <ScoreCard label="SEO" score={data.seo} />
              </div>

              <div className="border border-[#003b00] bg-black rounded-[2rem] p-3 shadow-2xl group overflow-hidden text-center">
                <div className="flex items-center gap-2 mb-3 px-3 text-[10px] text-zinc-600 uppercase tracking-[0.2em] font-black">
                  <Eye size={12} className="text-[#00ff41]" /> Capture_01
                </div>
                <div className="relative aspect-video bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800">
                   {data.screenshot ? (
                     <img src={data.screenshot} alt="Visual" className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-1000" />
                   ) : (
                     <div className="flex items-center justify-center h-full text-zinc-800 italic text-[10px]">NO_SIGNAL</div>
                   )}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 border-t border-[#003b00]/30 pt-10">
              <div className="space-y-3 bg-black/40 p-8 rounded-[2rem] border border-[#003b00]/20 shadow-inner">
                <h3 className="text-white text-xs font-black mb-6 flex items-center gap-2 tracking-[0.3em]">
                  <BarChart3 size={16} className="text-[#00ff41]" /> DATA_LOG
                </h3>
                <MetricLine label="Largest Contentful Paint" value={data.lcp} />
                <MetricLine label="First Contentful Paint" value={data.fcp} />
                <MetricLine label="Cumulative Layout Shift" value={data.cls} />
                <MetricLine label="Speed Index" value={data.speedIndex} />
              </div>

              <div className="bg-[#001a00]/30 p-8 rounded-[2rem] border border-[#00ff41]/10 text-xs">
                <h3 className="text-[#00ff41] text-xs font-black mb-6 flex items-center gap-2 tracking-[0.3em]">
                  <Info size={16} /> OPERATOR_GUIDE
                </h3>
                <div className="space-y-4 text-zinc-500 font-medium">
                  <p><strong className="text-white">[LCP]:</strong> Ideal: &lt; 2.5s.</p>
                  <p><strong className="text-white">[CLS]:</strong> Measures visual stability.</p>
                  <p><strong className="text-white">[TBT]:</strong> Measures responsiveness.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ScoreCard({ label, score }: { label: string, score: number }) {
  const color = score >= 90 ? "text-[#00ff41]" : score >= 50 ? "text-yellow-500" : "text-red-600";
  return (
    <div className="border border-[#003b00]/50 p-6 rounded-[2rem] text-center bg-black/40 hover:border-[#00ff41] transition-all duration-500 group">
      <div className={`text-4xl font-black mb-2 transition-transform group-hover:scale-110 ${color}`}>{score}</div>
      <div className="text-[9px] text-zinc-600 font-black tracking-[0.2em] uppercase">{label}</div>
    </div>
  );
}

function MetricLine({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between border-b border-[#003b00]/10 py-3 text-xs">
      <span className="text-zinc-500 font-bold">{label}</span>
      <span className="text-white font-black italic">{value}</span>
    </div>
  );
}