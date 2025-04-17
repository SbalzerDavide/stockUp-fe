import { Image, Pressable, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useDateFormatter } from "@/hooks/useDateFormatter";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";

import { ShoppingCart, PackageOpen } from "lucide-react-native";


interface CardProps {
  title: string;
  description?: string;
  created_at: string;
  is_active: boolean;
  is_purchased: boolean;
  id: string;
  onSelect: (id: string) => void;
}

export function ShoppingListCard({
  title,
  description,
  created_at,
  is_active,
  id,
  is_purchased,
  onSelect
}: CardProps) {
  const { formatDate, formatDateOnly } = useDateFormatter();

  const handlePress = () => {
    onSelect(id);
  };

  return (
    <Pressable onPress={handlePress} className="rounded-lg !bg-background-900 p-4 shadow-md">
      <ThemedView className="flex-row !bg-background-900 gap-2 w-full">
        <Box className="flex-row h-full justify-between items-center">
          <ThemedText className="text-sm">
            {formatDateOnly(created_at)}
          </ThemedText>
        </Box>
        <Box className="flex-col justify-between flex-grow">
          <ThemedText className="text-lg font-bold">{title}</ThemedText>
          <Text className="text-sm text-secondary-500">
            {description}
          </Text>
        </Box>
        <Box className="flex-row justify-end items-center text-white">
          {is_purchased ? (
            <ShoppingCart size={20} />
          ) : (
            <PackageOpen size={20} />
          )}
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
