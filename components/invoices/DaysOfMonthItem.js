import { Separator } from "native-base";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import costStore from "../../stores/costStore";
import invoiceStore from "../../stores/invoiceStore";
import InvoicesByMonthItem from "./InvoicesByMonthItem";

const DaysOfMonthItem = ({ month, day, navigation }) => {
  let dtFormat = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const year = new Date().getFullYear();
  const list = invoiceStore.invoices.filter(
    (invoice) =>
      // dtFormat.format(new Date(invoice.createdAt)) ===dtFormat.format(new Date(day, ))
      (new Date(invoice.createdAt).getMonth() === month - 1) &
      (new Date(invoice.createdAt).getFullYear() === new Date().getFullYear())
  );

  const invoicesList = list
    .filter((invoice) => new Date(invoice.createdAt).getDate() === day)
    .map((invoice) => (
      <InvoicesByMonthItem
        invoice={invoice}
        key={invoice.id}
        navigation={navigation}
        month={month}
      />
    ));
  const totalInvoicesPrice = () => {
    let total = 0;
    list
      .filter((invoice) => new Date(invoice.createdAt).getDate() === day)
      .forEach((invoice) => {
        total += invoice.price;
      });

    return total.toFixed(2);
  };
  const cashBackByDate = () => {
    let total = 0;
    costStore.costs
      .filter(
        (cost) =>
          (cost.invoiceId !== null) &
          (dtFormat.format(new Date(cost.createdAt)) ===
            dtFormat.format(new Date(year, month - 1, day)))
      )
      .forEach((cost) => (total += cost.price));
    return total.toFixed(2);
  };
  if (
    month - 1 > new Date().getMonth() ||
    (month - 1 >= new Date().getMonth()) & (day > new Date().getDate())
  )
    return null;
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          margin: 10,
          marginLeft: 20,
        }}
      >
        <Text>{day}</Text>
        <Text style={styles.total}>
          Incomes: <Text style={styles.total}>{totalInvoicesPrice()} KD</Text>
        </Text>
        <Text style={styles.total}>
          Cash back: <Text style={{ color: "red" }}>{cashBackByDate()} KD</Text>
        </Text>
        <Text style={styles.total}>
          Total:{" "}
          <Text style={{ color: "green" }}>
            {totalInvoicesPrice() - cashBackByDate()} KD
          </Text>
        </Text>
      </View>
      {invoicesList}
      <Separator style={{ height: 3, backgroundColor: "#c39e81" }} />
    </View>
  );
};

export default DaysOfMonthItem;
const styles = StyleSheet.create({
  text: { textAlign: "center", width: "25%" },
  total: {
    textAlign: "center",
    fontSize: 12,
    width: "33%",
  },
  totalInvoices: {
    textAlign: "center",
    fontSize: 20,
  },
});
