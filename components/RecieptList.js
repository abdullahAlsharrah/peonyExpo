import React from "react";
import { View, Text, StyleSheet } from "react-native";
import RecieptItem from "./RecieptItem";
import { observer } from "mobx-react";
import invoiceStore from "../stores/invoiceStore";
import serviceStore from "../stores/serviceStore";
import { Button, Spinner } from "native-base";

const RecieptList = () => {
  const handleCheckout = () => {
    invoiceStore.checkout();
  };
  const handleCancel = () => {
    invoiceStore.canlcelCheckout();
  };
  if (serviceStore.loading) return <Spinner />;

  const recieptList = invoiceStore.items
    .map((item) => ({
      ...serviceStore.services.find((service) => service.id === item.serviceId),
    }))
    .map((item) => <RecieptItem service={item} key={item.id} />);

  return (
    <View style={styles.view}>
      <View style={styles.container}>
        <View style={styles.title}>
          <View style={styles.text}>
            <Text style={{ textAlign: "center", fontSize: 25, color: "#555" }}>
              Service
            </Text>
          </View>
          <Text style={[styles.text1, { color: "#555" }]}>Price KD</Text>
        </View>
        <View>{recieptList}</View>
        <View style={styles.total}>
          <View style={styles.text}>
            <Text style={{ textAlign: "center", fontSize: 25, color: "#555" }}>
              Total
            </Text>
          </View>
          <Text style={[styles.text1, { color: "tomato" }]}>
            {invoiceStore.totalPrice}
          </Text>
        </View>
        <View
          style={{ position: "absolute", bottom: 10, flexDirection: "row" }}
        >
          <Button style={styles.button} onPress={handleCheckout}>
            <Text style={styles.checkoutText}>Check Out</Text>
          </Button>
          <Button style={styles.button1} onPress={handleCancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default observer(RecieptList);
const styles = StyleSheet.create({
  text1: {
    textAlign: "center",
    width: "50%",
    fontSize: 25,
  },
  text: {
    borderRightWidth: 2,
    textAlign: "center",
    width: "50%",
    fontSize: 25,
    // borderRightColor: "black",
  },
  total: {
    borderBottomWidth: 2,
    flexDirection: "row",
    // position: "absolute",
    // bottom: 50,
    // right: 5,
    // borderTopWidth: 2,
  },
  title: {
    borderBottomWidth: 2,
    flexDirection: "row",
  },

  container: {
    padding: 5,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 2,
    height: "90%",
    marginVertical: 10,
    marginHorizontal: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 3.25,

    elevation: 5,
  },
  view: {
    backgroundColor: "transparent",
  },
  button: {
    width: 150,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "black",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    left: 10,
    marginRight: 5,
  },
  button1: {
    width: 150,
    backgroundColor: "tomato",
    borderWidth: 2,
    borderColor: "black",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    left: 15,
    marginRight: 5,
  },
  checkoutText: {
    fontSize: 20,
    color: "tomato",
  },
  cancelText: {
    fontSize: 20,
    color: "white",
  },
});
