export interface Item {
  id: string;
  name: string;
  description?: string;
  category?: ItemCategory;
  department?: string;
  is_edible: boolean;
  macronutriments: ItemMacronutriments;
  consumation_average_days?: number;
  price?: number;
  created_at: string;
  updated_at: string;
}

export interface createItemRequest {
  name: string;
  description?: string;
}

export interface ItemsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  department?: string;
  is_edible?: boolean;
  macronutriments?: string;
  consumation_average_days?: number;
  price?: number;
}

export interface ItemMacronutriments {
  id: number;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ItemCategory {
  id: number;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ItemDetail {
  id: 1;
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
  category?: {
    id: string;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
  };
  macronutriments?: {
    id: string;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
  };
  name: string;
  consumation_average_days?: any;
  department?: string;
  is_edible?: boolean;
  created_at: string;
  updated_at: string;
}
