import { AlertDialog, AlertDialogBackdrop, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Fab, FabIcon, FabLabel } from "@/components/ui/fab";
import { ShoppingBag } from "lucide-react-native";
import { Heading } from "@/components/ui/heading"

import { useTranslation } from "react-i18next";
import { Button, ButtonText } from "@/components/ui/button"
import { Text } from "@/components/ui/text";
import React from "react";


interface FabConfirmShoppingProps {
  title?: string;
  onSave?: () => void;
  onDontSave?: () => void;
}

export function FabConfirmShopping({
  title,
  onSave,
  onDontSave
}: FabConfirmShoppingProps) {
  const { t } = useTranslation();

  const [showAlertDialog, setShowAlertDialog] = React.useState(false)
  const handleClose = () => setShowAlertDialog(false)

  const saveShoppingList = () => {
    if (onSave) {
      onSave();
    }
  };

  const dontSaveShoppingList = () => {
    if (onDontSave) {
      onDontSave();
    }
  };

  const handleSave = () => {
    setShowAlertDialog(false);
    saveShoppingList();
  };

  const handleDontSave = () => {
    setShowAlertDialog(false);
    dontSaveShoppingList();
  };

  return (
    <>
    <Fab
      size="md"
      placement="bottom right"
      isHovered={false}
      isDisabled={false}
      isPressed={false}
      onPress={() => setShowAlertDialog(true)}
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
    </>
    
  );
}
