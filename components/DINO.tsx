import { useGame } from "@/hooks/gameHook";
import { useEffect } from "react";
import { Image, StyleSheet} from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSequence, withTiming, Easing } from "react-native-reanimated";

export default function Dino() {
  const { jumping, stopJump } = useGame();
  const dinoHeight = useSharedValue(0);

  function handleJump() {
    dinoHeight.value =
      withSequence(
        withTiming(-100, {
          duration: 350,
          easing: Easing.linear,
        }),
        withTiming(0, {
          duration: 350,
          easing: Easing.linear,
        }),
        withTiming(
          0,{
            duration: 400,
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
      translateY: dinoHeight.value
    }]
  }))

  return (
    <Animated.View style={[styles.dino, animatedStyle]}>
      { jumping ? (
        <Image
        source={require("@/assets/images/S.gif")}
        resizeMode="contain"
        style={styles.image}
      /> 
      ) : (
      
        <Image
        source={require("@/assets/images/S.gif")}
        resizeMode="contain"
        style={styles.image}
      /> 
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  dino: {
    width: 80,
    height: 80,
    position: "absolute",
    zIndex: 10,
    bottom: "27%",
    left: "10%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});