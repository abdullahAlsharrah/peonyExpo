import { observer } from "mobx-react";
import { Body, Left, ListItem, Right } from "native-base";
import React from "react";
import { View, Text } from "react-native";
import invoiceStore from "../../stores/invoiceStore";
import Invoices from "./Invoices";

const InvoiceItem = ({ invoice }) => {
  const totalInvoicePrice = () => {
    let total = 0;
    invoice.services.forEach((service) => {
      total += service.price;
    });

    return total;
  };
  <Invoices total={totalInvoicePrice} />;
  return (
    <ListItem>
      <Left>
        <Text>Invoice No. {invoice.id}</Text>
      </Left>
      <Body>
        <Text style={{ textAlign: "left", marginLeft: -20 }}>
          Number Of Services {invoice.services.length}
        </Text>
      </Body>
      <Right>
        <Text>{totalInvoicePrice()} KD</Text>
      </Right>
    </ListItem>
  );
};

export default observer(InvoiceItem);