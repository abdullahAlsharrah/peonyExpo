import { observer } from "mobx-react";
import { ListItem } from "native-base";
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import invoiceStore from "../../../stores/invoiceStore";
import apackageStore from "../../../stores/packageStore";

const PackageItem = ({ apackage }) => {
  const handleSubmit = () => {
    const newItem =
      apackage.time === 5
        ? {
            apackageId: apackage.id,
            price: apackage.price,
            name: apackage.name,
            time: apackage.time,
          }
        : {
            apackageId: apackage.id,
            name: apackage.name,
            price: 0,
            nprice: apackage.price,
            time: apackage.time,
          };

    const foundItem = invoiceStore.items.find(
      (item) => item.apackageId === newItem.apackageId
    );
    if (foundItem) {
      invoiceStore.removeItemFromInvoice(`p${foundItem.apackageId}`);
      apackageStore.unUpdatePackage(foundItem.apackageId);
    } else if (apackage.time > 0) {
      invoiceStore.addItemToInvoice(newItem);
      apackageStore.updatePackage(newItem.apackageId);
    } else {
      Alert.alert(" Sorry This itme has finished");
    }
  };
  const foundItem = invoiceStore.items.find(
    (item) => item.apackageId === apackage.id
  );

  return (
    <ListItem
      style={{
        flexDirection: "row",
        backgroundColor: foundItem ? "tomato" : "white",
      }}
      onPress={handleSubmit}
    >
      <Text style={[styles.text, { color: foundItem ? "white" : "black" }]}>
        {apackage.name}
      </Text>

      <Text style={[styles.text, { color: foundItem ? "white" : "black" }]}>
        {service.phoneNumber}
      </Text>
      <Text style={[styles.text, { color: foundItem ? "white" : "black" }]}>
        {service.time}
      </Text>

      <Text style={[styles.text, { color: foundItem ? "white" : "black" }]}>
        {apackage.price} KD
      </Text>
    </ListItem>
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
  text: { textAlign: "center", width: "33%" },
});
