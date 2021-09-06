import { observer } from "mobx-react";
import { ListItem } from "native-base";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Device from "react-native-device-detection";
import costStore from "../../stores/costStore";
import invoiceStore from "../../stores/invoiceStore";

const InvoiceItem = ({ invoice, navigation, month }) => {
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
      style={{
        flexDirection: "row",
      }}
      onPress={() =>
        navigation.navigate("Reciept", {
          invoice: invoice,
          month: month,
        })
      }
    >
      {invoice.payment === "online" ? (
        <>
          <View
            style={{
              backgroundColor: "#ca844ea6",
              height: 15,
              width: 15,
              borderRadius: 100,
              position: "absolute",
              left: Device.isTablet ? 15 : null,
            }}
          />
        </>
      ) : null}
      {month ? (
        <Text style={{ marginLeft: 18, marginRight: -18 }}>
          {new Date(invoice.createdAt).getDate()}/
          {new Date(invoice.createdAt).getMonth() + 1}
        </Text>
      ) : null}
      <Text
        style={[
          styles.text,
          { color: invoice.notes !== null ? "red" : "black" },
        ]}
      >
        {invoice.id}
      </Text>

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
};
export default observer(InvoiceItem);
const styles = StyleSheet.create({
  text: { textAlign: "center", width: "25%" },
});
