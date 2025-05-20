import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createItem,
  getItems,
  getItemMacronutriments,
  getItemCategories,
  getShoppingLists,
  createShoppingList,
  createShoppingListItem,
  getShoppingList,
  getItem,
  shoppingListItem,
} from "./shoppingList-api-client";
import { createItemRequest, ItemsQueryParams } from "@/models/items.model";
import { useShowToast } from "@/hooks/useShowToast";
import {
  createShoppingListItemRequest,
  createShoppingListRequest,
} from "@/models/shoppingList.model";

// Chiave per la query degli items
export const ITEMS_QUERY_KEY = ["items"] as const;

// shoppingList
// index
export function useShoppingLists() {
  return useQuery({
    queryKey: ["shoppingLists"],
    queryFn: () => getShoppingLists(),
  });
}

// get
export function useShoppingList(id: string) {
  return useQuery({
    queryKey: ["shoppingListItems", id],
    queryFn: () => getShoppingList(id),
  });
}

// create
export function useCreateShoppingList() {
  const showToast = useShowToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (shoppingList: createShoppingListRequest) =>
      createShoppingList(shoppingList),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shoppingLists"] });
    },
    onError: (error) => {
      showToast({
        titleKey: "toasts.error.title",
        descriptionKey: "toasts.error.createFailed",
        action: "error",
      });
    },
  });
}


// items
export function useItems(params: ItemsQueryParams) {
  return useQuery({
    queryKey: [...ITEMS_QUERY_KEY, params],
    queryFn: () => getItems(params),
    // Opzioni aggiuntive della query
    staleTime: 5 * 60 * 1000, // Considera i dati "freschi" per 5 minuti
    gcTime: 30 * 60 * 1000, // Mantieni i dati in cache per 30 minuti
  });
}

export function useItem(id: string) {
  return useQuery({
    queryKey: ["itemDetail", id],
    queryFn: () => getItem(id),
  });
}

export function useCreateItem() {
  const showToast = useShowToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (item: createItemRequest) => createItem(item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY });
    },
    onError: (error) => {
      showToast({
        titleKey: "toasts.error.title",
        descriptionKey: "toasts.error.createFailed",
        action: "error",
      });
    },
  });
}

// shoppingListItems
// get
export function useShoppingListItem(id: string) {
  return useQuery({
    queryKey: ["shoppingListItemDetail", id],
    queryFn: () => shoppingListItem(id),
  });
}

// create
export function useCreateShoppingListItem() {
  const showToast = useShowToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      createShoppingListItemRequest: createShoppingListItemRequest
    ) => createShoppingListItem(createShoppingListItemRequest),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shoppingListItems"] });
    },
    onError: (error) => {
      showToast({
        titleKey: "toasts.error.title",
        descriptionKey: "toasts.error.createFailed",
        action: "error",
      });
    },
  });
}


// macronutriments
export function useMacronutriments() {
  return useQuery({
    queryKey: ["macronutriments"],
    queryFn: () => getItemMacronutriments(),
    // Opzioni aggiuntive della query
    staleTime: 5 * 60 * 1000, // Considera i dati "freschi" per 5 minuti
    gcTime: 30 * 60 * 1000, // Mantieni i dati in cache per 30 minuti
  });
}


// categories
export function useItemCategories() {
  return useQuery({
    queryKey: ["itemCategories"],
    queryFn: () => getItemCategories(),
  });
}

// Hook per invalidare la cache degli items
export function useInvalidateItems() {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY });
  };
}
