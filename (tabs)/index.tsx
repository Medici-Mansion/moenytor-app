import { Text, View, Button } from "react-native";
import * as Notifications from "expo-notifications";
import { usePushContext } from "@/provider/push-notification";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// 잠금화면 가시용
// 결재 예시 푸시
// 당일 지출 리뷰 페이지 연속적인 리뷰

export default function App() {
  const { channels, pushNotification, notification } = usePushContext();
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Text>{`Channels: ${JSON.stringify(
        channels.map((c) => c.id),
        null,
        2
      )}`}</Text>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text>
          Title: {notification && notification.request.content.title}{" "}
        </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>
          Data:{" "}
          {notification && JSON.stringify(notification.request.content.data)}
        </Text>
      </View>
      <Button
        title="Press to schedule a notification"
        onPress={async () => {
          await pushNotification();
        }}
      />
    </View>
  );
}
