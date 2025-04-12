import { Text } from "react-native";
import { Box } from "@/components/ui/box";

import React from "react";
import {
  useInvalidateItems,
  useItems,
} from "@/features/shoppingList/api/shoppingList.mutations";
import { useAuth } from "@/components/providers/auth.provider";

const Homepage = () => {
  // const { data: items, isLoading, error } = useItems({
  //   search: "",
  // });

  // Hook per invalidare la cache (utile dopo operazioni di modifica)
  const invalidateItems = useInvalidateItems();

  const { logout } = useAuth();


  return (
    <>
      <Box className="flex-1 justify-center items-center">
        <Text className="text-typography-900 text-2xl">Homepage</Text>
        {/* <ul>
          {items?.map((item: any) => (
            <li key={item.id}>
              <Text key={item.id}>{item.name}</Text>
            </li>
          ))}
        </ul> */}
        <Text className="text-typography-900 text-2xl" onPress={() => logout()}>Logout</Text>
      </Box>
    </>
  );
};

export default Homepage;
