import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";

import { Minus, Plus, Trash } from "lucide-react-native";

import {
  useDeleteShoppingListItem,
  useShoppingListItem,
  useUpdateShoppingListItem,
} from "@/features/shoppingList/api/shoppingList.mutations";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Pressable } from "react-native";
import { useTranslation } from "react-i18next";

export default function shoppingListItemDetailScreen() {
  const { id } = useLocalSearchParams();
  const { t } = useTranslation();
  const router = useRouter();

  const {
    data: shoppingListItem,
    isLoading,
    error,
  } = useShoppingListItem(id as string);

  const {
    mutate: updateShoppingListitem,
    isPending: isPendingShoppingListItem,
    isSuccess: isSuccessShoppingListItem,
  } = useUpdateShoppingListItem();

  const { mutate: deleteShoppingListitem } = useDeleteShoppingListItem();

  const handleCreateItem = async (quantity: number) => {
    if (shoppingListItem?.quantity !== undefined) {
      console.log("update quantity", shoppingListItem.quantity);
      updateShoppingListitem({
        itemId: shoppingListItem?.id,
        updateShoppingListItemRequest: {
          quantity: shoppingListItem.quantity + quantity,
        },
      });
    }
  };

  const handleDeleteItem = async () => {
    if (shoppingListItem?.id !== undefined) {
      deleteShoppingListitem(shoppingListItem.id);
      router.back();
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerTitle: shoppingListItem?.item.name }} />

      <ThemedView className="flex-col justify-end !bg-background-900 gap-2 w-full h-full">
        <Box className="flex-col gap-6 mb-8">
          <Box className="flex justify-between items-center p-4">
            <ThemedText className="text-2xl font-bold">
              {t("common.labels.quantity")}
            </ThemedText>
            <Box className="flex-row justify-center items-center gap-8">
              <Pressable
                className="flex items-center justify-center bg-primary-400 h-14 w-14 rounded-lg"
                onPress={() => handleCreateItem(-1)}
              >
                <Minus className="w-10 h-10"></Minus>
              </Pressable>
              <ThemedText className="text-2xl">
                {shoppingListItem?.quantity}
              </ThemedText>
              <Pressable
                className="flex items-center justify-center bg-primary-400 h-14 w-14 rounded-lg"
                onPress={() => handleCreateItem(1)}
              >
                <Plus className="w-10 h-10"></Plus>
              </Pressable>
            </Box>
          </Box>
          <Box className="flex-row p-4">
            <Pressable
              className="flex-row items-center justify-center gap-4 bg-red-500 rounded-lg p-3"
              onPress={() => handleDeleteItem()}
            >
              <Text className="text-lg font-bold text-black">
                {t("common.buttons.delete")}
              </Text>
              <Trash className="w-7 h-7"></Trash>
            </Pressable>
          </Box>
        </Box>
      </ThemedView>
    </>
  );
}
