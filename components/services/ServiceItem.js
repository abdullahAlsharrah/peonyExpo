import { observer } from "mobx-react";
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import invoiceStore from "../../stores/invoiceStore";
import AddPackage from "./packages/AddPackage";

const ServiceItem = ({ service, handleopen, language }) => {
  const [quantity, setQuantity] = React.useState(1);
  const newItem = {
    quantity: quantity,
    serviceId: service.id,
    price: quantity * service.price,
    name: service.name,
    arabic: service.arabic,
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
      <View
        style={[
          styles.item,
          { backgroundColor: foundItem ? "tomato" : "#c39e81" },
        ]}
      >
        <View>
          <Text
            style={{
              color: foundItem ? "white" : "black",
              fontSize: 16,
              textAlign: "center",
            }}
          >
            {language === "ar" ? service.arabic : service.name}
          </Text>
        </View>

        <Text
          style={{
            color: foundItem ? "white" : "black",
            // marginTop: 40,
            fontSize: 15,
            textAlign: "center",
          }}
        >
          {service.price} Kd
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default observer(ServiceItem);
const styles = StyleSheet.create({
  item: {
    height: 150,
    width: 159,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    margin: 5,
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
  text: {
    fontSize: 20,
    textAlign: "center",
  },
});
