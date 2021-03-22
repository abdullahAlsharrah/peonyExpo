import { observer } from "mobx-react";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const RecieptItem = ({ item }) => {
  return (
    <View style={styles.box}>
      <Text style={styles.item}>{item.name}</Text>
      <Text
        style={[
          styles.item1,
          {
            color: item.time ? (item.time < 4 ? "gray" : "black") : "black",
            textDecorationLine: item.time
              ? item.time < 4
                ? "line-through"
                : null
              : null,
          },
        ]}
      >
        {item.time ? (item.time < 4 ? item.nprice : item.price) : item.price}
      </Text>
    </View>
  );
};

export default observer(RecieptItem);
const styles = StyleSheet.create({
  item: {
    fontSize: 15,
    textAlign: "left",
    fontWeight: "600",
    width: "70%",
  },
  item1: {
    // borderWidth: 2,
    fontSize: 15,
    textAlign: "right",
    fontWeight: "600",
    width: "30%",
  },
  box: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 4,
  },
});
