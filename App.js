import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Categories from "./components/Categories";
import RecieptList from "./components/RecieptList";
import Service from "./components/Service";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Text style={styles.logoText}>PEONY</Text>
      </View>
      <View style={styles.container1}>
        <View style={styles.recipt}>
          <RecieptList />
        </View>
        <View style={styles.box}>
          <Categories />
        </View>
        {/* <StatusBar style="auto" /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logoText: {
    textAlign: "center",
    fontSize: 100,
    color: "white",
  },
  logo: {
    height: 100,
    marginTop: 20,
    marginHorizontal: 30,
    marginBottom: 5,
  },
  container: {
    flex: 1,
    backgroundColor: "#c39e81",
  },
  container1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: "70%",
    backgroundColor: "transparent",
    height: "80%",
    borderWidth: 2,
    borderColor: "transparent",
    marginRight: -30,
    // padding: 10,
    marginTop: -10,
    marginBottom: 80,
  },
  recipt: {
    width: "30%",
    height: "100%",
    borderWidth: 2,
    borderColor: "transparent",
  },
});
