import { Link } from "expo-router";
import { StyleSheet, View, Text } from "react-native";

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Method</Text>
      <Link href="/" dismissTo style={styles.link}>
        <Text style={styles.linkText}>Close Modal</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: "#20a653",
    borderRadius: 8,
  },
  linkText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
