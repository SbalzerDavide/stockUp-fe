import { Text, Image, StyleSheet } from "react-native";
import { Box } from "@/components/ui/box";
import { ThemedText } from "@/components/ThemedText";

interface CardProps {
  title: string;
  description?: string;
  macronutrients: string;
  category?: string;
  department?: string;
}

function truncateString(str: string, maxLength: number = 24): string {
  if (!str) return "";
  if (str.length <= maxLength) return str;

  return str.substring(0, maxLength) + "..";
}

export function ItemCard({
  title,
  description,
  macronutrients,
  category,
  department,
}: CardProps) {
  return (
    <Box className="bg-background-900 rounded-lg p-3 shadow-md">
      <Box className="flex-row items-center flex-grow">
        <Box className="flex-1">
          <ThemedText className="text-lg font-bold">{title}</ThemedText>
        </Box>
        <Box className="flex-col justify-between gap-3">
          <Box className="flex-row justify-end gap-2">
            <ThemedText align="right" className="text-xs text-secondary-500">
              {truncateString(macronutrients || "-")}
            </ThemedText>
          </Box>
          <Box className="flex-row justify-end gap-2">
            <ThemedText align="right" className="text-xs text-secondary-500">
              {truncateString(category || "-")}
            </ThemedText>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
