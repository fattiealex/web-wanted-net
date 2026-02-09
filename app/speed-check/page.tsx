"use client";

import { useState } from 'react';
import { Smartphone, Monitor, Search, Zap, Activity, ShieldCheck, AlertTriangle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function SpeedCheck() {
  const [url, setUrl] = useState("");
  const [strategy, setStrategy] = useState<'mobile' | 'desktop'>('mobile');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const { toast } = useToast();

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    setData(null);

    // Използва ключа от .env.local (image_87929a.png)
    const apiKey = process.env.NEXT_PUBLIC_PAGESPEED_API_KEY;

    try {
      const targetUrl = url.startsWith('http') ? url : `https://${url}`;
      // Заявка към всички категории за пълни данни (image_878a9d.png)
      const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${targetUrl}&strategy=${strategy}&category=performance&category=accessibility&category=best-practices&category=seo${apiKey ? `&key=${apiKey}` : ""}`;
      
      const res = await fetch(apiUrl);
      const json = await res.json();

      if (json.error) throw new Error(json.error.message);

      const lh = json.lighthouseResult;
      
      setData({
        scores: {
          perf: Math.round(lh.categories.performance.score * 100),
          acc: Math.round(lh.categories.accessibility.score * 100),
          bp: Math.round(lh.categories['best-practices'].score * 100),
          seo: Math.round(lh.categories.seo.score * 100),
        },
        metrics: lh.audits,
        screenshot: lh.audits['final-screenshot']?.details?.data
      });
    } catch (err: any) {
      toast({ 
        title: "SYSTEM_ERROR", 
        description: err.message, 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono p-4 md:p-10 selection:bg-[#00ff41] selection:text-black">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-zinc-900 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-3 w-3 rounded-full bg-[#00ff41] animate-ping" />
              <span className="text-[10px] font-black tracking-[0.5em] text-[#00ff41]">CORE_ENGINE_V2</span>
            </div>
            <h1 className="text-5xl font-black italic tracking-tighter uppercase leading-none">Wanted_Audit</h1>
          </div>
          <p className="text-zinc-600 text-[10px] font-bold tracking-widest max-w-[200px]">AUTHORIZED_SCAN_ONLY // PROTOCOL_LEVEL_9</p>
        </div>

        {/* INPUT CONTROL PANEL */}
        <div className="bg-zinc-950 border border-zinc-800 p-2 rounded-[2.5rem] flex flex-col lg:flex-row gap-2 shadow-2xl">
          <div className="relative flex-1 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-[#00ff41] transition-colors" size={20} />
            <input 
              className="w-full bg-transparent border-none py-5 pl-16 pr-6 text-[#00ff41] text-lg outline-none placeholder:text-zinc-800 font-bold italic"
              placeholder="ENTER_TARGET_URL..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div className="flex bg-black p-1 rounded-full border border-zinc-900">
             <button onClick={() => setStrategy('mobile')} className={`flex items-center gap-2 px-8 py-4 rounded-full text-[11px] font-black uppercase transition-all ${strategy === 'mobile' ? 'bg-[#00ff41] text-black shadow-[0_0_20px_rgba(0,255,65,0.4)]' : 'text-zinc-600 hover:text-zinc-400'}`}>
                <Smartphone size={16}/> Mobile
             </button>
             <button onClick={() => setStrategy('desktop')} className={`flex items-center gap-2 px-8 py-4 rounded-full text-[11px] font-black uppercase transition-all ${strategy === 'desktop' ? 'bg-[#00ff41] text-black shadow-[0_0_20px_rgba(0,255,65,0.4)]' : 'text-zinc-600 hover:text-zinc-400'}`}>
                <Monitor size={16}/> Desktop
             </button>
          </div>
          <button onClick={handleScan} disabled={loading} className="lg:w-auto bg-white text-black font-black px-12 py-5 rounded-full hover:bg-[#00ff41] transition-all uppercase italic text-sm active:scale-95 disabled:opacity-50">
            {loading ? "BREACHING..." : "ANALYZE_TARGET"}
          </button>
        </div>

        {data && (
          <div className="space-y-10 animate-in fade-in zoom-in duration-1000">
            
            {/* GOOGLE CIRCLE INDICATORS (image_878a9d.png) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-zinc-950/30 border border-zinc-900 p-12 rounded-[3.5rem] backdrop-blur-3xl">
               <ScoreCircle label="Performance" score={data.scores.perf} />
               <ScoreCircle label="Accessibility" score={data.scores.acc} />
               <ScoreCircle label="Best Practices" score={data.scores.bp} />
               <ScoreCircle label="SEO" score={data.scores.seo} />
            </div>

            {/* DATA GRID */}
            <div className="grid lg:grid-cols-12 gap-8">
              {/* METRICS PANEL */}
              <div className="lg:col-span-8 bg-zinc-950 border border-zinc-900 p-10 rounded-[3.5rem] space-y-12">
                <div className="flex items-center justify-between border-b border-zinc-900 pb-6">
                  <div className="flex items-center gap-3">
                    <Activity size={20} className="text-[#00ff41]"/>
                    <h3 className="text-white text-xs font-black tracking-[0.3em] uppercase italic">Diagnostic_Data_Stream</h3>
                  </div>
                  <span className="text-[10px] text-zinc-700 font-mono">STATUS: VALIDATED</span>
                </div>
                
                <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
                  <MetricBar label="First Contentful Paint" audit={data.metrics['first-contentful-paint']} />
                  <MetricBar label="Largest Contentful Paint" audit={data.metrics['largest-contentful-paint']} />
                  <MetricBar label="Total Blocking Time" audit={data.metrics['total-blocking-time']} />
                  <MetricBar label="Cumulative Layout Shift" audit={data.metrics['cumulative-layout-shift']} />
                  <MetricBar label="Speed Index" audit={data.metrics['speed-index']} />
                </div>
              </div>

              {/* LIVE SCREENSHOT PREVIEW */}
              <div className="lg:col-span-4 bg-zinc-950 border border-zinc-900 rounded-[3.5rem] p-6 flex flex-col group overflow-hidden relative">
                <div className="absolute top-8 left-8 z-10 bg-black/80 backdrop-blur-md border border-zinc-800 px-3 py-1 rounded-full">
                  <span className="text-[8px] font-black text-[#00ff41] uppercase tracking-widest">Target_View</span>
                </div>
                <div className="flex-1 relative rounded-[2rem] overflow-hidden border border-zinc-900 bg-black">
                  <img src={data.screenshot} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" alt="Result" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// SUB-COMPONENTS
function ScoreCircle({ label, score }: any) {
  const color = score >= 90 ? "#00ff41" : score >= 50 ? "#ffa400" : "#ff4e42";
  const dashArray = 264;
  const dashOffset = dashArray - (dashArray * score) / 100;

  return (
    <div className="flex flex-col items-center gap-6 group">
      <div className="relative h-36 w-36 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
        <svg className="h-full w-full -rotate-90">
          <circle cx="50%" cy="50%" r="42%" fill="transparent" stroke="#111111" strokeWidth="10" />
          <circle 
            cx="50%" cy="50%" r="42%" 
            fill="transparent" 
            stroke={color} 
            strokeWidth="10" 
            strokeDasharray={dashArray} 
            strokeDashoffset={dashOffset} 
            strokeLinecap="round" 
            className="transition-all duration-[2.5s] ease-in-out" 
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-5xl font-black italic tracking-tighter" style={{ color }}>{score}</span>
        </div>
      </div>
      <span className="text-[11px] font-black uppercase text-zinc-500 tracking-[0.2em] group-hover:text-white transition-colors">{label}</span>
    </div>
  );
}

function MetricBar({ label, audit }: any) {
  const score = audit.score ?? 0;
  const color = score >= 0.9 ? "bg-[#00ff41]" : score >= 0.5 ? "bg-orange-500" : "bg-red-500";
  
  return (
    <div className="space-y-4 group">
      <div className="flex justify-between items-end">
        <div className="flex flex-col">
          <span className="text-[10px] text-zinc-600 font-black uppercase tracking-widest mb-1">Metric_Label</span>
          <span className="text-sm font-black text-zinc-300 group-hover:text-white transition-colors uppercase">{label}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xl font-black text-white italic">{audit.displayValue}</span>
        </div>
      </div>
      <div className="h-1.5 w-full bg-zinc-900/50 rounded-full overflow-hidden border border-zinc-900">
        <div 
          className={`h-full ${color} transition-all duration-[2s] ease-out shadow-[0_0_15px_rgba(0,255,65,0.2)]`} 
          style={{ width: `${score * 100}%` }} 
        />
      </div>
    </div>
  );
}