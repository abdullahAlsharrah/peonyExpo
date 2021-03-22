import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import RecieptItem from "./RecieptItem";
import { observer } from "mobx-react";
import invoiceStore from "../../stores/invoiceStore";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { Icon } from "native-base";

const RecieptList = () => {
  const handleCheckout = () => {
    invoiceStore.setPhoneNumber(phoneNumber);
    invoiceStore.checkout();
    setPhoneNumber();
  };
  const handleCancel = () => {
    invoiceStore.cancelCheckout();
    setPhoneNumber();
  };
  const recieptServiceList = invoiceStore.items
    // .map((item) => ({
    //   ...serviceStore.services.find((service) => service.id === item.serviceId),
    //   ...productStore.products.find((product) => product.id === item.productId),
    //   ...offerStore.offers.find((offer) => offer.id === item.offerId),
    //   ...apackageStore.apackages.find(
    //     (apackage) => apackage.id === item.apackageId
    //   ),
    // }))
    .map((item) => (
      <RecieptItem
        item={item}
        key={
          item.serviceId || item.productId || item.apackageId || item.offerId
        }
      />
    ));
  const [phoneNumber, setPhoneNumber] = React.useState();

  return (
    <View style={styles.view}>
      <View style={styles.container}>
        <View style={styles.title}>
          <Text
            style={{
              textAlign: "left",
              fontSize: 15,
              color: "#555",
              fontWeight: "700",
              width: "50%",
            }}
          >
            Phone Number:
          </Text>
          <TextInput
            keyboardType="number-pad"
            maxLength={8}
            style={{
              marginLeft: -15,
              textAlign: "left",
              fontSize: 15,
              width: "50%",
            }}
            value={phoneNumber}
            onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
          />
        </View>
        <View style={styles.title}>
          <Text
            style={{
              textAlign: "left",
              fontSize: 16,
              color: "#555",
              fontWeight: "700",
              width: "70%",
            }}
          >
            Service
          </Text>
          <Text style={[styles.text1, { color: "#555", width: "30%" }]}>
            Price KD
          </Text>
        </View>

        <ScrollView>
          <View style={{ marginBottom: 70 }}>{recieptServiceList}</View>
        </ScrollView>
        <View
          style={[
            styles.button,
            {
              backgroundColor:
                invoiceStore.items.length === 0 ? "gray" : "#2a9df4",
            },
          ]}
        >
          <Text style={{ color: "white" }}>Total</Text>
          <Button
            disabled={invoiceStore.items.length === 0 ? true : false}
            title={`${invoiceStore.totalPrice} KD`}
            color={"white"}
            onPress={handleCheckout}
          />
        </View>

        <Icon
          name="close"
          style={{
            color: "tomato",
            position: "absolute",
            top: 3,
            right: 2,
          }}
          onPress={handleCancel}
        />
      </View>
    </View>
  );
};

export default observer(RecieptList);
const styles = StyleSheet.create({
  text1: {
    textAlign: "right",
    fontSize: 15,
    fontWeight: "700",
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
    borderBottomWidth: 1,
    flexDirection: "row",
    marginBottom: 10,
    marginHorizontal: 20,
  },

  container: {
    padding: 10,
    paddingTop: 20,
    backgroundColor: "white",
    // borderColor: "gray",
    // borderWidth: 2,
    height: "100%",
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
    fontSize: 20,
    position: "absolute",
    bottom: 0,
    // left: 1,
    width: "107.5%",
    backgroundColor: "#2a9df4",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    height: 70,
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
