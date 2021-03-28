import { observer } from "mobx-react";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import offerStore from "../../stores/offerStore";
import apackageStore from "../../stores/packageStore";
import RecieptList from "./RecieptList";

const RecieptItem = ({ item, route }) => {
  const offer = item.OrderOfferItem
    ? offerStore.offers.find(
        (offer) => offer.id === item.OrderOfferItem.offerId
      )
    : null;
  return (
    <>
      <View style={styles.box}>
        <Text>
          {item.quantity}x{"  "}
        </Text>
        <Text style={styles.item}>{item.name}</Text>
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
          {route
            ? item.price
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
    marginHorizontal: 20,
    marginBottom: 4,
    marginLeft: -0,
  },
});
