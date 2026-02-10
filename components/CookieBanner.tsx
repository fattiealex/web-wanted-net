'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie } from 'lucide-react';
import Link from 'next/link';
export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent_log');
    if (!consent) setIsVisible(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie_consent_log', 'authorized');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-10 md:w-96 bg-black border-2 border-[#00ff41] p-6 z-[9999] shadow-[0_0_20px_rgba(0,255,65,0.2)] font-mono"
        >
          <div className="flex items-start gap-4">
            <div className="bg-[#00ff41]/10 p-2 border border-[#00ff41]/30">
              <Cookie className="text-[#00ff41] h-6 w-6 animate-pulse" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-black text-xs uppercase tracking-tighter mb-2 italic">
                [ COOKIE_LOG_DETECTED ]
              </h3>
              <p className="text-zinc-500 text-[10px] leading-tight uppercase font-bold mb-4">
                System requires local storage authorization to optimize your digital trajectory. 
                Third-party assets may be cached.
              </p>
              <div className="flex gap-4 items-center">
                <button
                  onClick={acceptCookies}
                  className="bg-[#00ff41] text-black px-4 py-2 text-[10px] font-black uppercase hover:bg-white transition-all italic"
                >
                  [ AUTHORIZE_SESSION ]
                </button>
                <Link href="/privacy" className="text-zinc-700 text-[9px] uppercase hover:text-[#00ff41] underline underline-offset-4">
                  Privacy_Protocol
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}