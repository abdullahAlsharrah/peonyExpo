import { observer } from "mobx-react";
import { Item } from "native-base";
import React from "react";
import { View, Text } from "react-native";
import Device from "react-native-device-detection";

const MenuItem = ({ item }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginHorizontal: Device.isTablet ? 100 : 20,
        marginTop: 25,
      }}
    >
      <Text style={{ width: "50%", color: "#c39e81", fontWeight: "700" }}>
        {item.name}
      </Text>
      <Text
        style={{
          width: "12%",
          color: "#c39e81",
          fontWeight: "700",
          textAlign: Device.isTablet ? "left" : "center",
        }}
      >
        {item.price}KD
      </Text>
      <Text
        style={{
          width: "38%",
          color: "#c39e81",
          fontWeight: "700",
          textAlign: "right",
        }}
      >
        {item.arabic}
      </Text>
    </View>
  );
};

export default observer(MenuItem);
