import { Text, Image, StyleSheet, Pressable } from "react-native";
import { Box } from "@/components/ui/box";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

interface CardProps {
  title: string;
  description?: string;
  id: string;
  emoji?: string;
  macronutrients?: string;
  category?: string;
  department?: string;
  quantity?: number;
  onSelect?: (id: string) => void;
}

export function ItemCardQuantity({
  title,
  description,
  id,
  macronutrients,
  category,
  emoji,
  department,
  quantity,
  onSelect,
}: CardProps) {
  const handlePress = () => {
    if(onSelect){
      onSelect(id);
    }
  };

  return (
    <Pressable onPress={handlePress} className="rounded-lg !bg-background-900 p-4 shadow-md">
      <ThemedView className="flex-row !bg-background-900 gap-2 w-full">
        <Box className="flex-1">
          <ThemedText className="text-lg font-bold">{emoji} {title}</ThemedText>
        </Box>
        <Box className="">
          <ThemedText className="text-lg font-bold">{quantity}</ThemedText>
        </Box>
      </ThemedView>
    </Pressable>
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
