import { router, Stack } from "expo-router";
import { SafeAreaView, View } from "react-native";
import { Text } from "@/components/ui/text";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import { Box } from "@/components/ui/box";
import { useState, useEffect } from "react";
import { Image } from "@/components/ui/image";
import { User, Eye, EyeClosed } from "lucide-react-native";
import React from "react";

import { useAuth } from "@/components/providers/auth.provider";

const loginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = useAuth();

  // Effettua il reindirizzamento se l'utente ha già un token
  useEffect(() => {
    if (auth.token) {
      // Se l'utente ha già un token, reindirizza alla home o explore
      router.replace("/home");
    }
  }, [auth.token]);

  const headerImage = require("../assets/images/login.png");

  const handleLogin = async () => {
    setLoading(true);
    auth.login(email, password);
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
        <Image className="w-screen h-1/2" source={headerImage} alt="image" />

        <View className="w-full flex-grow p-5">
          <Text className="text-2xl font-semibold">Login</Text>
          <Box className="py-5 flex-col gap-2">
            <Input>
              <InputField
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="Enter your email"
              />
              <InputSlot className="pr-3">
                <InputIcon as={User}></InputIcon>
              </InputSlot>
            </Input>
            <Input>
              <InputField
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <InputSlot className="pr-3" onPress={handleState}>
                <InputIcon as={showPassword ? Eye : EyeClosed} />
              </InputSlot>
            </Input>
          </Box>
          <Box className="flex flex-col gap-2">
            <Button action="primary" onPress={handleLogin} disabled={loading}>
              <ButtonText>{loading ? "Caricamento..." : "Login"}</ButtonText>
            </Button>
          </Box>
        </View>
      </SafeAreaView>{" "}
    </>
  );
};

export default loginPage;
