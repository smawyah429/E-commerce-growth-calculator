
import React, { useState } from 'react';
import { CalculatorInputs, CalculatorOutputs } from '../types';
import { analyzeEcommMetrics } from '../services/geminiService';

interface Props {
  inputs: CalculatorInputs;
  outputs: CalculatorOutputs;
}

const AIInsights: React.FC<Props> = ({ inputs, outputs }) => {
  const [loading, setLoading] = useState(false);
  const [insight, setInsight] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    const result = await analyzeEcommMetrics(inputs, outputs);
    setInsight(result || "لا يوجد تحليل متوفر حالياً.");
    setLoading(false);
  };

  return (
    <div className="bg-slate-900 rounded-[2rem] shadow-2xl p-8 h-full flex flex-col relative overflow-hidden border border-slate-800">
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/20 rounded-full blur-3xl"></div>
      
      <div className="flex items-center justify-between mb-8 relative z-10">
        <h2 className="text-xl font-bold text-white flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-purple-600/20 flex items-center justify-center text-purple-400">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13.536 14.243a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707zM16 18a1 1 0 100-2 1 1 0 000 2z" />
            </svg>
          </span>
          رؤى الذكاء الاصطناعي
        </h2>
        <button 
          onClick={handleAnalyze}
          disabled={loading}
          className="bg-white text-slate-900 hover:bg-emerald-400 px-6 py-2.5 rounded-2xl text-sm font-black transition-all disabled:opacity-50 shadow-lg shadow-white/5 active:scale-95"
        >
          {loading ? 'جاري التحليل...' : 'اطلب استشارة'}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto relative z-10 scrollbar-hide">
        {!insight && !loading ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-4 py-10 opacity-60">
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-slate-700 flex items-center justify-center">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <p className="text-sm font-bold tracking-wide">جاهز لتحليل أرقام متجرك بدقة</p>
          </div>
        ) : (
          <div className="animate-fadeIn">
            <div className="text-slate-200 text-sm leading-relaxed bg-slate-800/50 p-6 rounded-[1.5rem] border border-slate-700/50 backdrop-blur-sm whitespace-pre-wrap">
              <div className="flex gap-1 mb-4">
                <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
              </div>
              {insight}
            </div>
          </div>
        )}
      </div>
      
      <p className="mt-6 text-[9px] text-slate-500 font-bold uppercase tracking-widest text-center">
        Powered by Gemini 3 Flash Engine
      </p>
    </div>
  );
};

export default AIInsights;
