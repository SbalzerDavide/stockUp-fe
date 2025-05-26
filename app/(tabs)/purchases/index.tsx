import { Stack } from "expo-router";
import { Text } from "react-native"; 
export default function ShoppingListScreen() {
  return (
    <>
      <Stack.Screen name="purchases" options={{ title: "purchases!" }} />
      <Text className="text-2xl font-bold text-white mb-4">
        Purchases
      </Text>
    </>
  );
}