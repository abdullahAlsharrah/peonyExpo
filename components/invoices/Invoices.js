import { observer } from "mobx-react";
import {
  Body,
  Content,
  Left,
  List,
  ListItem,
  Spinner,
  View,
} from "native-base";
import React from "react";
import { StyleSheet, Text } from "react-native";
import costStore from "../../stores/costStore";
import employeeStore from "../../stores/employeeStore";
import invoiceStore from "../../stores/invoiceStore";
import InvoiceItem from "./InvoiceItem";

const Invoices = ({ month }) => {
  if (invoiceStore.loading) return <Spinner />;
  const d = new Date();

  const list = month
    ? invoiceStore.invoices.filter(
        (invoice) =>
          (new Date(invoice.createdAt).getMonth() === month - 1) &
          (new Date(invoice.createdAt).getFullYear() === d.getFullYear())
      )
    : invoiceStore.invoices.filter(
        (invoice) =>
          (new Date(invoice.createdAt).getDate() === d.getDate()) &
          (new Date(invoice.createdAt).getFullYear() === d.getFullYear())
      );
  const invoicesList = list.map((invoice) => (
    <InvoiceItem invoice={invoice} key={invoice.id} />
  ));
  const totalInvoicesPrice = () => {
    let total = 0;
    list.forEach((invoice) => {
      total += invoice.price;
    });

    return total;
  };
  const totalCost = () => {
    let total = 0;
    costStore.costs
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
    <Content style={{ marginLeft: -10 }}>
      {month ? (
        <View
          style={{ flexDirection: "row", justifyContent: "center", margin: 10 }}
        >
          <Text style={styles.total}>
            Incomes:{" "}
            <Text style={{ color: "green" }}>{totalInvoicesPrice()} KD</Text>
          </Text>
          <Text style={styles.total}>
            Costs: <Text style={{ color: "red" }}>{totalCost()} KD</Text>
          </Text>
          <Text style={styles.total}>
            Total:{" "}
            <Text
              style={{
                color:
                  totalCost() === totalInvoicesPrice()
                    ? "black"
                    : totalCost() < totalInvoicesPrice()
                    ? "green"
                    : "red",
                textAlign: "center",
                fontSize: 15,
                width: "33%",
              }}
            >
              {totalInvoicesPrice() - totalCost()} KD
            </Text>
          </Text>
        </View>
      ) : (
        <Text style={styles.totalInvoices}>
          Today's Incomes: {totalInvoicesPrice()} KD
        </Text>
      )}
      <List>
        <ListItem>
          <Text style={styles.text}>No.</Text>
          <Text style={styles.text}>Phone No.</Text>

          <Text style={styles.text}>Serv : Prod</Text>

          <Text style={styles.text}> Total KD</Text>
        </ListItem>
        {invoicesList}
      </List>
    </Content>
  );
};

export default observer(Invoices);
const styles = StyleSheet.create({
  text: { textAlign: "center", width: "25%" },
  total: {
    textAlign: "center",
    fontSize: 15,
    width: "33%",
  },
  totalInvoices: {
    textAlign: "center",
    fontSize: 20,
  },
});
