export interface PurchaseRequest {
  total_cost: number;
  total_items?: number;
  store?: string;
  purchase_date?: string;
}

export interface Purchase {
  id: number;
  shopping_list: any;
  total_cost: number;
  total_items?: number;
  store?: string;
  purchase_date?: string;
  created_at: string;
  updated_at: string;
}