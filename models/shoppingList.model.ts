import { User } from "./auth.model";

export interface ShoppingList {
  id: string;
  name: string;
  description?: string;
  is_active: boolean;
  is_purchased: boolean;
  created_at: string;
  updated_at: string;
}

export interface ShoppingListItem {
  id: string;
  item_name: string;
  item_id: number;
  is_checked: boolean;
  is_propposed: boolean;
  macronutriments: string | null;
  emoji?: string;
  category: string | null;
  department: string | null;
  quantity: number;
  weight: number;
  unit_weight: string;
  volume: number;
  unit_volume: string;
}

export interface ShoppingListDetail {
  id: string;
  user: User;
  name: string;
  description?: string;
  is_active: boolean;
  is_purchased: boolean;
  created_at: string;
  updated_at: string;
  items: ShoppingListItem[];
}

export interface createShoppingListRequest {
  name: string;
  description?: string;
}

export interface createShoppingListItemRequest {
  shoppingListId: string,
  itemId: string
} 