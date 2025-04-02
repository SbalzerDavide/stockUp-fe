import { Toast, ToastDescription, ToastTitle, useToast } from "@/components/ui/toast";
import { useTranslation } from 'react-i18next';
import React from "react";

type ToastOptions = {
  titleKey?: string;
  descriptionKey?: string;
  action?: "success" | "error" | "warning" | "info";
  variant?: "solid" | "outline";
  values?: Record<string, string>;
};

export const useShowToast = () => {
  const toast = useToast();
  const { t } = useTranslation();

  const showToast = React.useCallback(
    ({ 
      titleKey = "", 
      descriptionKey = "", 
      action = "success", 
      variant = "solid",
      values = {} 
    }: ToastOptions) => {
      toast.show({
        render: ({ id }) => {
          return (
            <Toast action={action} variant={variant}>
              <ToastTitle>{t(titleKey, values)}</ToastTitle>
              <ToastDescription>{t(descriptionKey, values)}</ToastDescription>
            </Toast>
          );
        },
      });
    },
    [toast, t]
  );

  return showToast;
};
