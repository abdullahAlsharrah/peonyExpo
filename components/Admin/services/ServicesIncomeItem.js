import { ListItem } from "native-base";
import React from "react";
import { Text } from "react-native";

const ServicesIncomeItem = ({ service }) => {
  return (
    <ListItem>
      <Text style={{ width: "70%", padding: 5 }}>{service.name}</Text>
      <Text style={{ padding: 5 }}>{service.count} Times</Text>
    </ListItem>
  );
};

export default ServicesIncomeItem;
