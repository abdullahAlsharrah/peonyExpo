import { observer } from "mobx-react";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Categories from "../components/Categories";
import RecieptList from "../components/RecieptList";

const ServicesScreen = () => {
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
};

export default observer(ServicesScreen);
const styles = StyleSheet.create({
  logoText: {
    textAlign: "center",
    fontSize: 100,
    // color: "white",
    color: "#c39e81",
  },
  logo: {
    height: 100,
    marginTop: 20,
    marginHorizontal: 30,
    marginBottom: 5,
  },
  container: {
    flex: 1,
    // backgroundColor: "#c39e81",
    // backgroundColor: "white",
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
    marginRight: 10,
    marginBottom: 80,
  },
  recipt: {
    width: "30%",
    height: "100%",
    borderWidth: 2,
    borderColor: "transparent",
  },
});
