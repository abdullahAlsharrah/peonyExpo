import { observer } from "mobx-react";
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import invoiceStore from "../../../stores/invoiceStore";

const OfferItem = ({ offer }) => {
  const handleSubmit = () => {
    const newItem = {
      offerId: offer.id,
      price: offer.price,
    };

    const foundItem = invoiceStore.items.find(
      (item) => item.offerId === newItem.offerId
    );
    if (foundItem) invoiceStore.removeItemFromInvoice(foundItem.offerId);
    else invoiceStore.addItemToInvoice(newItem);
  };

  const foundItem = invoiceStore.items.find(
    (item) => item.offerId === offer.id
  );

  return (
    <TouchableOpacity onPress={handleSubmit}>
      <View>
        <View
          style={[
            styles.item,
            { backgroundColor: foundItem ? "tomato" : "white" },
          ]}
        >
          <Text
            style={{
              fontSize: 20,
              color: foundItem ? "white" : "black",
              textAlign: "center",
            }}
          >
            {offer.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default observer(OfferItem);
const styles = StyleSheet.create({
  item: {
    height: 50,
    width: 100,
    borderRadius: 8,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    margin: 10,
    marginBottom: 50,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 3.25,

    elevation: 5,
  },
});
