import { observer } from "mobx-react";
import { Content, List, ListItem, Spinner, View } from "native-base";
import React from "react";
import { StyleSheet, Text } from "react-native";
import costStore from "../../stores/costStore";
import employeeStore from "../../stores/employeeStore";
import invoiceStore from "../../stores/invoiceStore";
import InvoiceItem from "./InvoiceItem";
import "intl";
import "intl/locale-data/jsonp/en"; // or any other locale you need

const Invoices = ({ month, navigation }) => {
  if (invoiceStore.loading) return <Spinner />;
  const d = new Date();
  let dtFormat = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const list = month
    ? invoiceStore.invoices.filter(
        (invoice) =>
          (new Date(invoice.createdAt).getMonth() === month - 1) &
          (new Date(invoice.createdAt).getFullYear() === d.getFullYear())
      )
    : invoiceStore.invoices.filter(
        (invoice) =>
          dtFormat.format(new Date(invoice.createdAt)) === dtFormat.format(d)
      );
  const invoicesList = list.map((invoice) => (
    <InvoiceItem invoice={invoice} key={invoice.id} navigation={navigation} />
  ));

  const totalInvoicesPrice = () => {
    let total = 0;
    list.forEach((invoice) => {
      total += invoice.price;
    });

    return total;
  };
  const costByDate = () => {
    let total = 0;

    costStore.costs
      .filter(
        (cost) =>
          (cost.invoiceId !== null) &
          (dtFormat.format(new Date(cost.createdAt)) === dtFormat.format(d))
      )
      .forEach((cost) => (total += cost.price));
    return total;
  };
  const totalCost = () => {
    let total = 0;
    costStore.costs
      // .filter((cost) => cost.invoiceId === null)
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
        <View
          style={{ flexDirection: "row", justifyContent: "center", margin: 10 }}
        >
          <Text style={styles.total}>
            Incomes:{" "}
            <Text style={{ color: "green" }}>{totalInvoicesPrice()} KD</Text>
          </Text>
          <Text style={styles.total}>
            Cash back: <Text style={{ color: "red" }}>{costByDate()} KD</Text>
          </Text>
          <Text style={styles.total}>
            Total:{" "}
            <Text style={styles.total}>
              {totalInvoicesPrice() - costByDate()} KD
            </Text>
          </Text>
        </View>
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
