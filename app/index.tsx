import { appBridge } from "@/lib/web-view";
import { createWebView } from "@webview-bridge/react-native";
import { useColorScheme, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const { WebView } = createWebView({
  bridge: appBridge,
  debug: true,
});
export default function IndexPage() {
  const { top } = useSafeAreaInsets();
  const colorShcme = useColorScheme();
  return (
    <View
      style={{
        paddingTop: top,
        flex: 1,
        backgroundColor: colorShcme === "dark" ? "black" : "white",
      }}
    >
      <WebView
        source={{ uri: "https://moneytor-five.vercel.app/" }}
        originWhitelist={["*"]}
      />
    </View>
  );
}
