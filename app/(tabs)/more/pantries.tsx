import { Stack } from "expo-router";
import { ScrollView } from "react-native";

import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { BaseCard } from "@/components/BaseCard";
import { Heading } from "@/components/ui/heading";
import { usePantries } from "@/features/stock/api/stock.mutations";

export default function MacronutrimentsScreen() {
  const { data: pantries, isLoading, error } = usePantries();
  return (
    <>
      <Stack.Screen options={{ title: "Pantries screen" }} />

      <ThemedView className="flex-col gap-4 h-full p-4">
        <ScrollView>
          <Heading className="text-2xl font-bold text-white mb-4">
            Pantries
          </Heading>
          <ThemedView className="flex flex-col gap-2">
            {pantries &&
              Object.values(pantries).map(
                (pantry) => (
                  <BaseCard
                    key={pantry.id.toString()}
                    title={pantry.name}
                    description={pantry.description}
                  />
                )
              )}
          </ThemedView>
        </ScrollView>
      </ThemedView>
    </>
  );
}
