import React from "react";
import { Text } from "@/components/ui/text";
import { useLocalSearchParams } from "expo-router";
import { useItemDetail, useShoppingListItems } from "@/features/shoppingList/api/shoppingList.mutations";

export default function itemDetailScreen(){
  const { id } = useLocalSearchParams();

  const {
    data: item,
    isLoading,
    error,
  } = useItemDetail(id as string);


  return (
    <>
    <Text>item detail { id }</Text>
    <Text>{ item?.name }</Text>
    <Text>{ item?.category?.name }</Text>
    <Text>{ item?.department }</Text>
    <Text>{ item?.macronutriments?.name }</Text>
    </>
  )
}