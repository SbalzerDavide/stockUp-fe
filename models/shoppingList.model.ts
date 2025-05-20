import { User } from "./auth.model";
import { Item, ItemCategory } from "./items.model";

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
  category: ItemCategory | null;
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

export interface ShoppingListItemDetail {
    id: number;
    item: Item;
    item_id: number;
    shopping_list_id: number;
    shopping_list: {
        id: number;
        name: string;
    },
    is_checked: boolean;
    is_proposed: boolean;
    quantity: number;
    volume: number | null,
    weight: number | null,
    unit_volume: string | null,
    unit_weight: string | null,
    created_at: string;
    updated_at: string;
}


export interface createShoppingListRequest {
  name: string;
  description?: string;
}

export interface createShoppingListItemRequest {
  shoppingListId: string,
  itemId: string
} 