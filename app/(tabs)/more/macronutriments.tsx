import { Link, Stack } from "expo-router";
import { ScrollView, Text, View } from "react-native";

import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useMacronutriments } from "@/features/items/api/shoppingList.mutations";
import { BaseCard } from "@/components/BaseCard";
import { Heading } from "@/components/ui/heading";

export default function MacronutrimentsScreen() {
  const { data: macronutriments, isLoading, error } = useMacronutriments();
  console.log(macronutriments);
  return (
    <>
      <Stack.Screen options={{ title: "Macronutriments screen" }} />

      <ThemedView className="flex-col gap-4 h-full p-4">
        <ScrollView>
          <Heading className="text-2xl font-bold text-white mb-4">
            Macronutriments
          </Heading>
          <ThemedView className="flex flex-col gap-2">
            {macronutriments &&
              Object.values(macronutriments).map(
                (macronutriment: {
                  id: string;
                  name: string;
                  description: string;
                }) => (
                  <BaseCard
                    key={macronutriment.id}
                    title={macronutriment.name}
                    description={macronutriment.description}
                  />
                )
              )}
          </ThemedView>
        </ScrollView>
      </ThemedView>
    </>
  );
}
