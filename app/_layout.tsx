import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { StateManager } from "@/lib/state";
import { PushNotificationProvider } from "@/provider/push-notification";
import { ActivityIndicator, Text } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      await StateManager.init();
      await SplashScreen.hideAsync();
      setIsReady(true);
    };
    init();
  }, []);

  if (!isReady) {
    return (
      <Text>
        <ActivityIndicator />
      </Text>
    );
  }

  return (
    // <Splash isReady={isReady}>
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <PushNotificationProvider>
        <Stack
          screenOptions={{
            autoHideHomeIndicator: true,
            animation: "ios",
            contentStyle: {
              backgroundColor: "transparent",
            },
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" />
        </Stack>
      </PushNotificationProvider>
    </ThemeProvider>
    // </Splash>
  );
}
