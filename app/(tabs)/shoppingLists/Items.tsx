import { Pressable, ScrollView, StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ItemCard } from "@/components/ItemCard";
import { Switch } from "@/components/ui/switch";
import colors from "tailwindcss/colors";
import { Text } from "@/components/ui/text";

import React from "react";
import {
  useItemCategories,
  useItems,
  useMacronutriments,
} from "@/features/shoppingList/api/shoppingList.mutations";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { useState } from "react";
import { debounce } from "lodash";
import { Stack } from "expo-router";
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
export default function ItemsScreen() {
  const { t } = useTranslation();

  const [isEdible, setIsEdible] = useState(true);
  const [debouncedSearchText, setDebouncedSearchText] = useState("");
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
    data: items,
    isLoading,
    error,
  } = useItems({
    search: debouncedSearchText,
    is_edible: filters.find((el) => el.id === "is_edible")?.value as boolean,
    macronutriments:
      (filters.find((el) => el.id === "macronutriments")?.value as string) ||
      undefined,
    category:
      (filters.find((el) => el.id === "categories")?.value as string) ||
      undefined,
  });

  const debouncedSearch = debounce((text: string) => {
    setDebouncedSearchText(text);
  }, 300);

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
          headerBackVisible: true,
          // headerSearchBarOptions: {
          //   placeholder: t("common.labels.searchText"),
          //   onChangeText: (text) => {
          //     debouncedSearch(text.nativeEvent.text);
          //   },
          // },
        }}
      />
      <ScrollView>
        <Box className="w-full flex flex-row justify-between py-4 bg-neutral-50">
          {/* <Switch
            size="md"
            isDisabled={false}
            value={isEdible}
            trackColor={{
              false: colors.neutral[300],
              true: colors.neutral[600],
            }}
            thumbColor={colors.neutral[50]}
            ios_backgroundColor={colors.neutral[300]}
            onValueChange={(val) => {
              setIsEdible(val);
            }}
          /> */}
          <ScrollView horizontal={true}>
            <Box className="flex flex-row gap-2 ml-4">
              {filters?.map((filter, index) => (
                <Pressable
                  onPress={openFilter(filter, index)}
                  className="bg-secondary-300 rounded-lg"
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
          {/* <ListFilter size={24} /> */}
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
            <ActionsheetItem className="px-5" onPress={applyFilter(filter)}>
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
          {/* {activeFilter?.value != null && (
            <ActionsheetItem onPress={applyFilter(null)}>
              <ActionsheetItemText>Remove</ActionsheetItemText>
            </ActionsheetItem>
          )} */}

          {/* <ActionsheetItem onPress={() => console.log("Hello")}>
            <ActionsheetItemText>Edit Message</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={() => console.log("Hello")}>
            <ActionsheetItemText>Mark Unread</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={() => console.log("Hello")}>
            <ActionsheetItemText>Remind Me</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={() => console.log("Hello")}>
            <ActionsheetItemText>Add to Saved Items</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem isDisabled onPress={() => console.log("Hello")}>
            <ActionsheetItemText>Delete</ActionsheetItemText>
          </ActionsheetItem> */}
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
