import { Category } from "./categories.model";
import { Macronutriments } from "./macronutriments.model";

export interface Item {
  id: number;
  name: string;
  description?: string;
  category?: Category;
  department?: string;
  is_edible: boolean;
  macronutriments: Macronutriments;
  consumation_average_days?: number;
  price?: number;
  created_at: string;
  updated_at: string;
}
