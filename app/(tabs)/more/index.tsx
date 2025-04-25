import { Link, Stack } from "expo-router";

import React from "react";

import { StyleSheet, Image, Platform, View, Text } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Box } from "@/components/ui/box";

import { ChevronRight, Icon } from "lucide-react-native";

interface ElementGroup {
  elements: {
    title: string;
    link: string;
  }[];
}

export default function Index() {
  const elementsGroups: ElementGroup[] = [
    {
      elements: [
        {
          title: "Shopping Lists",
          link: "/(tabs)/shoppingLists",
        },
        {
          title: "Items",
          link: "/(tabs)/shoppingLists/items",
        },
      ],
    },
    {
      elements: [
        {
          title: "Macronutriments",
          link: "/(tabs)/more/macronutriments",
        },
        {
          title: "Categories",
          link: "/(tabs)/more/itemCategories",
        },
      ],
    },
  ];
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />

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
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Explore</ThemedText>
        </ThemedView>
        <ThemedText>
          This app includes example code to help you get started.
        </ThemedText>
        <Box className="flex flex-col gap-4 text-white">
          {elementsGroups.map((group, groupIndex) => (
            <Box
              key={`group-${groupIndex}`}
              className="flex flex-col bg-background-900 rounded-lg"
            >
              {group.elements.map((element, elementIndex) => (
                <Link
                  key={`element-${groupIndex}-${elementIndex}`}
                  href={element.link as any}
                >
                  <Box className="flex flex-row justify-between p-2 cursor-pointer shadow-sm">
                    <Text className="text-white">{element.title}</Text>
                    <ChevronRight size={20} />
                  </Box>
                </Link>
              ))}
            </Box>
          ))}
        </Box>
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
