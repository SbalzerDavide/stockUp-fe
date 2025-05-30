import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useShowToast } from "@/hooks/useShowToast";
import { createPurchase } from "./purchase-api-client";
import { PurchaseRequest } from "@/models/purchase.model";

// Chiave per la query degli items
export const ITEMS_QUERY_KEY = ["items"] as const;

// purchase
// create
export function useCreatePurchase() {
  const showToast = useShowToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (purchaseRequest: PurchaseRequest) =>
      createPurchase(purchaseRequest),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["shoppingLists"] });
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
