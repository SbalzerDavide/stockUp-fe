export interface ShoppingList {
  id: number;
  name: string;
  description?: string;
  is_active: boolean;
  is_purchased: boolean;
  created_at: string;
  updated_at: string;
}

export interface createShoppingListRequest {
  name: string;
  description?: string;
}