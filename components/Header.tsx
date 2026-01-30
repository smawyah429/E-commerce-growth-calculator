
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-white/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-400 blur-lg opacity-30 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 p-3 rounded-2xl shadow-xl border border-white/20">
              <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 leading-tight">حاسبة النمو الذكية</h1>
            <div className="flex items-center gap-2">
               <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
               <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">إيز مارك • 2026</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col items-end border-r-2 border-slate-100 pr-5">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">العملة والمنطقة</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-slate-700">SAR / السعودية</span>
              <img src="https://flagcdn.com/w20/sa.png" className="w-4 rounded-sm" alt="SA" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
