import { useGame } from "@/hooks/gameHook";
import { useEffect } from "react";
import { Image, StyleSheet } from "react-native";
import Animated, { Easing, useAnimatedStyle, withSequence, withTiming } from "react-native-reanimated";

export default function Dino() {
  const { jumping, stopJump, shadowHeight } = useGame();


  function handleJump() {
    shadowHeight.value =
      withSequence(
        withTiming(-150, {
        duration: 600,
        easing: Easing.linear,
      }),
      withTiming(
        0,
        {
          duration: 800,
          easing: Easing.linear,
        },
          () => stopJump(),
        ),
      );
  }

  useEffect(() => {
    if (jumping) {
      handleJump();

    }
  }, [jumping])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{
      translateY: shadowHeight.value
    }]
  }))

  return (
    <Animated.View style={[styles.dino, animatedStyle]}>
      {jumping ? (
        <Image
          source={require("@/assets/images/haha.gif")}
          resizeMode="contain"
          style={styles.image}
        />
      ) : (

        <Image
          source={require("@/assets/images/Shadow.gif")}
          resizeMode="contain"
          style={styles.image}
        />
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  dino: {
    width: 110,
    height: 110,
    position: "absolute",
    zIndex: 10,
    bottom: "10%",
    left: 50,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});