import { ListItem, Text, View } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import costStore from "../../stores/costStore";

function InvoicesByMonthItem({ invoice, navigation, month }) {
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
  return (
    <ListItem
      style={{ flexDirection: "row" }}
      onPress={() =>
        navigation.navigate("Reciept", { invoice: invoice, month: month })
      }
    >
      <Text>
        {new Date(invoice.createdAt).getDate()}/
        {new Date(invoice.createdAt).getMonth() + 1}
      </Text>

      <Text style={styles.text}>{invoice.id}</Text>

      <Text style={styles.text}>
        {invoice.phoneNumber ? invoice.phoneNumber : "no number"}
      </Text>

      <Text style={styles.text}>
        {invoice.services.length +
          invoice.offers.length +
          invoice.packages.length}
        : {invoice.products.length}
      </Text>

      <Text style={[styles.text, { color: _invoice ? "tomato" : "black" }]}>
        {_invoice ? invoice.price - costPrices() : invoice.price} KD
      </Text>
    </ListItem>
  );
}

export default InvoicesByMonthItem;
const styles = StyleSheet.create({
  text: { textAlign: "center", width: "25%" },
});
