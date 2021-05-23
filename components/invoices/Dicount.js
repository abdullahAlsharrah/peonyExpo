import React from "react";
import { View, Text, Button } from "react-native";
import invoiceStore from "../../stores/invoiceStore";

const Dicount = () => {
  const discount20 = () => {
    invoiceStore.discount === 0.2
      ? invoiceStore.setDiscount(0)
      : invoiceStore.setDiscount(0.2);
  };
  const discount10 = () => {
    invoiceStore.discount === 0.1
      ? invoiceStore.setDiscount(0)
      : invoiceStore.setDiscount(0.1);
  };
  return (
    <View
      style={{
        flexDirection: "row",
        height: 70,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          // position: "absolute",
          bottom: 63,
          height: 70,
          width: "50%",
          marginRight: 5,
          backgroundColor: invoiceStore.discount === 0.1 ? "tomato" : "gray",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button title={"10%"} color={"white"} onPress={discount10} />
      </View>
    </View>
  );
};

export default Dicount;
