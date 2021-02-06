import { observer } from "mobx-react";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const RecieptItem = ({ service }) => {
  return (
    <View style={styles.box}>
      <View style={styles.item}>
        <Text style={{ textAlign: "center", fontSize: 20 }}>
          {service.name}
        </Text>
      </View>
      <Text style={styles.item1}>{service.price}</Text>
    </View>
  );
};

export default observer(RecieptItem);
const styles = StyleSheet.create({
  item: {
    borderRightWidth: 2,
    width: "50%",
  },
  item1: {
    // borderWidth: 2,
    width: "50%",
    textAlign: "center",
    fontSize: 20,
  },
  box: {
    flexDirection: "row",
    borderBottomWidth: 2,
  },
});
