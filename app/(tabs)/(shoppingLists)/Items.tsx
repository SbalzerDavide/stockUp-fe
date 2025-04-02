import { StyleSheet } from "react-native";


import ParallaxScrollView from "@/components/ParallaxScrollView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { ItemCard } from "@/components/ItemCard";

import React from "react";
import { useItems } from "@/features/items/api/items.mutations";
export default function ItemsScreen() {
  const { data: items, isLoading, error } = useItems({
    search: "",
    // is_edible: false,
  });

  return (
    <>
      <ParallaxScrollView
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
      </ParallaxScrollView>
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
