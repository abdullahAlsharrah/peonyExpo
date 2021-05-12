import { observer } from "mobx-react";
import React from "react";
import { View, Text, StyleSheet, Touchable, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import costStore from "../../stores/costStore";
import offerStore from "../../stores/offerStore";
import AddCost from "../Admin/cost/Addcost";

const RecieptItem = ({ item, route }) => {
  const offer = item.OrderOfferItem
    ? offerStore.offers.find(
        (offer) => offer.id === item.OrderOfferItem.offerId
      )
    : null;
  const cost = route
    ? costStore.costs.find(
        (cost) =>
          (cost.itemId === item.id) &
          (cost.invoiceId === route.params.invoice.id)
      )
    : null;

  return (
    <>
      {route ? (
        <AddCost _invoiceId={route.params.invoice.id} item={item} />
      ) : null}
      <View style={styles.box}>
        <Text>
          {route ? item.OrderItem.quantity : item.quantity}x{"  "}
        </Text>
        <Text style={[styles.item, { color: cost ? "tomato" : "black" }]}>
          {item.name}
        </Text>

        <Text
          style={[
            styles.item1,
            {
              color: item.pprice
                ? "black"
                : route
                ? item.time
                  ? item.time < 4
                    ? "gray"
                    : "black"
                  : "black"
                : item.time
                ? item.time < 5
                  ? "gray"
                  : "black"
                : "black",
              textDecorationLine: item.pprice
                ? null
                : route
                ? item.time
                  ? item.time < 4
                    ? "line-through"
                    : null
                  : null
                : item.time
                ? item.time < 5
                  ? "line-through"
                  : null
                : null,
            },
          ]}
        >
          {cost ? (
            <Text style={{ color: "tomato" }}>
              {cost.price}
              {"   "}
            </Text>
          ) : null}
          {route
            ? item.OrderItem.quantity * item.price
            : item.pprice
            ? item.pprice
            : item.time
            ? item.time < 5
              ? item.nprice
              : item.price
            : item.price}
        </Text>
      </View>
      {item.OrderOfferItem
        ? offer.services.map((service) => (
            <Text style={{ marginLeft: 50 }}>- {service.name}</Text>
          ))
        : null}
    </>
  );
};

export default observer(RecieptItem);
const styles = StyleSheet.create({
  item: {
    fontSize: 15,
    textAlign: "left",
    fontWeight: "600",
    width: "60%",
  },
  item1: {
    // borderWidth: 2,
    fontSize: 15,
    textAlign: "right",
    fontWeight: "600",
    width: "30%",
  },
  box: {
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 20,
    marginBottom: 4,
    marginLeft: -0,
  },
});
