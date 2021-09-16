import { ListItem } from "native-base";
import React from "react";
import { Text } from "react-native";

const CustomerItem = ({ customer }) => {
  return (
    <ListItem>
      <Text style={{ width: "70%", padding: 5 }}>{customer.number}</Text>
      <Text style={{ padding: 5 }}>{customer.count} Visits</Text>
    </ListItem>
  );
};

export default CustomerItem;
