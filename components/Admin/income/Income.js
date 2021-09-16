import { Separator } from "native-base";
import React from "react";
import { View, Text } from "react-native";
import costStore from "../../../stores/costStore";
import invoiceStore from "../../../stores/invoiceStore";
import IncomByDays from "./byDays/IncomByDays";
import IncomByHours from "./byHour/IncomeByHours";

const Income = () => {
  const list = invoiceStore.invoices.map((invoice) => ({
    price: invoice.price,
    createdAt: invoice.createdAt,
  }));

  //   const totalRevenue = () => {
  //     let total = 0;
  //     list.forEach((invoice) => (total += invoice.price));
  //     return total.toFixed(2);
  //   };
  //   const totalCost = () => {
  //     let total = 0;
  //     costStore.costs
  //       .filter((cost) => cost.invoiceId === null)
  //       .forEach((cost) => (total += cost.price));
  //     return total.toFixed(2);
  //   };
  //   const totalCashBack = () => {
  //     let total = 0;
  //     costStore.costs
  //       .filter((cost) => cost.invoiceId !== null)
  //       .forEach((cost) => (total += cost.price));
  //     return total.toFixed(2);
  //   };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      {/* <Text>Total Revenu = {totalRevenue() - totalCashBack()}</Text>
      <Text>Total Cost = {totalCost()}</Text> */}
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>By Days</Text>
      <IncomByDays list={list} />
      <View
        style={{
          height: 3,
          backgroundColor: "#c39e81",
          width: "100%",
          marginBottom: 15,
          marginTop: 15,
        }}
      />
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>By Hours</Text>
      <IncomByHours list={list} />
    </View>
  );
};

export default Income;
