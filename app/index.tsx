import { useGame } from "@/hooks/gameHook";
import { Link, router } from "expo-router";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const { setScore } = useGame();

  const ir = () => {
    router.push("/game");
  };

  return (
    <ImageBackground
      source={require("@/assets/images/Index.png")}
      resizeMode="cover"
      style={styles.Background}
    >
      <View style={styles.container}>
        <Link href={"/game"} asChild replace>
          <TouchableOpacity style={styles.button} onPress={(ir) => setScore(0)}>
            <Text>JOGAR</Text>
          </TouchableOpacity>
        </Link>
        <View style={styles.separator} />
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2f97a5",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderWidth: 4,
    borderRadius: 999,
    marginBottom: 10,
  },
  Background: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 90,
    fontWeight: "bold",
    flex: 1,
  },
  separator: {
    marginVertical: 60,
    height: 3,
    width: "80%",
  },
});