"use client";

import { useState } from 'react';
import { Smartphone, Monitor, Search, Zap, Activity, ShieldCheck, Globe, BarChart3, ExternalLink } from "lucide-react";
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

    const apiKey = process.env.NEXT_PUBLIC_PAGESPEED_API_KEY;

    try {
      const targetUrl = url.startsWith('http') ? url : `https://${url}`;
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
        title: "[ SYSTEM_ERROR ]", 
        description: err.message, 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono p-4 md:p-10 selection:bg-[#00ff41] selection:text-black pt-24">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* HEADER SECTION WITH GOOGLE TRUST */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-zinc-900 pb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-[#00ff41] animate-ping" />
              <span className="text-[10px] font-black tracking-[0.5em] text-[#00ff41]">PROTOCOL_LEVEL_9 // DIAGNOSTICS</span>
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              <h1 className="text-5xl md:text-7xl font-[900] italic tracking-tighter uppercase leading-none text-white">
                WANTED_<span className="text-[#00ff41]">AUDIT</span>
              </h1>
              
              {/* GOOGLE API BADGE */}
              <div className="flex items-center gap-2 bg-zinc-900/50 border border-zinc-800 px-3 py-1.5 rounded-sm">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4285F4]"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#EA4335]"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FBBC05]"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#34A853]"></div>
                </div>
                <span className="text-[9px] text-zinc-400 font-black tracking-widest uppercase">
                  Google PageSpeed API
                </span>
              </div>
            </div>

            <p className="text-zinc-500 text-[10px] md:text-xs max-w-xl font-bold uppercase leading-relaxed border-l-2 border-[#00ff41] pl-4">
              // Direct encrypted link established with <span className="text-white underline decoration-[#00ff41]">Google Lighthouse Engine</span>. 
              Real-time performance data pulled from official PageSpeed V5 databases.
            </p>
          </div>
        </div>

        {/* INPUT CONTROL PANEL */}
        <div className="bg-zinc-950 border-2 border-zinc-900 p-2 flex flex-col lg:flex-row gap-2 shadow-2xl group transition-all hover:border-[#00ff41]/30">
          <div className="relative flex-1 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-[#00ff41] transition-colors" size={20} />
            <input 
              className="w-full bg-transparent border-none py-5 pl-16 pr-6 text-[#00ff41] text-lg outline-none placeholder:text-zinc-800 font-black italic uppercase"
              placeholder="ENTER_TARGET_URL..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div className="flex bg-black p-1 border border-zinc-900">
             <button onClick={() => setStrategy('mobile')} className={`flex items-center gap-2 px-6 py-4 text-[10px] font-black uppercase transition-all ${strategy === 'mobile' ? 'bg-[#00ff41] text-black shadow-[0_0_20px_rgba(0,255,65,0.2)]' : 'text-zinc-600 hover:text-zinc-400'}`}>
                <Smartphone size={14}/> Mobile
             </button>
             <button onClick={() => setStrategy('desktop')} className={`flex items-center gap-2 px-6 py-4 text-[10px] font-black uppercase transition-all ${strategy === 'desktop' ? 'bg-[#00ff41] text-black shadow-[0_0_20px_rgba(0,255,65,0.2)]' : 'text-zinc-600 hover:text-zinc-400'}`}>
                <Monitor size={14}/> Desktop
             </button>
          </div>
          <button onClick={handleScan} disabled={loading} className="lg:w-auto bg-white text-black font-[1000] px-12 py-5 hover:bg-[#00ff41] transition-all uppercase italic text-sm active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2">
            {loading ? <><Activity className="animate-spin" size={16}/> BREACHING...</> : "EXECUTE_SCAN"}
          </button>
        </div>

        {!data && !loading && (
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-40 py-10">
                <TrustBox icon={<ShieldCheck size={20}/>} title="OFFICIAL_API" desc="Certified metrics directly from Google's core infrastructure." />
                <TrustBox icon={<Zap size={20}/>} title="LIVE_LOAD" desc="Real-world simulation of user experience & load speeds." />
                <TrustBox icon={<BarChart3 size={20}/>} title="CORE_VITALS" desc="Detailed analysis of LCP, CLS and Total Blocking Time." />
             </div>
        )}

        {data && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            
            {/* GOOGLE CIRCLE INDICATORS */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-zinc-950/50 border-2 border-zinc-900 p-8 md:p-12">
               <ScoreCircle label="Performance" score={data.scores.perf} />
               <ScoreCircle label="Accessibility" score={data.scores.acc} />
               <ScoreCircle label="Best Practices" score={data.scores.bp} />
               <ScoreCircle label="SEO" score={data.scores.seo} />
            </div>

            {/* DATA GRID */}
            <div className="grid lg:grid-cols-12 gap-8 font-mono">
              {/* METRICS PANEL */}
              <div className="lg:col-span-8 bg-zinc-950 border border-zinc-900 p-8 space-y-12">
                <div className="flex items-center justify-between border-b border-zinc-900 pb-6">
                  <div className="flex items-center gap-3">
                    <Activity size={18} className="text-[#00ff41]"/>
                    <h3 className="text-white text-[10px] font-black tracking-[0.3em] uppercase italic">Diagnostic_Data_Stream</h3>
                  </div>
                  <span className="text-[9px] text-[#00ff41] font-black border border-[#00ff41]/30 px-2 py-0.5">STATUS: VALIDATED_BY_GOOGLE</span>
                </div>
                
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                  <MetricBar label="First Contentful Paint" audit={data.metrics['first-contentful-paint']} />
                  <MetricBar label="Largest Contentful Paint" audit={data.metrics['largest-contentful-paint']} />
                  <MetricBar label="Total Blocking Time" audit={data.metrics['total-blocking-time']} />
                  <MetricBar label="Cumulative Layout Shift" audit={data.metrics['cumulative-layout-shift']} />
                  <MetricBar label="Speed Index" audit={data.metrics['speed-index']} />
                  <MetricBar label="Time to Interactive" audit={data.metrics['interactive']} />
                </div>
              </div>

              {/* LIVE SCREENSHOT PREVIEW */}
              <div className="lg:col-span-4 bg-zinc-950 border border-zinc-900 p-4 flex flex-col group overflow-hidden relative">
                <div className="absolute top-6 left-6 z-10 bg-black/80 backdrop-blur-md border border-zinc-800 px-3 py-1 rounded-sm">
                  <span className="text-[8px] font-[1000] text-[#00ff41] uppercase tracking-[0.2em]">Target_Visualization</span>
                </div>
                <div className="flex-1 relative overflow-hidden border border-zinc-900 bg-black min-h-[400px]">
                  <img src={data.screenshot} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" alt="Result" />
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* PAGE FOOTER */}
        <div className="pt-20 border-t border-zinc-900 text-center">
            <p className="text-[9px] text-zinc-800 font-black tracking-[0.4em] uppercase">
                Powered by Google Lighthouse Protocol // Data Integrity Guaranteed
            </p>
        </div>
      </div>
    </div>
  );
}

// SUB-COMPONENTS
function TrustBox({ icon, title, desc }: any) {
    return (
        <div className="border border-zinc-900 p-6 space-y-3 hover:border-zinc-700 transition-colors">
            <div className="text-[#00ff41]">{icon}</div>
            <h4 className="text-white text-[10px] font-black tracking-widest uppercase">{title}</h4>
            <p className="text-zinc-600 text-[9px] font-bold leading-tight uppercase">{desc}</p>
        </div>
    )
}

function ScoreCircle({ label, score }: any) {
  const color = score >= 90 ? "#00ff41" : score >= 50 ? "#ffa400" : "#ff4e42";
  const dashArray = 264;
  const dashOffset = dashArray - (dashArray * score) / 100;

  return (
    <div className="flex flex-col items-center gap-6 group">
      <div className="relative h-32 w-32 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
        <svg className="h-full w-full -rotate-90">
          <circle cx="50%" cy="50%" r="42%" fill="transparent" stroke="#111111" strokeWidth="8" />
          <circle 
            cx="50%" cy="50%" r="42%" 
            fill="transparent" 
            stroke={color} 
            strokeWidth="8" 
            strokeDasharray={dashArray} 
            strokeDashoffset={dashOffset} 
            strokeLinecap="square" 
            className="transition-all duration-[2.5s] ease-in-out" 
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-4xl font-black italic tracking-tighter" style={{ color }}>{score}</span>
        </div>
      </div>
      <span className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em] group-hover:text-white transition-colors">{label}</span>
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
          <span className="text-[9px] text-zinc-600 font-black uppercase tracking-widest mb-1 italic">Log::Metric</span>
          <span className="text-xs font-black text-zinc-300 group-hover:text-white transition-colors uppercase">{label}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-lg font-[1000] text-white italic">{audit.displayValue}</span>
        </div>
      </div>
      <div className="h-1 w-full bg-zinc-900 rounded-none overflow-hidden border border-zinc-900">
        <div 
          className={`h-full ${color} transition-all duration-[2s] ease-out`} 
          style={{ width: `${score * 100}%` }} 
        />
      </div>
    </div>
  );
}