import { Button } from "native-base";
import React from "react";
import { View, Text, Touchable, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const Months = ({ month, setMonth, setDay }) => {
  const months = [
    { name: "Jan", id: 1 },
    { name: "Feb", id: 2 },
    { name: "Mar", id: 3 },
    { name: "Apr", id: 4 },
    { name: "May", id: 5 },
    { name: "Jun", id: 6 },
    { name: "Jul", id: 7 },
    { name: "Aug", id: 8 },
    { name: "Sep", id: 9 },
    { name: "Oct", id: 10 },
    { name: "Nov", id: 11 },
    { name: "Dec", id: 12 },
  ];
  const monthList = months.map((_month) => (
    <Button
      key={_month.id}
      style={month === _month.id ? styles.button1 : styles.button}
      onPress={() => setMonth(_month.id) & setDay(null)}
    >
      <Text style={month === _month ? styles.text1 : styles.text}>
        {_month.name}
      </Text>
    </Button>
  ));
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={{ display: "flex", flexDirection: "row" }}>{monthList}</View>
    </ScrollView>
  );
};

export default Months;
const styles = StyleSheet.create({
  button: {
    width: 50,
    justifyContent: "center",
    borderRadius: 0,
    backgroundColor: "white",
  },
  text: {
    color: "black",
  },
  button1: {
    width: 50,
    justifyContent: "center",
    borderRadius: 0,
    backgroundColor: "#c39e81",
  },
  text1: {
    color: "white",
  },
});
