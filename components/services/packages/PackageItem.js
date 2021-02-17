import { observer } from "mobx-react";
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import invoiceStore from "../../../stores/invoiceStore";

const PackageItem = ({ apackage }) => {
  const handleSubmit = () => {
    const newItem =
      apackage.time === 5
        ? {
            apackageId: apackage.id,
            price: apackage.price,
            time: apackage.time - 1,
          }
        : { apackageId: apackage.id, price: 0, time: apackage.time - 1 };

    const foundItem = invoiceStore.items.find(
      (item) => item.apackageId === newItem.apackageId
    );
    if (foundItem) invoiceStore.removeItemFromInvoice(foundItem.apackageId);
    else invoiceStore.addItemToInvoice(newItem);
  };

  const foundItem = invoiceStore.items.find(
    (item) => item.apackageId === apackage.id
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
            {apackage.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default observer(PackageItem);
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
