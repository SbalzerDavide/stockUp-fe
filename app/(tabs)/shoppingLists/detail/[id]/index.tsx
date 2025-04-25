import { Pressable, ScrollView, StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ItemCard } from "@/features/shoppingList/components/ItemCard";
import { Switch } from "@/components/ui/switch";
import colors from "tailwindcss/colors";
import { Text } from "@/components/ui/text";
import { Plus } from "lucide-react-native";


import React from "react";
import {
  useItemCategories,
  useItems,
  useMacronutriments,
  useShoppingListItems,
} from "@/features/shoppingList/api/shoppingList.mutations";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { useState } from "react";
import { debounce } from "lodash";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { ListFilter, Icon } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
} from "@/components/ui/actionsheet";
import { ThemedView } from "@/components/ThemedView";

interface Filter {
  id: string;
  name: string;
  options:
    | {
        id: string | boolean;
        name: string;
      }[]
    | undefined;
  value: string | boolean | null;
}
export default function ShoppingListDetailScreen() {
  const { id } = useLocalSearchParams();

  const { t } = useTranslation();

  const [isEdible, setIsEdible] = useState(true);
  const [showActionsheet, setShowActionsheet] = useState(false);

  const [activeFilter, setActiveFilter] = useState<Filter | null>(null);
  const [activeFilterIndex, setActiveFilterIndex] = useState<number | null>(
    null
  );

  const { data: macronutriments } = useMacronutriments();
  const { data: itemCategories } = useItemCategories();

  const [filters, setFilters] = useState<Filter[]>([
    {
      id: "is_edible",
      name: t("common.is_edible.label"),
      options: [
        { id: true, name: t("common.is_edible.yes") },
        { id: false, name: t("common.is_edible.no") },
      ],
      value: null,
    },
    {
      id: "macronutriments",
      name: t("common.macronutriments"),
      options: macronutriments?.map((item: any) => ({
        id: item.id,
        name: item.name,
      })),
      value: null,
    },
    {
      id: "categories",
      name: t("common.categories"),
      options: itemCategories?.map((item: any) => ({
        id: item.id,
        name: item.name,
      })),
      value: null,
    },
  ]);

  const {
    data: shoppingListItems,
    isLoading,
    error,
  } = useShoppingListItems(id as string);

  const openFilter = (filter: any, index: number) => () => {
    setShowActionsheet(true);
    setActiveFilter(filter);
    setActiveFilterIndex(index);
    console.log("Open filter", filter);
  };
  const handleClose = () => setShowActionsheet(false);

  const applyFilter = (filter: any) => () => {
    setFilters((filters) => {
      const updatedFilters = [...filters];
      console.log("filter", filter);
      if (filter == null) {
        updatedFilters[activeFilterIndex!].value = null;
      } else {
        updatedFilters[activeFilterIndex!].value = filter?.id;
      }
      return updatedFilters;
    });

    // setFilters(updatedFilters);
    console.log(filters);

    handleClose();
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: shoppingListItems?.name,
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
        <ScrollView>
          <ThemedView className="w-full flex flex-row justify-between py-4">
            <ScrollView horizontal={true}>
              <Box className="flex flex-row gap-2 ml-4">
                {filters?.map((filter, index) => (
                  <Pressable
                    key={filter.id}
                    onPress={openFilter(filter, index)}
                    className="bg-background-900 rounded-lg"
                  >
                    {filter.value != null ? (
                      <Text className="bg-primary-400 p-2 rounded-lg">
                        {
                          filter.options?.find((el) => el.id === filter.value)
                            ?.name
                        }
                      </Text>
                    ) : (
                      <Text className="p-2 rounded-lg">{filter.name}</Text>
                    )}
                  </Pressable>
                ))}
              </Box>
            </ScrollView>
          </ThemedView>
          {/* <ListFilter size={24} /> */}
          {/* </Box> */}

          <VStack className="gap-4 p-4" reversed={false}>
            {shoppingListItems && shoppingListItems.items.length > 0 ? (
              shoppingListItems?.items?.map((item) => (
                <ItemCard
                  key={item.id}
                  id={item.id}
                  title={item.item_name}
                  quantity={item.quantity}
                  // macronutrients={item.macronutriments || ''}
                  // category={item.category || ''}
                  // department={item.department || ''}
                />
              ))
            ) : (
              <Text>No items found</Text>
            )}
          </VStack>
        </ScrollView>
      </ThemedView>
      <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
        <ActionsheetBackdrop />
        <ActionsheetContent className="overflow-hidden p-0">
          <ActionsheetDragIndicatorWrapper className="bg-secondary-400">
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <Box className="w-full flex flex-row justify-between p-4 bg-secondary-400">
            <Text>{activeFilter?.name}</Text>
            {activeFilter?.value != null && (
              <Pressable onPress={applyFilter(null)}>
                <Text className="text-primary-400">Remove</Text>
              </Pressable>
            )}
          </Box>
          {activeFilter?.options?.map((filter: any) => (
            <ActionsheetItem
              key={filter.value}
              className="px-5"
              onPress={applyFilter(filter)}
            >
              <ActionsheetItemText
                className={
                  activeFilter?.value == filter.id ? "text-primary-600" : ""
                }
              >
                {filter.name}
              </ActionsheetItemText>
              {/* <ActionsheetItemText>{activeFilter?.value}</ActionsheetItemText> */}
              {/* <ActionsheetItemText>{filter?.id?.toString()}</ActionsheetItemText> */}
            </ActionsheetItem>
          ))}
        </ActionsheetContent>
      </Actionsheet>
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
