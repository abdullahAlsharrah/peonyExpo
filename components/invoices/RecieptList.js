import React from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import RecieptItem from "./RecieptItem";
import { observer } from "mobx-react";
import invoiceStore from "../../stores/invoiceStore";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { Icon } from "native-base";
import Device from "react-native-device-detection";
import apackageStore from "../../stores/packageStore";
import Dicount from "./Dicount";
import costStore from "../../stores/costStore";

const RecieptList = ({ route }) => {
  const handleCheckout = (payment) => {
    invoiceStore.checkout(phoneNumber, payment);
    setPhoneNumber();
    invoiceStore.setDiscount(0);
  };
  const cash = "cash";
  const knet = "k-net";
  const hadnlePaymentMethhod = () => {
    Alert.alert("طريقه الدفع", "Payment Method", [
      {
        text: "Cash",
        onPress: () => handleCheckout(cash),
        style: "cancel",
      },
      { text: "K-net", onPress: () => handleCheckout(knet) },
    ]);
  };
  const handleCancel = () => {
    invoiceStore.cancelCheckout();
    setPhoneNumber();
  };
  let costs = 0;
  const costPrices = () => {
    route
      ? costStore.costs
          .filter((cost) => cost.invoiceId === route.params.invoice.id)
          .forEach((cost) => (costs += cost.price))
      : null;
    return costs;
  };
  const list = route
    ? [
        ...route.params.invoice.services.map((service) => service),
        ...route.params.invoice.packages.map((apackage) => apackage),
        ...route.params.invoice.offers.map((offer) => offer),
      ]
    : invoiceStore.items;
  const recieptServiceList = list
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
        route={route ? route : null}
      />
    ));
  const [phoneNumber, setPhoneNumber] = React.useState();
  return (
    <View
      style={[
        styles.view,
        {
          alignItems: "center",
        },
      ]}
    >
      {route ? (
        <Text style={styles.text1}>{route.params.invoice.payment}</Text>
      ) : null}
      <View
        style={
          route
            ? [
                styles.container,
                {
                  width: Device.isTablet ? "50%" : "95%",
                  height: "95%",
                },
              ]
            : styles.container
        }
      >
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
          {route ? (
            <Text>{route.params.invoice.phoneNumber}</Text>
          ) : (
            <TextInput
              keyboardType="number-pad"
              maxLength={8}
              style={{
                // marginLeft: -15,
                textAlign: "left",
                fontSize: 15,
                width: "50%",
              }}
              value={phoneNumber}
              onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
            />
          )}
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
        {route ? (
          route.params.invoice.discount === 0 ? null : (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text>Discount:</Text>
              <Text>
                {route.params.invoice.discount === 0.2 ? "20%" : "10%"}
              </Text>
            </View>
          )
        ) : invoiceStore.discount === 0 ? null : (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text>Discount:</Text>
            <Text>{invoiceStore.discount === 0.2 ? "20%" : "10%"}</Text>
          </View>
        )}
        <ScrollView>
          <View style={{ marginBottom: 70 }}>{recieptServiceList}</View>
        </ScrollView>

        {route ? null : <Dicount />}

        <View
          style={[
            styles.button,
            {
              backgroundColor: route
                ? "#2a9df4"
                : invoiceStore.items.length === 0
                ? "gray"
                : "#2a9df4",
              width: route ? (Device.isTablet ? "104.3%" : "106%") : "107.5%",
            },
          ]}
        >
          <Text style={{ color: "white" }}>Total</Text>
          <Button
            disabled={
              route ? true : invoiceStore.items.length === 0 ? true : false
            }
            title={
              route
                ? `${route.params.invoice.price - costPrices()} KD`
                : `${invoiceStore.totalPrice} KD`
            }
            color={"white"}
            onPress={hadnlePaymentMethhod}
          />
        </View>

        {/* {route ? null : (
          <>
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
          </>
        )} */}
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
    // marginHorizontal: 8,
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
