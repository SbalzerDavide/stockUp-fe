import React, { useState } from "react";
import { Filter, FilterOption } from "@/models/filter.model";

import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Pressable, StyleSheet } from "react-native";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
} from "./ui/actionsheet";

export default function FilterComponent({
  filters,
  setFilters,
}: {
  filters: Filter[];
  setFilters: (filters: Filter[]) => void;
}) {
  const [showActionsheet, setShowActionsheet] = useState(false);
  const [activeFilter, setActiveFilter] = useState<Filter | null>(null);
  const [activeFilterIndex, setActiveFilterIndex] = useState<number | null>(
    null
  );

  const openFilter = (filter: any, index: number) => () => {
    setShowActionsheet(true);
    setActiveFilter(filter);
    setActiveFilterIndex(index);
  };

  const handleClose = () => setShowActionsheet(false);

  const applyFilter = (filter: any) => () => {
    const updatedFilters = [...filters];
    if (filter == null) {
      updatedFilters[activeFilterIndex!].value = null;
    } else {
      updatedFilters[activeFilterIndex!].value = filter?.id;
    }
    console.log('updatedFilters ciao', updatedFilters);
    setFilters(updatedFilters);

    handleClose();
  };

  return (<>
    <Box className="flex flex-row gap-2 ml-4">
      {filters?.map((filter, index) => (
        <Pressable
          key={filter.id}
          onPress={openFilter(filter, index)}
          className="bg-background-900 rounded-lg"
        >
          {filter.value != null ? (
            <Text className="bg-primary-400 p-2 rounded-lg">
              {filter.options?.find((el) => el.id === filter.value)?.name}
            </Text>
          ) : (
            <Text className="p-2 rounded-lg">{filter.name}</Text>
          )}
        </Pressable>
      ))}
    </Box>
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
        {activeFilter?.options?.map((filter: FilterOption) => (
          <ActionsheetItem
            key={filter.id.toString()}
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
          </ActionsheetItem>
        ))}
      </ActionsheetContent>
    </Actionsheet>
  </>);
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

