import { observer } from "mobx-react";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Categories from "../components/services/Categories";
import RecieptList from "../components/invoices/RecieptList";

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

export default ServicesScreen;
const styles = StyleSheet.create({
  logoText: {
    textAlign: "center",
    fontSize: 50,
    color: "white",
    // color: "#c39e81",
  },
  logo: {
    height: 50,
    marginTop: 20,
    marginHorizontal: 30,
    marginBottom: 5,
  },
  container: {
    height: "100%",
    backgroundColor: "#c39e81",
  },
  container1: {
    height: "87%",
    flexDirection: "row",
    marginVertical: 20,
    marginHorizontal: 10,
  },
  box: {
    width: "70%",
    marginLeft: 5,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "transparent",
    marginBottom: 5,
  },
  recipt: {
    marginTop: -10,
    width: "30%",
    borderWidth: 2,
    borderColor: "transparent",
    marginBottom: 33,
  },
});
