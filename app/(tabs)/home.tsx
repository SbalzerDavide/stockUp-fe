import { Text, View } from "react-native";
import { Box } from "@/components/ui/box";

import {
  Plus,
  Home,
  MessageCircle,
  User,
  SlidersHorizontal,
} from "lucide-react-native";

import React from "react";
import {
  useInvalidateItems,
  useItems,
} from "@/features/items/api/items.mutations";

const Homepage = () => {
  const { data: items, isLoading, error } = useItems();

  // Hook per invalidare la cache (utile dopo operazioni di modifica)
  const invalidateItems = useInvalidateItems();

  const [activeTab, setActiveTab] = React.useState("Home");

  return (
    <>
      <Box className="flex-1 justify-center items-center">
        <Text className="text-typography-900 text-2xl">Homepage</Text>
        {/* <ul>
          {items.map((item: any) => (
            <Text key={item.id}>{item.name}</Text>
          ))}
        </ul> */}
      </Box>
    </>
  );
};

export default Homepage;
