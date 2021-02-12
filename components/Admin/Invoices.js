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
import invoiceStore from "../../stores/invoiceStore";
import InvoiceItem from "./InvoiceItem";

const Invoices = ({ month }) => {
  if (invoiceStore.loading) return <Spinner />;
  const d = new Date();

  const list = month
    ? invoiceStore.invoices.filter(
        (invoice) => new Date(invoice.createdAt).getMonth() === month - 1
      )
    : invoiceStore.invoices.filter(
        (invoice) => new Date(invoice.createdAt).getDate() === d.getDate()
      );
  const invoicesList = list.map((invoice) => (
    <InvoiceItem invoice={invoice} key={invoice.id} />
  ));
  const totalInvoicesPrice = () => {
    let total = 0;
    list.map(
      (invoice) =>
        invoice.services.forEach((service) => {
          total += service.price;
        }) & invoice.products.forEach((product) => (total += product.price))
    );

    return total;
  };

  return (
    <Content style={{ marginLeft: -10 }}>
      <Text style={{ textAlign: "center", fontSize: 20 }}>
        Totals: {totalInvoicesPrice()} KD
      </Text>
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
});
