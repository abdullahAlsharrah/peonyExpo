import { observer } from "mobx-react";
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import invoiceStore from "../../stores/invoiceStore";
import AddPackage from "./packages/AddPackage";

const ServiceItem = ({ service, handleopen }) => {
  const handleSubmit = () => {
    const newItem = {
      serviceId: service.id,
      price: service.price,
    };
    const foundItem = invoiceStore.items.find(
      (item) => item.serviceId === newItem.serviceId
    );
    if (foundItem) invoiceStore.removeItemFromInvoice(foundItem.serviceId);
    else invoiceStore.addItemToInvoice(newItem);
  };

  const foundItem = invoiceStore.items.find(
    (item) => item.serviceId === service.id
  );

  const handlePackage = () => {
    handleopen(service.id, service.price);
  };
  return (
    <TouchableOpacity onPress={handleopen ? handlePackage : handleSubmit}>
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
            {service.name}
          </Text>
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
