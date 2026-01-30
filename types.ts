
export interface CalculatorInputs {
  cvr: number;
  clicks: number;
  impressions: number;
  adSpend: number;
  aov: number;
  itemsPerOrder: number;
  purchaseFrequency: number;
  avgOrdersPerYear: number;
}

export interface CalculatorOutputs {
  orders: number;
  cpm: number;
  ctr: number;
  ltvCacRatio: number;
  totalSales: number;
  roas: number;
  ltv: number;
  cac: number;
}
