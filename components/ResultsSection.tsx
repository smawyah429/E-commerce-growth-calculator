import React from 'react';
import { CalculatorOutputs } from '../types';

interface Props {
  outputs: CalculatorOutputs;
}

const ResultsSection: React.FC<Props> = ({ outputs }) => {
  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('ar-SA', { style: 'currency', currency: 'SAR', maximumFractionDigits: 0 }).format(val);
  
  const formatNumber = (val: number) => 
    new Intl.NumberFormat('ar-SA', { maximumFractionDigits: 1 }).format(val);

  const formatDecimal = (val: number) => 
    val.toLocaleString('ar-SA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const resultCards = [
    {
      label: 'عدد الطلبات (Orders)',
      value: formatNumber(outputs.orders),
      color: 'text-white',
      bg: 'bg-indigo-600',
    },
    {
      label: 'تكلفة الألف ظهور (CPM)',
      value: formatCurrency(outputs.cpm),
      color: 'text-slate-900',
      bg: 'bg-white border-slate-100',
    },
    {
      label: 'معدل الضغط (CTR)',
      value: formatDecimal(outputs.ctr) + '%',
      color: 'text-slate-900',
      bg: 'bg-white border-slate-100',
    },
    {
      label: 'نسبة المردود LTV : CAC',
      value: formatDecimal(outputs.ltvCacRatio) + 'x',
      color: 'text-emerald-700',
      bg: 'bg-emerald-50 border-emerald-100',
    },
    {
      label: 'إجمالي المبيعات (Total Sales)',
      value: formatCurrency(outputs.totalSales),
      color: 'text-white',
      bg: 'bg-emerald-600 shadow-emerald-500/20',
      span: 'sm:col-span-2 lg:col-span-2'
    },
    {
      label: 'العائد الفوري (ROAS)',
      value: formatDecimal(outputs.roas),
      color: 'text-blue-700',
      bg: 'bg-white border-blue-50',
    },
    {
      label: 'القيمة الكلية للعميل (LTV)',
      value: formatCurrency(outputs.ltv),
      color: 'text-purple-700',
      bg: 'bg-purple-50 border-purple-100',
    },
    {
      label: 'تكلفة الاستحواذ (CAC)',
      value: formatCurrency(outputs.cac),
      color: 'text-rose-600',
      bg: 'bg-white border-rose-50',
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
      {resultCards.map((card, idx) => (
        <div key={idx} className={`${card.bg} ${card.span || ''} metric-card-hover p-6 lg:p-8 rounded-2xl lg:rounded-[2rem] shadow-lg flex flex-col justify-center border-2 border-transparent transition-all`}>
          <h3 className={`text-[9px] lg:text-[10px] font-black uppercase tracking-[0.1em] lg:tracking-[0.2em] mb-2 lg:mb-3 opacity-80 ${card.color}`}>
            {card.label}
          </h3>
          <div className="flex items-baseline gap-2">
            <span className={`text-2xl lg:text-3xl font-black ${card.color}`}>
              {card.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResultsSection;