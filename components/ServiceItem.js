import { observer } from "mobx-react";
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import invoiceStore from "../stores/invoiceStore";

const ServiceItem = ({ service }) => {
  const handleSubmit = () => {
    const newItem = {
      serviceId: service.id,
      price: service.price,
    };
    invoiceStore.addItemToInvoice(newItem);
  };

  return (
    <TouchableOpacity onPress={handleSubmit}>
      <View>
        <View style={styles.item}>
          <Text style={{ fontSize: 20 }}>{service.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default observer(ServiceItem);
const styles = StyleSheet.create({
  item: {
    height: 50,
    width: 100,
    backgroundColor: "white",
    borderRadius: 8,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    margin: 15,
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
