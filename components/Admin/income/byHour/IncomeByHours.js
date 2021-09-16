import React from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import invoiceStore from "../../../../stores/invoiceStore";
import Hours from "./Hours";

const IncomByHours = ({ list }) => {
  const hours = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, "empt2", "empt"];

  const income = (hour) => {
    let total = 0;
    if (hour === 19) {
      list
        .filter((invoice) => new Date(invoice.createdAt).getHours() >= hour)
        .forEach((invoice) => (total += invoice.price));
      return total;
    } else {
      list
        .filter((invoice) => new Date(invoice.createdAt).getHours() === hour)
        .forEach((invoice) => (total += invoice.price));
      return total;
    }
  };
  const CheckMax = (income) => {
    const checked =
      Math.max(
        ...IncomeByHourList.filter(
          (invoice) =>
            invoice.props.hour !== "empt" || invoice.props.hour !== "empt2"
        ).map((invoice) => invoice.props.income)
      ) === income
        ? true
        : false;
    return checked;
  };
  const CheckMin = (income) => {
    const checked =
      Math.min(
        ...IncomeByHourList.filter((invoice) => invoice.props.income).map(
          (invoice) => invoice.props.income
        )
      ) === income
        ? true
        : false;
    return checked;
  };

  const IncomeByHourList = hours.map((hour) => (
    <Hours
      hour={hour}
      key={hour}
      income={income(hour)}
      CheckMax={CheckMax}
      CheckMin={CheckMin}
    />
  ));

  return (
    <View
      style={{
        justifyContent: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        alignContent: "center",
        alignItems: "center",
        width: "95%",
        marginTop: 15,
      }}
    >
      {IncomeByHourList}
    </View>
  );
};

export default IncomByHours;
