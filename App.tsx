import React, { useState, useMemo, useEffect } from 'react';
import { CalculatorInputs, CalculatorOutputs } from './types';
import Header from './components/Header';
import InputSection from './components/InputSection';
import ResultsSection from './components/ResultsSection';
import PerformanceChart from './components/PerformanceChart';

const App: React.FC = () => {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    cvr: 3.0,
    clicks: 2000,
    impressions: 100000,
    adSpend: 1500,
    aov: 250,
    itemsPerOrder: 1.5,
    purchaseFrequency: 1.2,
    avgOrdersPerYear: 3,
  });

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const outputs = useMemo<CalculatorOutputs>(() => {
    const orders = inputs.clicks * (inputs.cvr / 100);
    const totalSales = orders * inputs.aov;
    const cac = orders > 0 ? inputs.adSpend / orders : 0;
    const roas = inputs.adSpend > 0 ? totalSales / inputs.adSpend : 0;
    
    const cpm = inputs.impressions > 0 ? (inputs.adSpend / inputs.impressions) * 1000 : 0;
    const ctr = inputs.impressions > 0 ? (inputs.clicks / inputs.impressions) * 100 : 0;
    const ltv = inputs.aov * inputs.avgOrdersPerYear;
    const ltvCacRatio = cac > 0 ? ltv / cac : 0;

    return {
      orders,
      cpm,
      ctr,
      ltvCacRatio,
      totalSales,
      roas,
      ltv,
      cac
    };
  }, [inputs]);

  const handleInputChange = (name: keyof CalculatorInputs, value: number) => {
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-emerald-500 selection:text-white pb-10">
      <Header />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 lg:mt-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          
          {/* الجانب الأيمن: مدخلات التاجر */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 z-30 lg:max-h-[calc(100vh-120px)] overflow-visible">
            <InputSection inputs={inputs} onInputChange={handleInputChange} />
          </aside>

          {/* الجانب الأيسر: المخرجات والنتائج */}
          <div className="lg:col-span-8 space-y-6 lg:space-y-10 min-w-0">
            
            <section className="relative">
              <div className="flex items-center gap-4 mb-4 lg:mb-6 px-2">
                <span className="h-px bg-slate-200 flex-1"></span>
                <h2 className="text-[10px] lg:text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] lg:tracking-[0.3em] whitespace-nowrap">تحليل الأداء والمخرجات</h2>
                <span className="h-px bg-slate-200 flex-1"></span>
              </div>
              <ResultsSection outputs={outputs} />
            </section>
            
            <section className="bg-white rounded-3xl lg:rounded-[2.5rem] p-4 lg:p-6 shadow-xl border border-white">
              <PerformanceChart outputs={outputs} />
            </section>
            
            <div className="bg-slate-900 rounded-3xl lg:rounded-[2rem] p-6 lg:p-8 text-center sm:text-right flex flex-col sm:flex-row items-center gap-4 lg:gap-6 border border-slate-800 shadow-2xl">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 shrink-0">
                <svg className="w-6 h-6 lg:w-7 lg:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-white font-bold text-base lg:text-lg mb-1">دقة التقارير</h4>
                <p className="text-slate-400 text-xs lg:text-sm">يتم تحديث جميع مخرجات الأداء تلقائياً لتعكس واقع متجرك فور تعديل المدخلات.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-16 lg:mt-20 pt-10 lg:pt-16 pb-12 lg:pb-20 bg-white border-t border-slate-100 w-full">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center">
          <div className="bg-slate-50 p-4 lg:p-6 rounded-3xl border border-slate-100 inline-block mb-4 lg:mb-6">
            <h2 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight mb-2">إيز مارك</h2>
            <div className="h-1 w-10 lg:w-12 bg-emerald-500 mx-auto rounded-full mb-3"></div>
            <p className="text-slate-500 font-bold text-xs lg:text-sm tracking-wide">
              حاسبة نمو التجارة الإلكترونية المستقلة • SAR
            </p>
          </div>
          <div className="text-slate-400 text-[10px] lg:text-xs font-medium">
            &copy; {new Date().getFullYear()} إيز مارك - جميع الحقوق محفوظة
          </div>
        </div>
      </footer>

      <button 
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 lg:bottom-8 lg:left-8 z-50 p-3 lg:p-4 bg-slate-900 text-white rounded-full shadow-2xl transition-all duration-300 transform ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}
      >
        <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
};

export default App;