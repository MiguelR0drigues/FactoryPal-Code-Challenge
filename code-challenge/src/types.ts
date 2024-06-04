export interface MetricsData {
  id: string;
  label: string;
  value: number;
  type: ValueType;
  description: string;
  category: Category;
}

export type ValueType = "percentage" | "number" | "secs" | "minutes" | "hours";

export type Category = "efficiency" | "shift" | "downtime";

export interface APIData {
  data: MetricsData[];
}
