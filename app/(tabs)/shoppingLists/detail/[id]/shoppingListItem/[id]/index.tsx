import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";


import { Minus, Plus } from "lucide-react-native";



import { useShoppingListItem } from "@/features/shoppingList/api/shoppingList.mutations";
import { Stack, useLocalSearchParams } from "expo-router";
import { Pressable } from "react-native";

export default function shoppingListItemDetailScreen() {
  const { id } = useLocalSearchParams();

  const {
    data: shoppingListItem,
    isLoading,
    error,
  } = useShoppingListItem(id as string);

  const handleCreateItem = async () => {
    console.log("update quantity");
  };

  return (
    <>
      <Stack.Screen options={{ headerTitle: shoppingListItem?.item.name }} />

      <ThemedView className="flex-col justify-end !bg-background-900 gap-2 w-full h-full">
        <Box className="flex-col mb-8">
          <Box className="flex-row justify-center items-center gap-5">
            <Pressable
              className="bg-primary-400 rounded-lg p-2"
              onPress={() => handleCreateItem()}
            >
              <Minus></Minus>
            </Pressable>
            <ThemedText>{shoppingListItem?.quantity}</ThemedText>
            <Pressable
              className="bg-primary-400 h-10 w-10 rounded-lg p-2"
              onPress={() => handleCreateItem()}
            >
              <Plus></Plus>
            </Pressable>
          </Box>
          <ThemedText className="text-lg font-bold">
            {shoppingListItem?.item.name}
          </ThemedText>
        </Box>
      </ThemedView>
    </>
  );
}
