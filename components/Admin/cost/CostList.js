import { observer } from "mobx-react";
import { Item, Spinner } from "native-base";
import React from "react";
import { View, Text } from "react-native";
import costStore from "../../../stores/costStore";
import AddCost from "./Addcost";
import CostItem from "./CostItem";

const CostList = () => {
  if (costStore.loading) return <Spinner />;
  let counter = 1;
  const costList = costStore.costs
    .slice()
    .sort((a, b) => b.createdAt - a.createdAt)
    .map((cost) => (
      <CostItem cost={cost} key={`c${cost.id}`} counter={counter++} />
    ));
  return (
    <View style={{ flex: 1, margin: 20, marginTop: 60 }}>
      <View style={{ flexDirection: "row", width: "100%" }}>
        <Item style={{ width: "50%", justifyContent: "center" }}>
          <Text>Name</Text>
        </Item>
        <Item style={{ width: "50%", justifyContent: "center" }}>
          <Text>Price</Text>
        </Item>
      </View>
      {costList}
      <AddCost />
    </View>
  );
};

export default observer(CostList);
