'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SecureCV() {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleDownload = () => {
    if (password.toLowerCase() === 'light') {
      // Името на файла трябва да съвпада точно с това в public папката
      const link = document.createElement('a');
      link.href = '/1001_Alexander_Krastev - ENG.pdf';
      link.download = 'Alexander_Krastev_CV.pdf';
      link.click();
      
      setIsOpen(false);
      setPassword('');
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className="flex flex-col items-center font-mono">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="text-[#00ff41] border border-[#00ff41] px-4 py-2 hover:bg-[#00ff41] hover:text-black transition-all duration-300 uppercase text-xs tracking-widest"
        >
          [ GET_CV_ACCESS ]
        </button>
      ) : (
        <AnimatePresence>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-2 bg-black border border-zinc-800 p-4 shadow-2xl"
          >
            <span className="text-[10px] text-zinc-500 uppercase">System: Enter_Key_to_Decrypt</span>
            <div className="flex gap-2">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleDownload()}
                placeholder="PASSWORD..."
                className="bg-zinc-900 border border-zinc-700 text-[#00ff41] px-3 py-1 outline-none text-sm focus:border-[#00ff41]"
                autoFocus
              />
              <button 
                onClick={handleDownload}
                className="bg-[#00ff41] text-black px-3 py-1 text-xs font-bold uppercase"
              >
                RUN
              </button>
            </div>
            {error && <span className="text-red-600 text-[10px] uppercase">Access_Denied: Incorrect_Key</span>}
            <button 
              onClick={() => setIsOpen(false)}
              className="text-zinc-600 text-[9px] uppercase hover:text-zinc-400 text-left"
            >
              Cancel_Process
            </button>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}