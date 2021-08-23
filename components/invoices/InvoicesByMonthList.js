import { Content, Separator, Text, View } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import costStore from "../../stores/costStore";
import employeeStore from "../../stores/employeeStore";
import invoiceStore from "../../stores/invoiceStore";
import DaysOfMonthItem from "./DaysOfMonthItem";
import InvoicesByMonthItem from "./InvoicesByMonthItem";

function InvoicesByMonthList({ month, navigation }) {
  let days = [];
  const year = new Date().getFullYear();
  // the last date of the month
  const lastDay = new Date(year, month, 0).getDate();
  for (let x = 1; x <= lastDay; x++) {
    days.push(x);
  }
  const daysList = days.map((day) => (
    <DaysOfMonthItem day={day} navigation={navigation} month={month} />
  ));

  const d = new Date();

  const list = invoiceStore.invoices.filter(
    (invoice) =>
      (new Date(invoice.createdAt).getMonth() === month - 1) &
      (new Date(invoice.createdAt).getFullYear() === d.getFullYear())
  );
  const totalInvoicesPrice = () => {
    let total = 0;
    list.forEach((invoice) => {
      total += invoice.price;
    });

    return total.toFixed(2);
  };
  const totalPaymentInvoices = (payment) => {
    let total = 0;
    list
      .filter((invoice) => invoice.payment === payment)
      .forEach((invoice) => {
        total += invoice.price;
      });
    return total.toFixed(2);
  };

  const cashBackByMonth = () => {
    let total = 0;

    costStore.costs
      .filter(
        (cost) =>
          (cost.invoiceId !== null) &
          (new Date(cost.createdAt).getMonth() === month - 1)
      )
      .forEach((cost) => (total += cost.price));
    return total;
  };
  const totalCost = () => {
    let total = 0;
    costStore.costs
      .filter((cost) => cost.invoiceId === null)
      .filter(
        (cost) =>
          (new Date(cost.createdAt).getMonth() === month - 1) &
          (new Date(cost.createdAt).getFullYear() === new Date().getFullYear())
      )
      .forEach((cost) => (total += cost.price));
    employeeStore.employees
      .filter(
        (employee) => new Date(employee.createdAt).getMonth() <= month - 1
      )
      .forEach((employee) => (total += employee.salary));
    return total;
  };
  return (
    <Content>
      <View
        style={{ flexDirection: "row", justifyContent: "center", margin: 10 }}
      >
        <View style={styles.total}>
          <Text style={{ fontSize: 12 }}>
            Cash:{" "}
            <Text style={{ color: "green", fontSize: 12 }}>
              {totalPaymentInvoices("cash")} KD
            </Text>
          </Text>
          <Text style={{ fontSize: 12 }}>
            K-net:{" "}
            <Text style={{ color: "green", fontSize: 12 }}>
              {totalPaymentInvoices("k-net")} KD
            </Text>
          </Text>
        </View>
        <View style={styles.total}>
          <Text style={{ fontSize: 12 }}>
            Cash Back:{" "}
            <Text style={{ color: "red", fontSize: 12 }}>
              {cashBackByMonth()} KD
            </Text>
          </Text>
          <Text style={{ fontSize: 12 }}>
            Income:{" "}
            <Text
              style={{
                fontSize: 12,
                color:
                  cashBackByMonth() === totalInvoicesPrice()
                    ? "black"
                    : cashBackByMonth() < totalInvoicesPrice()
                    ? "green"
                    : "red",
              }}
            >
              {totalInvoicesPrice() - cashBackByMonth()} KD
            </Text>
          </Text>
        </View>

        <View style={(styles.total, { marginLeft: 5 })}>
          <Text style={{ fontSize: 12 }}>
            Cost:{" "}
            <Text
              style={{
                color: "red",
                textAlign: "center",
                fontSize: 12,
              }}
            >
              {totalCost()} KD
            </Text>
          </Text>
          <Text style={{ fontSize: 12 }}>
            Revenue:{" "}
            <Text
              style={{
                color:
                  totalCost() + cashBackByMonth() === totalInvoicesPrice()
                    ? "black"
                    : totalCost() + cashBackByMonth() < totalInvoicesPrice()
                    ? "green"
                    : "red",
                textAlign: "center",
                fontSize: 12,
                width: "33%",
              }}
            >
              {(totalInvoicesPrice() - totalCost() - cashBackByMonth()).toFixed(
                2
              )}{" "}
              KD
            </Text>
          </Text>
        </View>
      </View>
      <Separator style={{ height: 3, backgroundColor: "#c39e81" }} />
      {daysList}
    </Content>
  );
}

export default InvoicesByMonthList;
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
