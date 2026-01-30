
import { GoogleGenAI } from "@google/genai";
import { CalculatorInputs, CalculatorOutputs } from "../types";

// Initialize the Google GenAI client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzeEcommMetrics(inputs: CalculatorInputs, outputs: CalculatorOutputs) {
  // Corrected property access: clicks and adSpend are members of CalculatorInputs, not CalculatorOutputs.
  const prompt = `
    أنت مستشار نمو خبير. قم بتحليل أرقام المتجر التالية:
    
    المدخلات:
    - التحويل (CVR): ${inputs.cvr}%
    - زيارات (Clicks): ${inputs.clicks}
    - إنفاق إعلاني: ${inputs.adSpend} ر.س
    - متوسط السلة (AOV): ${inputs.aov} ر.س
    
    النتائج:
    - المبيعات: ${outputs.totalSales} ر.س
    - العائد ROAS: ${outputs.roas}
    - تكلفة الاستحواذ CAC: ${outputs.cac} ر.س
    
    المطلوب:
    1. تحليل سريع لتكلفة الاستحواذ.
    2. نصيحة واحدة عملية للنمو.
    3. تقييم جودة الأرقام الحالية.
    
    أجب بنقاط مختصرة جداً وباللغة العربية.
  `;

  try {
    // Using gemini-3-flash-preview for text analysis task as per guidelines
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        temperature: 0.7,
      }
    });
    // Correctly accessing the .text property of GenerateContentResponse (not a method)
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "تعذر التحليل حالياً، يرجى المحاولة لاحقاً.";
  }
}
