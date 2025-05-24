import { Pressable, ScrollView, StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ItemCard } from "@/features/shoppingList/components/ItemCard";
import { Switch } from "@/components/ui/switch";
import colors from "tailwindcss/colors";
import { Text } from "@/components/ui/text";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Plus,
  ShoppingCart,
  TableOfContents,
} from "lucide-react-native";

import React, { useCallback, useEffect } from "react";
import {
  useCreateItem,
  useCreateShoppingListItem,
  useItemCategories,
  useItems,
  useMacronutriments,
  useShoppingList,
} from "@/features/shoppingList/api/shoppingList.mutations";

import { AddIcon } from "@/components/ui/icon";

import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { useState } from "react";
import { debounce } from "lodash";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { ListFilter, Icon } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Input, InputField } from "@/components/ui/input";

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
import { useThemeColor } from "@/hooks/useThemeColor";
import { useShowToast } from "@/hooks/useShowToast";
import { ItemCardQuantity } from "@/features/shoppingList/components/ItemCardQuantity";
import { Fab, FabIcon, FabLabel } from "@/components/ui/fab";

import { departments } from "@/assets/mock/departments";
import {
  Accordion,
  AccordionContent,
  AccordionContentText,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTitleText,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Divider } from "@/components/ui/divider";
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/ui/checkbox";

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

  const color = useThemeColor({}, "text");

  const [isEdible, setIsEdible] = useState(true);
  const [isInShopping, setIsInShopping] = useState(false);
  const [showActionsheet, setShowActionsheet] = useState(false);
  const [inputText, setInputText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");

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

  // add debouncedSearchText for searching elements
  const {
    data: shoppingList,
    isLoading,
    error,
  } = useShoppingList(id as string);

  const { data: items } = useItems({
    search: debouncedSearchText,
  });

  const itemsNoAlreadyInList = () => {
    if (!items?.results) {
      return [];
    }
    return items?.results?.filter((item) => {
      return !shoppingList?.items?.some((listItem) => listItem.id === item.id);
    });
  };

  const itemsByDepartment = (): {
    department?: string;
    items?: any[];
    total?: number;
  }[] => {
    return departments.map((department) => {
      const itemsByDepartment = shoppingList?.items?.filter(
        (item) => item.department === department
      );
      return {
        department: department,
        items: itemsByDepartment,
        total: itemsByDepartment?.length,
      };
    });
  };

  const openFilter = (filter: any, index: number) => () => {
    setShowActionsheet(true);
    setActiveFilter(filter);
    setActiveFilterIndex(index);
  };
  const handleClose = () => setShowActionsheet(false);

  const applyFilter = (filter: any) => () => {
    setFilters((filters) => {
      const updatedFilters = [...filters];
      if (filter == null) {
        updatedFilters[activeFilterIndex!].value = null;
      } else {
        updatedFilters[activeFilterIndex!].value = filter?.id;
      }
      return updatedFilters;
    });
    // setFilters(updatedFilters);
    handleClose();
  };

  const debouncedSearch = useCallback(
    debounce((text: string) => {
      setDebouncedSearchText(text);
      // FE liter list items
    }, 500),
    []
  );

  useEffect(() => {
    debouncedSearch(inputText);

    return () => {
      debouncedSearch.cancel();
    };
  }, [inputText, debouncedSearch]);

  const listItems = () => {
    if (shoppingList?.items) {
      return shoppingList?.items.filter((item) => {
        return item.item_name.toLowerCase().includes(debouncedSearchText);
      });
    } else {
      return [];
    }
  };

  const {
    mutate: createShoppingListitem,
    isPending: isPendingShoppingListItem,
    isSuccess: isSuccessShoppingListItem,
  } = useCreateShoppingListItem();
  const { mutate: createItem, isPending, isSuccess } = useCreateItem();
  const showToast = useShowToast();

  const handleCreateShoppingListItem = async (itemId: string) => {
    createShoppingListitem(
      {
        shoppingListId: id as string,
        itemId,
      },
      {
        onSuccess: () => {
          showToast({
            titleKey: "toasts.success.title",
            descriptionKey: "toasts.success.itemCreated",
            action: "success",
          });
          setInputText("");
        },
        onError: () => {
          showToast({
            titleKey: "toasts.error.title",
            descriptionKey: "toasts.error.createFailed",
            action: "error",
          });
        },
        onSettled: () => {},
      }
    );
  };

  const [checkedItems, setCheckedItems] = useState<{
    [key: string]: string[];
  } | null>(null);

  const totalCheckedItems = () => {
    let total = 0;
    if (checkedItems) {
      for (const [key, value] of Object.entries(checkedItems)) {
        total += value.length;
      }
    }
    return total;
  };

  useEffect(() => {
    const initialCheckedItems = departments.reduce(
      (el: Record<string, string[]>, item) => {
        el[item] = [];
        return el;
      },
      {}
    );
    setCheckedItems(initialCheckedItems);
  }, [departments]);

  const toggleCheckedItem = (
    department: string,
    itemId: string,
    value: boolean
  ) => {
    const updatedCheckedItems = { ...checkedItems };
    const departmentCheckedItems = updatedCheckedItems[department] || [];
    if (value) {
      departmentCheckedItems.push(itemId);
    } else {
      if (departmentCheckedItems.includes(itemId)) {
        const index = departmentCheckedItems.indexOf(itemId);
        if (index > -1) {
          departmentCheckedItems.splice(index, 1);
        }
      }
    }
    setCheckedItems({
      ...updatedCheckedItems,
      [department]: departmentCheckedItems,
    });
  };

  const handleCreateItem = async () => {
    createItem(
      {
        name: debouncedSearchText,
      },
      {
        onSuccess: (el) => {
          handleCreateShoppingListItem(el.id);
          showToast({
            titleKey: "toasts.success.title",
            descriptionKey: "toasts.success.itemCreated",
            action: "success",
          });
          setInputText("");
        },
        onError: () => {
          showToast({
            titleKey: "toasts.error.title",
            descriptionKey: "toasts.error.createFailed",
            action: "error",
          });
        },
      }
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: shoppingList?.name,
          headerBackVisible: true,
          headerRight: () =>
            isInShopping && (
              <>
                <Box className="flex flex-row items-center p-2 gap-2">
                  <Text className="text-xl">
                    {totalCheckedItems()}({listItems().length})
                  </Text>
                  {/* TODO - go to add element */}
                  <Pressable
                    // onPress={}
                    className="bg-primary-500 rounded-lg h-10 w-10 flex items-center justify-center"
                  >
                    <Plus />
                  </Pressable>
                </Box>
              </>
            ),
        }}
      />
      <ThemedView className="flex-col gap-4 h-full p-4">
        <ScrollView>
          {!isInShopping && (
            <Box className="w-full p-4">
              <Input>
                <InputField
                  style={{ color }}
                  value={inputText}
                  placeholder={t("common.labels.searchText")}
                  onChangeText={(text) => setInputText(text)}
                />
              </Input>
            </Box>
          )}

          {!isInShopping ? (
            <>
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
                              filter.options?.find(
                                (el) => el.id === filter.value
                              )?.name
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

              <VStack className="gap-4 p-4" reversed={false}>
                {listItems()?.length > 0 ? (
                  <Text>Already in list</Text>
                ) : (
                  <Text>No items founded already in list</Text>
                )}

                {listItems()?.length > 0
                  ? listItems()?.map((item) => (
                      <ItemCardQuantity
                        key={item.id}
                        id={item.id}
                        title={item.item_name}
                        quantity={item.quantity}
                        emoji={item.emoji}
                        onSelect={() =>
                          router.push(
                            `/(tabs)/shoppingLists/detail/${id}/shoppingListItem/${item.id}`
                          )
                        }
                        // macronutrients={item.macronutriments || ''}
                        // category={item.category || ''}
                        // department={item.department || ''}
                      />
                    ))
                  : debouncedSearchText == "" && <Text>No items found</Text>}
                <Box className="w-full p-4">
                  {debouncedSearchText != "" &&
                    items &&
                    items.results?.filter(
                      (el) => el.name === debouncedSearchText
                    ).length === 0 && (
                      <Pressable
                        className="bg-primary-400 rounded-lg p-2"
                        onPress={() => handleCreateItem()}
                      >
                        <Text>Add New Item: {debouncedSearchText}</Text>
                      </Pressable>
                    )}
                </Box>

                <Text>To add</Text>
                {debouncedSearchText != "" &&
                itemsNoAlreadyInList() &&
                itemsNoAlreadyInList().length > 0 ? (
                  items?.results?.map((item) => (
                    <ItemCard
                      key={item.id}
                      id={item.id}
                      title={item.name}
                      emoji={item.emoji}
                      onSelect={() => handleCreateShoppingListItem(item.id)}
                      // macronutrients={item.macronutriments || ''}
                      // category={item.category || ''}
                      // department={item.department || ''}
                    />
                  ))
                ) : (
                  <Text>No items found</Text>
                )}
              </VStack>
            </>
          ) : (
            <>
              <Accordion
                size="sm"
                variant="filled"
                type="multiple"
                isCollapsible={true}
                isDisabled={false}
                className="m-5 w-[90%] border border-background-800 rounded-lg"
              >
                {itemsByDepartment()?.map((department, index) => (
                  <>
                    {department?.items && department.items?.length > 0 && (
                      <>
                        <AccordionItem key={index} value={index.toString()} className="!bg-background-900">
                          <AccordionHeader>
                            <AccordionTrigger>
                              {({ isExpanded }) => {
                                return (
                                  <>
                                    <AccordionTitleText className="flex flex-row items-center justify-between text-white">                                      
                                      {department.department} (
                                      {
                                        checkedItems?.[department.department!]
                                          .length
                                      }
                                      /{department.total})
                                      {/* TODO - go to add element, with department */}
                                      <Pressable
                                        // onPress={}
                                        className="bg-primary-500 rounded-lg h-10 w-10 flex items-center justify-center"
                                      >
                                        <Plus />
                                      </Pressable>
                                    </AccordionTitleText>
                                    {isExpanded ? (
                                      <AccordionIcon
                                        as={ChevronUpIcon}
                                        className="ml-3 text-white"
                                      />
                                    ) : (
                                      <AccordionIcon
                                        as={ChevronDownIcon}
                                        className="ml-3 text-white"
                                      />
                                    )}
                                  </>
                                );
                              }}
                            </AccordionTrigger>
                          </AccordionHeader>
                          <AccordionContent>
                            <Box className="flex felx-col gap-2">
                              {department.items?.map((item) => (
                                <Checkbox
                                  size="md"
                                  key={item.id}
                                  isInvalid={false}
                                  isDisabled={false}
                                  value={""}
                                  onChange={(value) => {
                                    toggleCheckedItem(
                                      item.department,
                                      item.id,
                                      value
                                    );
                                  }}
                                >
                                  <CheckboxIndicator>
                                    <CheckboxIcon as={CheckIcon} />
                                  </CheckboxIndicator>
                                  <CheckboxLabel>
                                    {item.item_name} ({item.quantity})
                                  </CheckboxLabel>
                                </Checkbox>
                              ))}
                            </Box>
                          </AccordionContent>
                        </AccordionItem>
                        <Divider className="bg-background-800"/>
                      </>
                    )}
                  </>
                ))}
              </Accordion>
            </>
          )}
        </ScrollView>
        <Fab
          size="md"
          placement="bottom right"
          isHovered={false}
          isDisabled={false}
          isPressed={false}
          onPress={() => setIsInShopping(!isInShopping)}
        >
          {isInShopping ? (
            <>
              <FabIcon as={TableOfContents} />
              <FabLabel>{t("common.buttons.backToList")}</FabLabel>
            </>
          ) : (
            <>
              <FabIcon as={ShoppingCart} />
              <FabLabel>{t("common.buttons.startShopping")}</FabLabel>
            </>
          )}
        </Fab>
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
