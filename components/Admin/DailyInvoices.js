import { observer } from "mobx-react";
import { Content, List, Spinner } from "native-base";
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
      <List>{invoicesList}</List>
    </Content>
  );
};

export default observer(DailyInvoices);
