import { ScrollView, StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ItemCard } from "@/components/ItemCard";
import { Switch } from "@/components/ui/switch";
import colors from "tailwindcss/colors";

import React from "react";
import { useItems } from "@/features/items/api/items.mutations";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { useState } from "react";
import { t } from "i18next";
import { debounce } from "lodash";
import { Stack } from "expo-router";
import { ListFilter, Icon } from "lucide-react-native";
export default function ItemsScreen() {
  const [isEdible, setIsEdible] = useState(false);
  const [debouncedSearchText, setDebouncedSearchText] = useState("");

  const {
    data: items,
    isLoading,
    error,
  } = useItems({
    search: debouncedSearchText,
    is_edible: isEdible,
  });

  const debouncedSearch = debounce((text: string) => {
    setDebouncedSearchText(text);
  }, 300);

  return (
    <>
      <Stack.Screen
        options={{
          headerBackVisible: true,
          headerSearchBarOptions: {
            placeholder: t("common.labels.searchText"),
            onChangeText: (text) => {
              debouncedSearch(text.nativeEvent.text);
            },
          },
        }}
      />
      <ScrollView>
        <Box className="w-full flex flex-row justify-between p-4 bg-slate-200">
          <Switch
            size="md"
            isDisabled={false}
            trackColor={{
              false: colors.neutral[300],
              true: colors.neutral[600],
            }}
            thumbColor={colors.neutral[50]}
            ios_backgroundColor={colors.neutral[300]}
            onValueChange={(val) => {
              setIsEdible(val);
            }}
          />
          <ListFilter size={24} />
        </Box>

        <VStack className="gap-4 p-4" reversed={false}>
          {items?.results?.map((item: any) => (
            <ItemCard
              key={item.id}
              title={item.name}
              description={item.description}
              imageUrl="https://via.placeholder.com/50"
            />
          ))}
        </VStack>
      </ScrollView>
      {/* <ParallaxScrollView
        headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
        headerImage={
          <IconSymbol
            size={310}
            color="#808080"
            name="chevron.left.forwardslash.chevron.right"
            style={styles.headerImage}
          />
        }
      >
        {items?.results?.map((item: any) => (
          <ItemCard
            key={item.id}
            title={item.name}
            description={item.description}
            imageUrl="https://via.placeholder.com/50"
          />
        ))}
      </ParallaxScrollView> */}
    </>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
