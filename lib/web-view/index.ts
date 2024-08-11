import { registerForPushNotificationsAsync } from "@/provider/push-notification";
import { bridge } from "@webview-bridge/react-native";
import * as Notifications from "expo-notifications";

export const appBridge = bridge({
  async check() {
    return true;
  },
  async pushNotification(request: Notifications.NotificationRequestInput) {
    await registerForPushNotificationsAsync();

    await Notifications.scheduleNotificationAsync({
      content: request.content,
      trigger: request.trigger ?? { seconds: 5 },
      identifier: request.identifier,
    });
  },
});

// Export the bridge type to be used in the web application
export type AppBridge = typeof appBridge;
