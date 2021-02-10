import { observer } from "mobx-react";
import { Body, Left, ListItem, Right, View } from "native-base";
import React from "react";
import { Text } from "react-native";
import invoiceStore from "../../stores/invoiceStore";

const InvoiceItem = ({ invoice }) => {
  if (invoiceStore.loading) return <Spinner />;

  const totalInvoicePrice = () => {
    let total = 0;
    invoice.services.forEach((service) => {
      total += service.price;
    });
    invoice.products.forEach((product) => {
      total += product.price;
    });

    return total;
  };
  return (
    <ListItem>
      <Left
        style={{
          width: "30%",
          //   justifyContent: "center",
        }}
      >
        <Text style={{ width: 100, textAlign: "center" }}>{invoice.id}</Text>
        <View
          style={{
            width: "50%",
            justifyContent: "center",
          }}
        >
          <Text style={{ textAlign: "center", marginLeft: 20 }}>
            {invoice.phoneNumber ? invoice.phoneNumber : "no number"}
          </Text>
        </View>
      </Left>
      <Body>
        <Text style={{ textAlign: "center" }}>
          {invoice.services.length} :{" "}
          <Text style={{ textAlign: "center" }}>{invoice.products.length}</Text>
        </Text>
      </Body>
      <Left
        style={{
          justifyContent: "center",
        }}
      >
        <Text style={{ textAlign: "center" }}>{totalInvoicePrice()} KD</Text>
      </Left>
    </ListItem>
  );
};

export default observer(InvoiceItem);
