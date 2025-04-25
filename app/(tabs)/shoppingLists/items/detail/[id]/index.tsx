import React from "react";
import { Text } from "@/components/ui/text";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useItemDetail, useShoppingListItems } from "@/features/shoppingList/api/shoppingList.mutations";
import { Pressable } from "react-native";
import { Plus } from "lucide-react-native";
import { ThemedView } from "@/components/ThemedView";

export default function itemDetailScreen(){
  const { id } = useLocalSearchParams();

  const {
    data: item,
    isLoading,
    error,
  } = useItemDetail(id as string);


  return (
    <>
          <Stack.Screen
        options={{
          title: item?.name,
          headerBackVisible: true,
          // headerRight: () => <Pressable
          //   onPress={() => router.push(`/(tabs)/shoppingLists/detail/${id}/newShoppingListItem`)}
          //   className="p-5 bg-primary-500"
          // >
          //   <Plus />
          // </Pressable>,
        }}
      />
            <ThemedView className="flex-col gap-4 h-full p-4">
              <Text className="text-white">item detail { id }</Text>
              <Text>{ item?.name }</Text>
              <Text>{ item?.category?.name }</Text>
              <Text>{ item?.department }</Text>
              <Text>{ item?.macronutriments?.name }</Text>

            </ThemedView>


    </>
  )
}