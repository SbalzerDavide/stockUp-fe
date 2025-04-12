import { api } from "@/core/api-client";
import {
  createItemRequest,
  Item,
  ItemsQueryParams,
} from "@/models/items.model";
import { ItemMacronutriments, ItemCategory } from "@/models/items.model";

import { ShoppingList } from "@/models/shoppingList.model";

// shoppingList
export const getShoppingLists = async (): Promise<{
  count: number;
  next: string | null;
  previous: string | null;
  results: ShoppingList[];
}> => {
  try {
    const response = await api.get("/shopping-lists/");
    return response.data;
  } catch (error) {
    console.error("Errore in getShoppingLists:", {
      error,
    });
    throw error;
  }  
};

export const getItems = async (
  params: ItemsQueryParams
): Promise<{
  count: number;
  next: string | null;
  previous: string | null;
  results: Item[];
}> => {
  try {
    // const response = await api.get("/items/?macronutriments=1");
    const response = await api.get("/items", { params });
    return response.data;
  } catch (error) {
    console.error("Errore in getItems:", {
      error,
    });
    throw error;
  }
};

export const getItemMacronutriments = async (): Promise<
  ItemMacronutriments[]
> => {
  try {
    const response = await api.get("/item-macronutriments/");
    return response.data;
  } catch (error) {
    console.error("Errore in getMacronutriments:", {
      error,
    });
    throw error;
  }
};

export const getItemCategories = async (): Promise<ItemCategory[]> => {
  try {
    const response = await api.get("/item-categories/");
    return response.data;
  } catch (error) {
    console.error("Errore in getItemCategories:", {
      error,
    });
    throw error;
  }
};
export const createItem = async (item: createItemRequest): Promise<Item> => {
  try {
    const response = await api.post("/items/", item);
    return response.data;
  } catch (error) {
    console.error("Errore in createItem:", {
      error,
    });
    throw error;
  }
};
