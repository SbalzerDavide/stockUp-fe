import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";

import { useCreateItem, useCreateShoppingList } from "@/features/shoppingList/api/shoppingList.mutations";
import { Box } from "@/components/ui/box";
import { useState } from "react";
import { View } from "react-native";
import { Text } from "react-native";
import React from "react";
import { useShowToast } from "@/hooks/useShowToast";
import { useTranslation } from "react-i18next";
import { Stack } from "expo-router";
import { Textarea, TextareaInput } from "@/components/ui/textarea";

export default function NewShoppingListScreen() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const showToast = useShowToast();
  const { t } = useTranslation();

  const { mutate: createShoppingList, isPending: isPendingShoppingList, isSuccess: isSuccessShoppingList } = useCreateShoppingList();
  const handleCreateItem = async () => {
    setLoading(true);
    createShoppingList(
      {
        name,
        description,
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
        name="NewShoppingList"
        options={{
          headerShown: false,
        }}
      />
      <View className="flex-1">
        <View className="w-full flex-grow p-5">
          <Text className="text-2xl font-semibold">
            {t("pages.newShoppingList.title")}
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
            <Textarea
              size="md"
              isReadOnly={false}
              isInvalid={false}
              isDisabled={false}
            >
              <TextareaInput value={description} onChangeText={setDescription} placeholder="Your text goes here..." />
            </Textarea>
          </Box>
          <Box className="flex flex-col gap-2">
            <Button
              action="primary"
              onPress={handleCreateItem}
              disabled={loading || isPendingShoppingList}
            >
              <ButtonText>{t("common.buttons.newShoppingList")}</ButtonText>
            </Button>
          </Box>
        </View>
      </View>
    </>
  );
}
