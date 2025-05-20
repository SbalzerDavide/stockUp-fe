import { api } from "@/core/api-client";
import {
  createItemRequest,
  Item,
  ItemDetail,
  ItemsQueryParams,
} from "@/models/items.model";
import { ItemMacronutriments, ItemCategory } from "@/models/items.model";

import { createShoppingListRequest, ShoppingList, ShoppingListDetail, createShoppingListItemRequest, ShoppingListItem, ShoppingListItemDetail } from "@/models/shoppingList.model";

// shoppingLists
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

export const getShoppingList  = async (id: string): Promise<ShoppingListDetail> => {
  try {
    const response = await api.get(`/shopping-lists/${id}`);
    return response.data;
  } catch (error) {
    console.error("Errore in getShoppingListItems:", {
      error,
    });
    throw error;
  }
};

export const createShoppingList = async (shoppingList: createShoppingListRequest): Promise<ShoppingList> => {
  try {
    const response = await api.post("/shopping-lists/", shoppingList);
    return response.data;
  } catch (error) {
    console.error("Errore in createShoppingList:", {
      error,
    });
    throw error;
  }
};


// items
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

export const getItem  = async (id: string): Promise<ItemDetail> => {
  try {
    const response = await api.get(`/items/${id}`);
    return response.data;
  } catch (error) {
    console.error("Errore in getItemDetail:", {
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

// macronutriments
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

// categories
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

// shoppingListItems
export const shoppingListItem = async (id: string): Promise<ShoppingListItemDetail> => {
  try {
    const response = await api.get(`/shopping_list_items/${id}`);
    return response.data;
  } catch (error) {
    console.error("Errore in getShoppingListItemDetail:", {
      error,
    });
    throw error;
  }
}

export const createShoppingListItem = async (
  createShoppingListItemRequest: createShoppingListItemRequest
): Promise<ShoppingListDetail> => {
  try {
    const response = await api.post(
      `/shopping_list_items/`,
      {
        item_id: createShoppingListItemRequest.itemId,
        shopping_list_id: createShoppingListItemRequest.shoppingListId,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Errore in createShoppingListItem:", {
      error,
    });
    throw error;
  }
}

