import { useQuery } from "@tanstack/react-query";
import { getPantries } from "./stock-api-client";

// pantries
export function usePantries() {
  return useQuery({
    queryKey: ["pantries"],
    queryFn: () => getPantries(),
  });
}
