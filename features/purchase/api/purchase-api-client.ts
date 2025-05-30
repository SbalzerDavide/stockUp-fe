import { api } from "@/core/api-client";
import { Purchase, PurchaseRequest } from "@/models/purchase.model";

// shoppingLists
export const getPurchases = async (): Promise<{
  // count: number;
  // next: string | null;
  // previous: string | null;
  // results: ShoppingList[];
}> => {
  try {
    const response = await api.get("/purchases/");
    return response.data;
  } catch (error) {
    console.error("Errore in getShoppingLists:", {
      error,
    });
    throw error;
  }
};

export const createPurchase = async (
  purchaseRequest: PurchaseRequest
): Promise<Purchase> => {
  try {
    const response = await api.post("/purchases/", purchaseRequest);
    return response.data;
  } catch (error) {
    console.error("Errore in createPurchases:", {
      error,
    });
    throw error;
  }
};

