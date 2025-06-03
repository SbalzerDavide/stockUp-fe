import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Fab, FabIcon, FabLabel } from "@/components/ui/fab";
import { Box, ShoppingBag } from "lucide-react-native";
import { Heading } from "@/components/ui/heading";

import { useTranslation } from "react-i18next";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import React, { useState } from "react";
import { Input, InputField } from "@/components/ui/input";
import { set } from "lodash";

interface FabConfirmShoppingProps {
  title?: string;
  haveToSaveSoppingList?: boolean;
  onSave?: () => void;
  onDontSave?: () => void;
  onCreatePurchase?: (total_cost: number) => void;
}

export function FabConfirmShopping({
  title,
  haveToSaveSoppingList = false,
  onSave,
  onDontSave,
  onCreatePurchase,
}: FabConfirmShoppingProps) {
  const { t } = useTranslation();

  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);

  const [purchaseDate, setPurchaseDate] = useState("");
  const [totalCost, setTotalCost] = useState("");

  const handleClose = () => {
    setShowAlertDialog(false);
  };
  const handleClosePurchase = () => setShowPurchaseDialog(false);

  const saveShoppingList = async () => {
    if (onSave) {
      onSave();
      setShowPurchaseDialog(true);
    }
  };

  const dontSaveShoppingList = () => {
    if (onDontSave) {
      onDontSave();
    }
    setShowPurchaseDialog(true);
  };

  const handleSave = () => {
    setShowAlertDialog(false);
    saveShoppingList();
  };

  const handleDontSave = () => {
    setShowAlertDialog(false);
    dontSaveShoppingList();
  };
  const handlePurchase = () => {
    if (onCreatePurchase) {
      onCreatePurchase(parseInt(totalCost));
      setShowPurchaseDialog(false);
    }
  };

  const handleOpenDialog = () => {
    if (haveToSaveSoppingList) {
      setShowAlertDialog(true);
    } else {
      setShowPurchaseDialog(true);
    }
  };

  return (
    <>
      <Fab
        size="md"
        placement="bottom right"
        isHovered={false}
        isDisabled={false}
        isPressed={false}
        onPress={() => handleOpenDialog()}
      >
        <>
          <FabIcon as={ShoppingBag} />
          <FabLabel>{t("common.buttons.confirmShoppingList")}</FabLabel>
        </>
      </Fab>
      <AlertDialog isOpen={showAlertDialog} onClose={handleClose} size="md">
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading className="text-typography-950 font-semibold" size="md">
              {t("common.confirm.saveShoppingList.title")}
            </Heading>
          </AlertDialogHeader>
          <AlertDialogBody className="mt-3 mb-4">
            <Text size="sm">
              {t("common.confirm.saveShoppingList.message")}
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter className="">
            <Button
              variant="outline"
              action="secondary"
              onPress={handleDontSave}
              size="sm"
            >
              <ButtonText>{t("common.buttons.cancel")}</ButtonText>
            </Button>
            <Button size="sm" onPress={handleSave}>
              <ButtonText>{t("common.buttons.save")}</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog
        isOpen={showPurchaseDialog}
        onClose={handleClosePurchase}
        size="md"
      >
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading className="text-typography-950 font-semibold" size="md">
              {t("common.confirm.createPurchase.title")}
            </Heading>
          </AlertDialogHeader>
          <AlertDialogBody
            className="flex flex-col gap-4 justify-center mt-3 mb-4"
            contentContainerStyle={{ gap: 12 }}
          >
            <Text size="sm">{t("common.confirm.createPurchase.message")}</Text>
            <Input
              variant="outline"
              size="md"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
            >
              <InputField
                value={totalCost}
                onChangeText={setTotalCost}
                placeholder={t("purchase.form.totalCost.placeholder")}
              />
            </Input>
            {/* <Input
              variant="outline"
              size="md"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
            >
              <InputField
                value={purchaseDate}
                onChangeText={setPurchaseDate}
                placeholder={t("purchase.form.store.placeholder")}
              />
            </Input> */}
          </AlertDialogBody>
          <AlertDialogFooter className="">
            <Button
              variant="outline"
              action="secondary"
              onPress={handleClosePurchase}
              size="sm"
            >
              <ButtonText>{t("common.buttons.cancel")}</ButtonText>
            </Button>
            <Button size="sm" onPress={handlePurchase}>
              <ButtonText>{t("common.buttons.createPurchase")}</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
