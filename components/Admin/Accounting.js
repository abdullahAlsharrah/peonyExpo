import { observer } from "mobx-react";
import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import invoiceStore from "../../stores/invoiceStore";
import Cost from "./cost/Addcost";
import Employee from "./Employee";

const Accounting = () => {
  const [budget, isBudget] = React.useState("5000");
  const [rent, isRent] = React.useState("350");

  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <View style={styles.budget}>
          <Text style={styles.text}>Budget:</Text>
          <TextInput
            numeric
            keyboardType={"numeric"}
            style={styles.input}
            value={budget}
            onChangeText={(budget) => isBudget(budget)}
          />
        </View>
        <View style={styles.budget}>
          <Text style={styles.text}>Income: </Text>
          <Text style={styles.text}>{invoiceStore.totalPrice}</Text>
        </View>
      </View>
      <View style={styles.view}>
        <View style={styles.budget}>
          <Text style={styles.text}>Rent:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => isRent(text)}
            value={rent}
          />
        </View>
        <Employee />
      </View>
      <Cost />
    </View>
  );
};

export default observer(Accounting);
const styles = StyleSheet.create({
  budget: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#c39e81",
    borderRadius: 100,
    width: 150,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 10,
    shadowRadius: 3.25,

    elevation: 5,
    margin: 10,
  },
  input: { marginHorizontal: 5, fontSize: 20, color: "#fff" },
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  view: {
    flexDirection: "row",
  },
  text: { fontSize: 20, color: "#fff" },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
