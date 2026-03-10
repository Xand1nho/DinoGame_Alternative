import { useGame } from "@/hooks/gameHook";
import React, { useEffect } from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import Animated, { Easing, useAnimatedReaction, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import ShadowBitmap from "@/assets/bitmaps/Shadow.json";
import ShadowMovingBitmap from "@/assets/bitmaps/ShadowJumping.json";
import Badnik from "@/assets/bitmaps/Badnik.json";
import { router } from "expo-router";



export default function Obstacle({ onEnd }: any) {
  const { width } = Dimensions.get("window");
  const offset = useSharedValue(0);
  const { shadowHeight } = useGame();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -offset.value }],
  }));

  useEffect(() => {
    offset.value = withTiming(
      width,
      {
        duration: 3000,
        easing: Easing.linear,
      },
      onEnd,
    );
  }, []);

  useAnimatedReaction(
    () => {
      return offset.value;
    },
    (currentValue) => {
      const badnikPosition = width - Math.round(currentValue);
      const shadowPosition = -Math.round(shadowHeight.value);
      const left = Math.max(50, badnikPosition);
      const right = Math.min(160, badnikPosition + 65);
      const bottom = Math.max(0, shadowPosition);
      const top = 65;

      if (left > right || bottom > top) {
        return;
      }
      console.log(top, bottom, left, right);
      for (let x = left; x < right; x++) {
        for (let y = bottom; y < top; y++) {

          const xShadow = x - 50;
          const xBadnik = x - badnikPosition;
          const yShadow = 110 - (y - shadowPosition);
          const yBadnik = 65 - y;

          const dinoBitmap =
            shadowHeight.value > 0 ? ShadowBitmap : ShadowMovingBitmap;
          if (
            xShadow < 110 &&
            xShadow > -1 &&
            yShadow < 110 &&
            yShadow > -1 &&
            xBadnik < 65 &&
            xBadnik > -1 &&
            yBadnik < 65 &&
            yBadnik > -1
          ) {
            router.replace("/end");
          }
        }
      }
    },
  );

  return (
    <Animated.View style={[styles.obstacle, animatedStyle]}>
      <Image
        source={require("@/assets/images/Badnik.gif")}
        resizeMode="contain"
        style={styles.image}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
  obstacle: {
    width: 65,
    height: 65,
    position: "absolute",
    bottom: "12%",
    right: 0,
  },
});
