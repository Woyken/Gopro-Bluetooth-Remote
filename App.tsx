import React from "react";
import { StyleSheet, Text, View } from "react-native";
import "./src/index.css";

export default function App() {
  return (
    <View style={styles.container}>
      <a className="button is-primary">this is bulma button!</a>
      <Text>Open up App.tsx to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
  },
});
