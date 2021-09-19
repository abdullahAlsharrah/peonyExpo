import { observer } from "mobx-react";
import { Separator } from "native-base";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import costStore from "../../stores/costStore";
import invoiceStore from "../../stores/invoiceStore";
import offerStore from "../../stores/offerStore";
import serviceStore from "../../stores/serviceStore";
import AddCost from "../Admin/cost/Addcost";

const RecieptItem = ({ item, route, language }) => {
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

  const orderItem = route
    ? item.OrderItem
      ? item.OrderItem.quantity
      : item.OrderPackageItem
      ? item.OrderPackageItem.quantity
      : item.OrderOfferItem
      ? item.OrderOfferItem.quantity
      : item.OrderProductItem.quantity
    : null;

  const service = item.serviceId
    ? serviceStore.services.find((service) => service.id === item.serviceId)
    : null;
  const handleRemove = () => {
    invoiceStore.removeItemFromInvoice(`o${item.offerId}`);
  };
  return (
    <>
      {route ? (
        <AddCost _invoiceId={route.params.invoice.id} item={item} />
      ) : null}
      <TouchableOpacity
        onLongPress={route ? null : item.offerId ? handleRemove : null}
      >
        <View style={styles.box}>
          <Text>
            {route ? orderItem : item.quantity}x{"  "}
          </Text>
          {language === "ar" ? (
            <Text style={[styles.item, { color: cost ? "tomato" : "black" }]}>
              {route
                ? item.arabic
                  ? item.arabic
                  : service
                  ? `اشتراك ${service.arabic}`
                  : item.name
                : item.arabic
                ? item.arabic
                : item.name}
            </Text>
          ) : (
            <Text style={[styles.item, { color: cost ? "tomato" : "black" }]}>
              {route
                ? item.name
                  ? item.name
                  : service
                  ? `اشتراك ${service.name}`
                  : item.name
                : item.name}
            </Text>
          )}

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
              ? orderItem * item.price
              : item.pprice
              ? item.pprice
              : item.time
              ? item.time < 5
                ? item.nprice
                : item.price
              : item.price}
          </Text>
        </View>
      </TouchableOpacity>
      {item.OrderOfferItem
        ? offer.services.map((service) => (
            <Text style={{ marginLeft: 50 }}>- {service.arabic}</Text>
          ))
        : null}
      <Separator
        style={{ height: 1, backgroundColor: "#e9e9e9", marginBottom: 20 }}
      />
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
