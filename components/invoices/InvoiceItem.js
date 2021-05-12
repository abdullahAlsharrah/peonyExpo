import { observer } from "mobx-react";
import { Body, Left, ListItem, Right, View } from "native-base";
import React from "react";
import { StyleSheet, Text } from "react-native";
import costStore from "../../stores/costStore";
import invoiceStore from "../../stores/invoiceStore";

const InvoiceItem = ({ invoice, navigation }) => {
  if (invoiceStore.loading) return <Spinner />;
  const _invoice = costStore.costs.find(
    (cost) => cost.invoiceId === invoice.id
  );

  let costs = 0;
  const costPrices = () => {
    costStore.costs
      .filter((cost) => cost.invoiceId === invoice.id)
      .forEach((cost) => (costs += cost.price));

    return costs;
  };
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
    <ListItem
      style={{ flexDirection: "row" }}
      onPress={() => navigation.navigate("Reciept", { invoice: invoice })}
    >
      <Text style={styles.text}>{invoice.id}</Text>

      <Text style={styles.text}>
        {invoice.phoneNumber ? invoice.phoneNumber : "no number"}
      </Text>

      <Text style={styles.text}>
        {invoice.services.length} : {invoice.products.length}
      </Text>

      <Text style={[styles.text, { color: _invoice ? "tomato" : "black" }]}>
        {_invoice ? invoice.price - costPrices() : invoice.price} KD
      </Text>
    </ListItem>
  );
};

export default observer(InvoiceItem);
const styles = StyleSheet.create({
  text: { textAlign: "center", width: "25%" },
});
