import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";
import { createContext } from "@/lib";
import * as Device from "expo-device";

type PushContext = {
  pushNotification: () => Promise<void>;
  notification?: Notifications.Notification;
  channels: Notifications.NotificationChannel[];
};

const [PushProvider, usePushContext] =
  createContext<PushContext>("PushNotification");

const PushNotificationProvider = ({ children }: PropsWithChildren) => {
  const [notification, setNotification] =
    useState<Notifications.Notification>();
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  const pushNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hi! Its’ Moneytor.",
        body: "Bake Cookies 4 times this week..🍪🍪🍪\nCome to Moneytor and review your history",
        data: { data: "goes here", test: { test1: "more data" } },
        interruptionLevel: "critical",
      },
      trigger: { seconds: 2 },
    });
  };

  const [channels, setChannels] = useState<Notifications.NotificationChannel[]>(
    []
  );

  useEffect(() => {
    registerForPushNotificationsAsync().then(
      (token) => token && console.log(token)
    );

    if (Platform.OS === "android") {
      Notifications.getNotificationChannelsAsync().then((value) =>
        setChannels(value ?? [])
      );
    }
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  console.log(notification);

  return (
    <PushProvider
      channels={channels}
      notification={notification}
      pushNotification={pushNotification}
    >
      {children}
    </PushProvider>
  );
};

export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    // EAS projectId is used here.
    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId;
      if (!projectId) {
        throw new Error("Project ID not found");
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(token);
    } catch (e) {
      token = `${e}`;
    }
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

export { PushNotificationProvider, usePushContext };
