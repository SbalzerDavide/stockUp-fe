import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";

import {
  useCreateItem,
  useCreateShoppingList,
} from "@/features/shoppingList/api/shoppingList.mutations";
import { Box } from "@/components/ui/box";
import { useState } from "react";
import { View } from "react-native";
import { Text } from "react-native";
import React from "react";
import { useShowToast } from "@/hooks/useShowToast";
import { useTranslation } from "react-i18next";
import { Stack } from "expo-router";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { Actionsheet, ActionsheetContent } from "@/components/ui/actionsheet";

export default function NewShoppingListItemScreen() {
  // put items component, with filters and search, 
  // but with different selection function
  <Text>NewShoppingListItemScreen</Text>
}
