import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createItem, getItems, getItemMacronutriments, getItemCategories, getShoppingLists } from './shoppingList-api-client';
import { createItemRequest, ItemsQueryParams } from '@/models/items.model';
import { useShowToast } from '@/hooks/useShowToast';

// Chiave per la query degli items
export const ITEMS_QUERY_KEY = ['items'] as const;


export function useItems(params: ItemsQueryParams) {
  return useQuery({
    queryKey: [...ITEMS_QUERY_KEY, params],
    queryFn: () => getItems(params),
    // Opzioni aggiuntive della query
    staleTime: 5 * 60 * 1000, // Considera i dati "freschi" per 5 minuti
    gcTime: 30 * 60 * 1000, // Mantieni i dati in cache per 30 minuti
  });
}

export function useShoppingLists() {
  return useQuery({
    queryKey: ['shoppingLists'],
    queryFn: () => getShoppingLists(),
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
        action: "error"
      });
    },
  });
}

export function useMacronutriments() {
  return useQuery({
    queryKey: [...ITEMS_QUERY_KEY],
    queryFn: () => getItemMacronutriments(),
    // Opzioni aggiuntive della query
    staleTime: 5 * 60 * 1000, // Considera i dati "freschi" per 5 minuti
    gcTime: 30 * 60 * 1000, // Mantieni i dati in cache per 30 minuti
  });
}

export function useItemCategories() {
  return useQuery({
    queryKey: [...ITEMS_QUERY_KEY],
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
