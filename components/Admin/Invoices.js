import { observer } from "mobx-react";
import { Content, List } from "native-base";
import React from "react";
import { View, Text } from "react-native";
import invoiceStore from "../../stores/invoiceStore";
import InvoiceItem from "./InvoiceItem";

const Invoices = ({ month }) => {
  const list = invoiceStore.invoices.filter(
    (invoice) => new Date(invoice.createdAt).getMonth() === month
  );
  const invoicesList = list.map((invoice) => (
    <InvoiceItem invoice={invoice} key={invoice.id} />
  ));
  const totalInvoicesPrice = () => {
    let total = 0;
    list.map((invoice) =>
      invoice.services.forEach((service) => {
        total += service.price;
      })
    );

    return total;
  };

  return (
    <Content>
      <Text style={{ textAlign: "center", fontSize: 20 }}>Total</Text>
      <Text style={{ textAlign: "center", fontSize: 20 }}>
        {totalInvoicesPrice()} KD
      </Text>
      <List>{invoicesList}</List>
    </Content>
  );
};

export default observer(Invoices);
