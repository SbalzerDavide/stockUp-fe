import { api } from "@/core/api-client";
import {
  createItemRequest,
  Item,
  ItemDetail,
  ItemsQueryParams,
} from "@/models/items.model";
import { ItemMacronutriments, ItemCategory } from "@/models/items.model";

import {
  createShoppingListRequest,
  ShoppingList,
  ShoppingListDetail,
  createShoppingListItemRequest,
  ShoppingListItem,
  ShoppingListItemDetail,
  UpdateShoppingListItemRequest,
  UpdateShoppingListRequest,
  ShoppingListQueryParams,
} from "@/models/shoppingList.model";

// shoppingLists
export const getShoppingLists = async (
  params: ShoppingListQueryParams
): Promise<{
  count: number;
  next: string | null;
  previous: string | null;
  results: ShoppingList[];
}> => {
  try {
    const response = await api.get("/shopping-lists/", {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Errore in getShoppingLists:", {
      error,
    });
    throw error;
  }
};

export const getShoppingList = async (
  id: string
): Promise<ShoppingListDetail> => {
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

export const createShoppingList = async (
  shoppingList: createShoppingListRequest
): Promise<ShoppingList> => {
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

export const updateShoppingList = async (
  id: string,
  shoppingList: UpdateShoppingListRequest
): Promise<ShoppingList> => {
  try {
    const response = await api.put(`/shopping-lists/${id}/`, shoppingList);
    return response.data;
  } catch (error) {
    console.error("Errore in updateShoppingList:", {
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

export const getItem = async (id: string): Promise<ItemDetail> => {
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
export const shoppingListItem = async (
  id: string
): Promise<ShoppingListItemDetail> => {
  try {
    const response = await api.get(`/shopping_list_items/${id}`);
    return response.data;
  } catch (error) {
    console.error("Errore in getShoppingListItemDetail:", {
      error,
    });
    throw error;
  }
};

export const createShoppingListItem = async (
  createShoppingListItemRequest: createShoppingListItemRequest
): Promise<ShoppingListDetail> => {
  try {
    const response = await api.post(`/shopping_list_items/`, {
      item_id: createShoppingListItemRequest.itemId,
      shopping_list_id: createShoppingListItemRequest.shoppingListId,
    });
    return response.data;
  } catch (error) {
    console.error("Errore in createShoppingListItem:", {
      error,
    });
    throw error;
  }
};

export const updateShoppingListItem = async (
  itemId: number,
  updateShoppingListItemRequest: UpdateShoppingListItemRequest
): Promise<ShoppingListItemDetail> => {
  try {
    const response = await api.put(`/shopping_list_items/${itemId}/`, {
      // id: itemId,
      ...updateShoppingListItemRequest,
    });
    return response.data;
  } catch (error) {
    console.error("Errore in updateShoppingListItem:", {
      error,
    });
    throw error;
  }
};

export const deleteShoppingListItem = async (itemId: number): Promise<any> => {
  try {
    const response = await api.delete(`/shopping_list_items/${itemId}/`);
    return response.data;
  } catch (error) {
    console.error("Errore in deleteShoppingListItem:", {
      error,
    });
    throw error;
  }
};
