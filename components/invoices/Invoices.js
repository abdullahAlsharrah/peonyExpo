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
        // new Date(invoice.createdAt).getDate() === 23 &&
        // new Date(invoice.createdAt).getMonth() === d.getMonth()
      );
  const invoicesList = list.map((invoice) => (
    <InvoiceItem
      invoice={invoice}
      key={invoice.id}
      navigation={navigation}
      month={month}
    />
  ));

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

  const cashBackByDate = () => {
    let total = 0;

    costStore.costs
      .filter(
        (cost) =>
          (cost.invoiceId !== null) &
          (dtFormat.format(new Date(cost.createdAt)) === dtFormat.format(d))
      )
      .forEach((cost) => (total += cost.price));
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
    <Content style={{ marginLeft: -10 }}>
      {month ? (
        <View
          style={{ flexDirection: "row", justifyContent: "center", margin: 10 }}
        >
          <View style={styles.total}>
            <Text style={{ fontSize: 12 }}>
              Cash:{" "}
              <Text style={{ color: "green" }}>
                {totalPaymentInvoices("cash")} KD
              </Text>
            </Text>
            <Text style={{ fontSize: 12 }}>
              K-net:{" "}
              <Text style={{ color: "green" }}>
                {totalPaymentInvoices("k-net")} KD
              </Text>
            </Text>
          </View>
          <View style={styles.total}>
            <Text style={{ fontSize: 12 }}>
              Cash Back:{" "}
              <Text style={{ color: "red" }}>{cashBackByMonth()} KD</Text>
            </Text>
            <Text style={{ fontSize: 12 }}>
              Income:{" "}
              <Text
                style={{
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
                {(
                  totalInvoicesPrice() -
                  totalCost() -
                  cashBackByMonth()
                ).toFixed(2)}{" "}
                KD
              </Text>
            </Text>
          </View>
        </View>
      ) : (
        <View
          style={{ flexDirection: "row", justifyContent: "center", margin: 10 }}
        >
          <Text style={styles.total}>
            Incomes: <Text style={styles.total}>{totalInvoicesPrice()} KD</Text>
          </Text>
          <Text style={styles.total}>
            Cash back:{" "}
            <Text style={{ color: "red" }}>{cashBackByDate()} KD</Text>
          </Text>
          <Text style={styles.total}>
            Total:{" "}
            <Text style={{ color: "green" }}>
              {totalInvoicesPrice() - cashBackByDate()} KD
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
