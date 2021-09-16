import React from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import invoiceStore from "../../../../stores/invoiceStore";
import Days from "./Days";

const IncomByDays = ({ list }) => {
  const days = [
    { name: "Sun", day: 0 },
    { name: "Mon", day: 1 },
    { name: "Tue", day: 2 },
    { name: "Wed", day: 3 },
    { name: "Thu", day: 4 },
    { name: "Fri", day: 5 },
    { name: "Sat", day: 6 },
    { name: "empt", day: null },
  ];

  const income = (day) => {
    let total = 0;
    list
      .filter((invoice) => new Date(invoice.createdAt).getDay() === day.day)
      .forEach((invoice) => (total += invoice.price));
    return total;
  };
  const CheckMax = (income) => {
    const checked =
      Math.max(...IncomeByDaysList.map((invoice) => invoice.props.income)) ===
      income
        ? true
        : false;
    return checked;
  };
  const CheckMin = (income) => {
    const checked =
      Math.min(
        ...IncomeByDaysList.filter((invoice) => invoice.props.income).map(
          (invoice) => invoice.props.income
        )
      ) === income
        ? true
        : false;
    return checked;
  };
  const IncomeByDaysList = days.map((day) => (
    <Days
      day={day}
      key={day.day}
      income={income(day)}
      CheckMax={CheckMax}
      CheckMin={CheckMin}
    />
  ));

  return (
    <View
      style={{
        justifyContent: "center",
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        width: "95%",
        marginTop: 15,
      }}
    >
      {IncomeByDaysList}
    </View>
  );
};

export default IncomByDays;
