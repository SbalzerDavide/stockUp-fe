import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";

import { useCreateItem } from "@/features/shoppingList/api/shoppingList.mutations";
import { Box } from "@/components/ui/box";
import { useState } from "react";
import { View } from "react-native";
import { Text } from "react-native";
import React from "react";
import { useShowToast } from "@/hooks/useShowToast";
import { useTranslation } from "react-i18next";
import { Stack } from "expo-router";

export default function NewItemScreen() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const showToast = useShowToast();
  const { t } = useTranslation();

  const { mutate: createItem, isPending, isSuccess } = useCreateItem();

  const handleCreateItem = async () => {
    setLoading(true);
    createItem(
      {
        name,
      },
      {
        onSuccess: () => {
          showToast({
            titleKey: "toasts.success.title",
            descriptionKey: "toasts.success.itemCreated",
            action: "success",
          });
          setName("");
        },
        onError: () => {
          showToast({
            titleKey: "toasts.error.title",
            descriptionKey: "toasts.error.createFailed",
            action: "error",
          });
        },
        onSettled: () => {
          setLoading(false);
        },
      }
    );
  };

  return (
    <>
      <Stack.Screen
        name="NewItem"
        options={{
          headerShown: false,
        }}
      />
      <View className="flex-1">
        <View className="w-full flex-grow p-5">
          <Text className="text-2xl font-semibold">
            {t("pages.newItem.title")}
          </Text>
          <Box className="py-5 flex-col gap-2">
            <Input>
              <InputField
                value={name}
                onChangeText={setName}
                autoCapitalize="none"
                placeholder={t("common.labels.enterName")}
              />
            </Input>
          </Box>
          <Box className="flex flex-col gap-2">
            <Button
              action="primary"
              onPress={handleCreateItem}
              disabled={loading || isPending}
            >
              <ButtonText>{t("common.buttons.newItem")}</ButtonText>
            </Button>
          </Box>
        </View>
      </View>
    </>
  );
}
