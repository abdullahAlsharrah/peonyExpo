import { observer } from "mobx-react";
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import invoiceStore from "../../stores/invoiceStore";
import AddPackage from "./packages/AddPackage";

const ServiceItem = ({ service, handleopen }) => {
  const [quantity, setQuantity] = React.useState(1);
  const newItem = {
    quantity: quantity,
    serviceId: service.id,
    price: quantity * service.price,
    name: service.name,
  };
  const handleAdd = () => {
    invoiceStore.addItemToInvoice(newItem);
  };
  const handleRemove = () => {
    const foundItem = invoiceStore.items.find(
      (item) => item.serviceId === newItem.serviceId
    );
    if (foundItem) {
      invoiceStore.removeItemFromInvoice(`s${foundItem.serviceId}`);
    } else null;
  };
  const foundItem = invoiceStore.items.find(
    (item) => item.serviceId === service.id
  );

  const handlePackage = () => {
    handleopen(service.id, service.price);
  };

  return (
    <TouchableOpacity
      onLongPress={handleRemove}
      onPress={handleopen ? handlePackage : handleAdd}
    >
      <View>
        <View
          style={[
            styles.item,
            { backgroundColor: foundItem ? "tomato" : "#c39e81" },
          ]}
        >
          <Text
            style={{
              fontSize: 20,
              color: foundItem ? "white" : "white",
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
    height: 100,
    width: 159,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    margin: 2,
    // marginBottom: 50,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 1.25,

    elevation: 5,
    backgroundColor: "#c39e81",
  },
});
