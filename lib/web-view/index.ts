import { createWebView, bridge } from "@webview-bridge/react-native";
import * as Notifications from "expo-notifications";

export const appBridge = bridge({
  async check() {
    return true;
  },
  async pushNotification(request: Notifications.NotificationRequestInput) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hi! Its’ Moneytor.",
        body: "Bake Cookies 4 times this week..🍪🍪🍪\nCome to Moneytor and review your history",
        data: { data: "goes here", test: { test1: "more data" } },
        badge: 10,
        interruptionLevel: "critical",
      },
      trigger: { seconds: 2 },
    });
  },
});

// Export the bridge type to be used in the web application
export type AppBridge = typeof appBridge;
