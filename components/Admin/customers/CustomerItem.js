import { ListItem, View } from "native-base";
import React from "react";
import { Text } from "react-native";

const CustomerItem = ({ customer }) => {
  return (
    <ListItem>
      <Text style={{ width: "30%", padding: 5 }}>{customer.number}</Text>
      <View
        style={{
          padding: 5,
          borderRightWidth: 1,
          borderLeftWidth: 1,
          borderColor: "black",
          width: "24%",
        }}
      >
        <Text style={{ textAlign: "center" }}>
          {customer.price.toFixed(1)} KD
        </Text>
      </View>
      <View
        style={{
          padding: 5,
          borderRightWidth: 1,
          borderColor: "black",
          width: "30%",
        }}
      >
        <Text style={{ textAlign: "center" }}>
          {customer.invoices} Invoices
        </Text>
      </View>
      <View
        style={{
          padding: 5,
          borderRightWidth: 1,
          borderColor: "black",
          width: "28%",
        }}
      >
        <Text style={{ textAlign: "center" }}>{customer.count} Visits</Text>
      </View>
    </ListItem>
  );
};

export default CustomerItem;
