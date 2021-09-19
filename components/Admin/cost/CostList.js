import { observer } from "mobx-react";
import { Item, Separator, Spinner } from "native-base";
import React from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import costStore from "../../../stores/costStore";
import Months from "../../invoices/Months";
import AddCost from "./Addcost";
import CostItem from "./CostItem";

const CostList = () => {
  const [month, setMonth] = React.useState(new Date().getMonth() + 1);
  const [_day, setDay] = React.useState(null);
  if (costStore.loading) return <Spinner />;
  let counter = 1;
  const list = costStore.costs.filter(
    (cost) =>
      (new Date(cost.createdAt).getMonth() === month - 1) &
      (new Date(cost.createdAt).getFullYear() === new Date().getFullYear())
  );
  const costList = list
    .filter((cost) => cost.invoiceId === null)
    .slice()
    .sort((a, b) => b.createdAt - a.createdAt)
    .map((cost) => (
      <CostItem cost={cost} key={`c${cost.id}`} counter={counter++} />
    ));
  const cashBackList = list
    .filter((cost) => cost.invoiceId !== null)
    .slice()
    .sort((a, b) => b.createdAt - a.createdAt)
    .map((cost) => (
      <CostItem cost={cost} key={`c${cost.id}`} counter={counter++} />
    ));

  const totalCost = () => {
    let total = 0;
    list
      .filter((cost) => cost.invoiceId === null)
      .forEach((cost) => (total += cost.price));

    return total;
  };
  const totalPayment = (payment) => {
    let total = 0;
    list
      .filter((cost) => cost.payment === payment)
      .forEach((cost) => (total += cost.price));

    return total;
  };

  const totalCashBack = () => {
    let total = 0;
    list
      .filter((cost) => cost.invoiceId !== null)
      .forEach((cost) => (total += cost.price));

    return total;
  };
  return (
    <View style={{ flex: 1, paddingBottom: 20 }}>
      <View style={{ height: 50 }}>
        <Months setMonth={setMonth} month={month} setDay={setDay} />
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          margin: 20,
          flexDirection: "row",
        }}
      >
        <Text style={{ padding: 5 }}>
          Total K-net :
          <Text style={{ color: "red" }}> {totalPayment("k-net")} KD</Text>
        </Text>
        <Text style={{ padding: 5 }}>
          Total Cash :
          <Text style={{ color: "red" }}> {totalPayment("cash")} KD</Text>
        </Text>
      </View>

      <ScrollView>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ textAlign: "center" }}>Cost</Text>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              margin: 20,
            }}
          >
            <Text>
              Total Cost :
              <Text style={{ color: "red" }}> {totalCost()} KD</Text>
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              marginHorizontal: 20,
            }}
          >
            <Item style={{ width: "50%", justifyContent: "center" }}>
              <Text>Name</Text>
            </Item>
            <Item style={{ width: "50%", justifyContent: "center" }}>
              <Text>Price</Text>
            </Item>
          </View>
        </View>

        {costList}
        <Separator
          style={{ height: 1, backgroundColor: "#c39e81", marginBottom: 15 }}
        />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ textAlign: "center" }}>Cash Back</Text>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              margin: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>
              Total Cost :
              <Text style={{ color: "red" }}> {totalCashBack()} KD</Text>
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              marginHorizontal: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Item style={{ width: "50%", justifyContent: "center" }}>
              <Text>Name</Text>
            </Item>
            <Item style={{ width: "50%", justifyContent: "center" }}>
              <Text>Price</Text>
            </Item>
          </View>
        </View>

        {cashBackList}
      </ScrollView>
      <AddCost />
    </View>
  );
};

export default observer(CostList);
