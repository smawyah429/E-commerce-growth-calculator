import React from 'react';
import { CalculatorInputs } from '../types';

interface Props {
  inputs: CalculatorInputs;
  onInputChange: (name: keyof CalculatorInputs, value: number) => void;
}

const InputSection: React.FC<Props> = ({ inputs, onInputChange }) => {
  const fields = [
    { id: 'cvr', label: 'معدل التحويل', sub: 'CVR %', color: 'border-blue-200' },
    { id: 'clicks', label: 'عدد الزيارات', sub: 'Clicks', color: 'border-indigo-200' },
    { id: 'impressions', label: 'عدد مرات الظهور', sub: 'Impressions', color: 'border-slate-200' },
    { id: 'adSpend', label: 'الإنفاق الإعلاني', sub: 'Ad Spend (SAR)', color: 'border-emerald-200' },
    { id: 'aov', label: 'متوسط قيمة الطلب', sub: 'AOV (SAR)', color: 'border-orange-200' },
    { id: 'itemsPerOrder', label: 'متوسط عدد القطع في الطلب', sub: 'Units/Order', color: 'border-rose-200' },
    { id: 'purchaseFrequency', label: 'معدل تكرار الشراء (٦ أشهر)', sub: 'Frequency', color: 'border-purple-200' },
    { id: 'avgOrdersPerYear', label: 'متوسط الطلبات للعميل (١ سنة)', sub: 'Annual Orders', color: 'border-cyan-200' },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl p-6 lg:p-8 rounded-3xl lg:rounded-[2.5rem] shadow-2xl border border-white relative overflow-hidden">
      <div className="mb-6 lg:mb-10 text-right">
        <h2 className="text-xl lg:text-2xl font-black text-slate-900 mb-1 lg:mb-2">مدخلات الأداء</h2>
        <p className="text-slate-500 text-[10px] lg:text-xs font-medium">قم بتعبئة البيانات لتحليل نمو متجرك</p>
      </div>
      
      <div className="space-y-4 lg:space-y-6">
        {fields.map((field) => (
          <div key={field.id} className="group">
            <div className="flex justify-between items-center mb-1.5 px-1">
              <label htmlFor={field.id} className="text-xs lg:text-sm font-bold text-slate-700">
                {field.label}
              </label>
              <span className="text-[9px] lg:text-[10px] font-black text-slate-400 uppercase tracking-tighter">{field.sub}</span>
            </div>
            <div className="relative">
              <input
                type="number"
                id={field.id}
                value={inputs[field.id as keyof CalculatorInputs]}
                onChange={(e) => onInputChange(field.id as keyof CalculatorInputs, parseFloat(e.target.value) || 0)}
                className={`w-full px-4 lg:px-5 py-2.5 lg:py-3.5 rounded-xl lg:rounded-2xl border-2 ${field.color} bg-slate-50/30 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none text-slate-900 font-extrabold text-sm lg:text-base text-right`}
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 lg:mt-10 p-4 lg:p-5 bg-slate-900 rounded-2xl lg:rounded-3xl text-center shadow-lg">
        <p className="text-[9px] lg:text-[10px] font-bold text-emerald-400 uppercase tracking-[0.2em]">
          أرقام دقيقة للنمو (SAR)
        </p>
      </div>
    </div>
  );
};

export default InputSection;