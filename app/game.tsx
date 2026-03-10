import Shadow from "@/components/Shadow";
import MovingBackground from "@/components/MovingBackground";
import Obstacle from "@/components/Obstacle";
import Score from "@/components/Score";
import { useGame } from "@/hooks/gameHook";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

export default function GameScreean() {
  const { jump } = useGame();
  const [obstacles, setObstacles] = useState([] as any);

  function spawnObstacle() {
    setObstacles((oldValue: any) => [...oldValue, Date.now().toString()]);
  }

  function removeObstacle(id: any) {
    setObstacles((oldValue: any) =>
      oldValue.filter((obstacle: any) => obstacle !== id),
    );
  }

  useEffect(() => {
    const interval = setInterval(() => spawnObstacle(), 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Pressable onPress={jump} style={styles.button}>
      <View style={styles.container}>
        <MovingBackground />
        <Shadow />
        <Score />
        {obstacles.map((obstacle: any) => (
          <Obstacle key={obstacle} onEnd={() => removeObstacle(obstacle)} />
        ))}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: "100%",
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgb(247, 247, 247)",
    position: "relative",
    overflow: 'hidden',
  },
});