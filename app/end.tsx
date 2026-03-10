import { useGame } from "@/hooks/gameHook";
import { Link } from "expo-router";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";

export default function End() {
  const { score } = useGame();

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.container} source={require("@/assets/images/FinalDeGame.png")}
      />

      <View style={styles.shadow}>
        <Image source={require("@/assets/images/Shadow.gif")} style={styles.image} />
      </View>

      <View style={styles.obstacle}>
        <Image style={styles.image} source={require("@/assets/images/Badnik.gif")} resizeMode="contain" />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.text}>Fim de Jogo!</Text>

        <Text style={styles.text}>Score: {score}</Text>


        <Link href="/" asChild>
          <Text style={styles.button}>Voltar</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  image: {
    display: "none",
    width: "100%",
    height: "100%",
  },
  shadow: {
    width: 80,
    height: 65,
    position: "absolute",
    bottom: "30%",
    left: 50,
  },
  obstacle: {
    width: 65,
    height: 65,
    position: "absolute",
    bottom: "30%",
    left: 90,
  },
  textContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: "-50%" }, { translateY: "-50%" }],
    gap: 10,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    width: "auto",
    fontSize: 30,
    fontWeight: "bold",
    color: "rgb(255, 255, 255)",
  },
  button: {
    width: "auto",
    backgroundColor: "rgb(0, 17, 255)",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 999,
    color: "rgb(255, 255, 255)",
    fontSize: 20,

  },
});