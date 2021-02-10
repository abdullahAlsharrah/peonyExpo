import { observer } from "mobx-react";
import {
  Body,
  Content,
  Left,
  List,
  ListItem,
  Right,
  Spinner,
  View,
} from "native-base";
import React from "react";
import { Text } from "react-native";
import invoiceStore from "../../stores/invoiceStore";
import InvoiceItem from "./InvoiceItem";

const DailyInvoices = () => {
  if (invoiceStore.loading) return <Spinner />;
  const d = new Date();
  const list = invoiceStore.invoices.filter(
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
    <Content>
      <Text style={{ textAlign: "center", fontSize: 20 }}>Total</Text>
      <Text style={{ textAlign: "center", fontSize: 20 }}>
        {totalInvoicesPrice()} KD
      </Text>
      <List>
        <ListItem>
          <Left>
            <Text style={{ width: 100, textAlign: "center" }}>Invoice No.</Text>
            <View
              style={{
                width: "50%",
                justifyContent: "center",
              }}
            >
              <Text style={{ textAlign: "center", marginLeft: 20 }}>
                Customer Phone No.
              </Text>
            </View>
          </Left>
          <Body>
            <Text style={{ textAlign: "center" }}>
              No. Of Services : Products
            </Text>
          </Body>
          <Left
            style={{
              justifyContent: "center",
            }}
          >
            <Text style={{ textAlign: "center" }}> Total KD</Text>
          </Left>
        </ListItem>
        {invoicesList}
      </List>
    </Content>
  );
};

export default observer(DailyInvoices);
