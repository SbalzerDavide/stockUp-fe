export interface Filter {
  id: string;
  name: string;
  options: FilterOption[] | undefined;
  value: string | boolean | null;
}

export interface FilterOption {
  id: string | boolean;
  name: string;
}
