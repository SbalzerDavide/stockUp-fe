import { api } from "@/core/api-client";
import { Pantry } from "@/models/pantries.model";

// pantries
export const getPantries = async (): Promise<
  Pantry[]
> => {
  try {
    const response = await api.get("/pantries/");
    return response.data;
  } catch (error) {
    console.error("Errore in getMacronutriments:", {
      error,
    });
    throw error;
  }
};
