import React, { forwardRef, useCallback, useEffect } from "react";
import {
  AccessibilityInfo,
  Image as RNImage,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import Animated, {
  Easing,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { G, Path, SvgProps } from "react-native-svg";

import * as SplashScreen from "expo-splash-screen";
import MaskedView from "@react-native-masked-view/masked-view";

import splashBackground from "@/assets/images/splash-bg.png";
import { Image } from "expo-image";

const splashImageUri = RNImage.resolveAssetSource(splashBackground).uri;

export const Logo = React.forwardRef(function LogoImpl(props: SvgProps, ref) {
  const width = 1000;
  const height = width * (640 / 582);
  return (
    <Svg
      fill="none"
      // @ts-ignore it's fiiiiine
      ref={ref}
      viewBox="0 0 58 64"
      style={[{ width, height }]}
    >
      <G>
        <Path
          d="M398.247 70.1076C397.959 69.7777 397.629 69.4478 397.34 69.1179C395.649 67.3033 393.917 65.5712 392.226 63.7154C353.379 24.4139 299.478 0 239.887 0C121.735 0 25.976 95.7587 25.976 213.869C25.976 219.808 26.2647 225.664 26.7596 231.438C28.4917 278.492 30.8423 407.449 7.74806 461.597C-20.7899 528.446 34.5951 555.788 87.1346 541.313C134.107 528.405 141.819 505.228 172.13 505.228C205.41 505.228 149.53 582.594 239.845 582.594C319.315 582.594 306.406 509.311 360.595 509.311C411.609 509.311 378.122 567.088 463.777 567.088C549.432 567.088 639.954 453.308 639.954 316.845C639.954 180.383 520.152 198.281 398.165 70.0664L398.247 70.1076Z"
          fill="black"
        />
        <Path
          d="M214.482 286.947C239.673 286.947 260.093 253.233 260.093 211.644C260.093 170.055 239.673 136.34 214.482 136.34C189.292 136.34 168.871 170.055 168.871 211.644C168.871 253.233 189.292 286.947 214.482 286.947Z"
          fill="black"
        />
        <Path
          d="M105.695 269.959C124.713 269.959 140.13 247.193 140.13 219.11C140.13 191.027 124.713 168.262 105.695 168.262C86.6769 168.262 71.2598 191.027 71.2598 219.11C71.2598 247.193 86.6769 269.959 105.695 269.959Z"
          fill="black"
        />
        <Path
          d="M398.253 70.103C397.964 69.7731 397.634 69.4432 397.345 69.1133C395.655 67.2987 393.923 65.5667 392.232 63.7109C354.332 25.3991 302.164 1.27385 244.305 0.119141C299.69 32.2449 416.481 113.075 457.514 242.691C492.444 353.008 440.276 468.067 398.212 536.525C406.954 551.536 419.285 567.166 463.824 567.166C549.479 567.166 640 453.385 640 316.923C640 180.461 520.199 198.359 398.212 70.1443L398.253 70.103Z"
          fill="black"
        />
      </G>
    </Svg>
  );
});
<svg
  width="640"
  height="583"
  viewBox="0 0 640 583"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <g clip-path="url(#clip0_233_2125)">
    <path
      d="M398.247 70.1076C397.959 69.7777 397.629 69.4478 397.34 69.1179C395.649 67.3033 393.917 65.5712 392.226 63.7154C353.379 24.4139 299.478 0 239.887 0C121.735 0 25.976 95.7587 25.976 213.869C25.976 219.808 26.2647 225.664 26.7596 231.438C28.4917 278.492 30.8423 407.449 7.74806 461.597C-20.7899 528.446 34.5951 555.788 87.1346 541.313C134.107 528.405 141.819 505.228 172.13 505.228C205.41 505.228 149.53 582.594 239.845 582.594C319.315 582.594 306.406 509.311 360.595 509.311C411.609 509.311 378.122 567.088 463.777 567.088C549.432 567.088 639.954 453.308 639.954 316.845C639.954 180.383 520.152 198.281 398.165 70.0664L398.247 70.1076Z"
      fill="white"
    />
    <path
      d="M214.482 286.947C239.673 286.947 260.093 253.233 260.093 211.644C260.093 170.055 239.673 136.34 214.482 136.34C189.292 136.34 168.871 170.055 168.871 211.644C168.871 253.233 189.292 286.947 214.482 286.947Z"
      fill="black"
    />
    <path
      d="M105.695 269.959C124.713 269.959 140.13 247.193 140.13 219.11C140.13 191.027 124.713 168.262 105.695 168.262C86.6769 168.262 71.2598 191.027 71.2598 219.11C71.2598 247.193 86.6769 269.959 105.695 269.959Z"
      fill="black"
    />
    <path
      d="M398.253 70.103C397.964 69.7731 397.634 69.4432 397.345 69.1133C395.655 67.2987 393.923 65.5667 392.232 63.7109C354.332 25.3991 302.164 1.27385 244.305 0.119141C299.69 32.2449 416.481 113.075 457.514 242.691C492.444 353.008 440.276 468.067 398.212 536.525C406.954 551.536 419.285 567.166 463.824 567.166C549.479 567.166 640 453.385 640 316.923C640 180.461 520.199 198.359 398.212 70.1443L398.253 70.103Z"
      fill="#EFEFEF"
    />
  </g>
  <defs>
    <clipPath id="clip0_233_2125">
      <rect width="640" height="582.635" fill="white" />
    </clipPath>
  </defs>
</svg>;

type Props = {
  isReady: boolean;
};

const AnimatedLogo = Animated.createAnimatedComponent(Logo);

export function Splash(props: React.PropsWithChildren<Props>) {
  const insets = useSafeAreaInsets();
  const intro = useSharedValue(0);
  const outroLogo = useSharedValue(0);
  const outroApp = useSharedValue(0);
  const outroAppOpacity = useSharedValue(0);
  const [isAnimationComplete, setIsAnimationComplete] = React.useState(false);
  const [isImageLoaded, setIsImageLoaded] = React.useState(false);
  const [isLayoutReady, setIsLayoutReady] = React.useState(false);
  const [reduceMotion, setReduceMotion] = React.useState<boolean | undefined>(
    false
  );
  const isReady =
    props.isReady &&
    isImageLoaded &&
    isLayoutReady &&
    reduceMotion !== undefined;

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const logoAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(intro.value, [0, 1], [0.8, 1], "clamp"),
        },
        {
          scale: interpolate(
            outroLogo.value,
            [0, 0.08, 1],
            [1, 0.8, 500],
            "clamp"
          ),
        },
      ],
      opacity: interpolate(intro.value, [0, 1], [0, 1], "clamp"),
    };
  });
  const bottomLogoAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(intro.value, [0, 1], [0, 1], "clamp"),
    };
  });
  const reducedLogoAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(intro.value, [0, 1], [0.8, 1], "clamp"),
        },
      ],
      opacity: interpolate(intro.value, [0, 1], [0, 1], "clamp"),
    };
  });

  const logoWrapperAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        outroAppOpacity.value,
        [0, 0.1, 0.2, 1],
        [1, 1, 0, 0],
        "clamp"
      ),
    };
  });

  const appAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(outroApp.value, [0, 1], [1.1, 1], "clamp"),
        },
      ],
      // right: interpolate(outroApp.value, [0, 1], [-width, 0]),
      opacity: interpolate(
        outroAppOpacity.value,
        [0, 0.1, 0.2, 1],
        [0, 0, 1, 1],
        "clamp"
      ),
    };
  });

  const onFinish = useCallback(() => setIsAnimationComplete(true), []);
  const onLayout = useCallback(() => setIsLayoutReady(true), []);
  const onLoadEnd = useCallback(() => setIsImageLoaded(true), []);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync()
        .then(() => {
          intro.value = withTiming(
            1,
            { duration: 400, easing: Easing.out(Easing.cubic) },
            async () => {
              // set these values to check animation at specific point
              // outroLogo.value = 0.1
              // outroApp.value = 0.1
              outroLogo.value = withTiming(
                1,
                { duration: 1200, easing: Easing.in(Easing.cubic) },
                () => {
                  runOnJS(onFinish)();
                }
              );
              outroApp.value = withTiming(1, {
                duration: 1200,
                easing: Easing.inOut(Easing.cubic),
              });
              outroAppOpacity.value = withTiming(1, {
                duration: 1200,
                easing: Easing.in(Easing.cubic),
              });
            }
          );
        })
        .catch(() => {});
    }
  }, [onFinish, intro, outroLogo, outroApp, outroAppOpacity, isReady]);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion);
  }, []);

  const logoAnimations =
    reduceMotion === true ? reducedLogoAnimation : logoAnimation;
  // special off-spec color for dark mode
  const logoBg = isDarkMode ? "#0F1824" : "#fff";
  // const logoBg = "#fff";

  return (
    <View style={{ flex: 1 }} onLayout={onLayout}>
      {!isAnimationComplete && (
        <View style={StyleSheet.absoluteFillObject}>
          <Image
            accessibilityIgnoresInvertColors
            onLoadEnd={onLoadEnd}
            source={{ uri: splashImageUri }}
            style={StyleSheet.absoluteFillObject}
          />

          {/* <Animated.View
            style={[
              bottomLogoAnimation,
              {
                position: "absolute",
                bottom: insets.bottom + 40,
                left: 0,
                right: 0,
                alignItems: "center",
                justifyContent: "center",
                opacity: 0,
              },
            ]}
          >
            <Logotype fill="#fff" width={90} />
          </Animated.View> */}
        </View>
      )}

      {isReady && (
        <MaskedView
          style={[StyleSheet.absoluteFillObject]}
          maskElement={
            <Animated.View
              style={[
                {
                  backgroundColor: "transparent",
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  transform: [
                    { translateY: -(insets.top / 2) },
                    { scale: 0.1 },
                  ],
                },
              ]}
            >
              <AnimatedLogo fill={logoBg} style={[logoAnimations]} />
            </Animated.View>
          }
        >
          {!isAnimationComplete && (
            <View
              style={[
                StyleSheet.absoluteFillObject,
                {
                  backgroundColor: logoBg,
                },
              ]}
            />
          )}
          <Animated.View style={[{ flex: 1 }, appAnimation]}>
            {props.children}
          </Animated.View>
        </MaskedView>
      )}
    </View>
  );
}
