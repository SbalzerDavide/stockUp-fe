import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getItems } from './items-api-client';

// Chiave per la query degli items
export const ITEMS_QUERY_KEY = ['items'] as const;

// to add in parameters for pagination and filters
interface ItemsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
}

// Hook per recuperare gli items
export function useItems() {
  return useQuery({
    queryKey: [...ITEMS_QUERY_KEY],
    queryFn: () => getItems(),
    // Opzioni aggiuntive della query
    staleTime: 5 * 60 * 1000, // Considera i dati "freschi" per 5 minuti
    gcTime: 30 * 60 * 1000, // Mantieni i dati in cache per 30 minuti
  });
}

// Hook per invalidare la cache degli items
export function useInvalidateItems() {
  const queryClient = useQueryClient();
  
  return () => {
    queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY });
  };
}
