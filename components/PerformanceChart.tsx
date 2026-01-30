import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { CalculatorOutputs } from '../types';

interface Props {
  outputs: CalculatorOutputs;
}

const PerformanceChart: React.FC<Props> = ({ outputs }) => {
  const data = [
    { name: 'إجمالي المبيعات', value: outputs.totalSales, color: '#10b981' },
    { name: 'القيمة الكلية LTV', value: outputs.ltv, color: '#8b5cf6' },
  ];

  // تحديد حجم العمود بناءً على عرض الشاشة التقريبي (سيستخدم ResponsiveContainer للقياس الفعلي)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

  return (
    <div className="w-full flex flex-col min-h-[350px] lg:min-h-[400px]">
      <div className="mb-6 lg:mb-8">
        <h2 className="text-lg lg:text-xl font-black text-slate-900 mb-1">تحليل العوائد والنمو</h2>
        <p className="text-slate-400 text-[10px] lg:text-xs font-bold">مقارنة بين المبيعات الفورية والقيمة الكلية للعملاء</p>
      </div>
      
      <div className="flex-grow min-w-0">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: isMobile ? 10 : 12, fill: '#64748b', fontWeight: 800 }} 
              axisLine={false} 
              tickLine={false} 
              dy={15}
            />
            <YAxis hide />
            <Tooltip 
              cursor={{ fill: 'rgba(241, 245, 249, 0.5)' }}
              contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', direction: 'rtl', fontSize: '12px' }}
              formatter={(value: number) => [`${value.toLocaleString('ar-SA')} ر.س`, '']}
            />
            <Bar dataKey="value" radius={[12, 12, 12, 12]} barSize={isMobile ? 50 : 80}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-6 lg:mt-8 flex flex-wrap justify-center gap-4 lg:gap-8">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
          <span className="text-[9px] lg:text-[10px] font-black text-slate-400 uppercase">المبيعات الحالية</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-purple-500"></div>
          <span className="text-[9px] lg:text-[10px] font-black text-slate-400 uppercase">القيمة الكلية LTV</span>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;