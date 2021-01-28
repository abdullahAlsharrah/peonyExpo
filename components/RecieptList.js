import React from "react";
import { View, Text, StyleSheet } from "react-native";
import recieptStore from "./stores/recieptStore";
import RecieptItem from "./RecieptItem";
import { observer } from "mobx-react";

const RecieptList = () => {
  const recieptList = recieptStore.items.map((service) => (
    <RecieptItem service={service} key={service.id} />
  ));
  return (
    <View style={styles.view}>
      <View style={styles.container}>
        <View style={styles.title}>
          <View style={styles.text}>
            <Text style={{ textAlign: "center" }}>Service</Text>
          </View>
          <Text style={styles.text1}>Price KD</Text>
        </View>
        <View>{recieptList}</View>
        <View style={styles.title}>
          <View style={styles.text}>
            <Text style={{ textAlign: "center" }}>Total</Text>
          </View>
          <Text style={styles.text1}>{recieptStore.totalPrice}</Text>
        </View>
      </View>
    </View>
  );
};

export default observer(RecieptList);
const styles = StyleSheet.create({
  text1: {
    // borderWidth: 2,
    textAlign: "center",
    width: "50%",
    // borderRightColor: "black",
  },
  text: {
    borderRightWidth: 2,
    textAlign: "center",
    width: "50%",
    // borderRightColor: "black",
  },
  title: {
    borderBottomWidth: 2,
    flexDirection: "row",
  },

  container: {
    padding: 5,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 2,
    height: "90%",
    marginVertical: 10,
    marginHorizontal: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 3.25,

    elevation: 5,
  },
  view: {
    backgroundColor: "transparent",
  },
});
