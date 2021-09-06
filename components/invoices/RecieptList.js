import React from "react";
import { View, Text, StyleSheet, Alert, Platform } from "react-native";
import RecieptItem from "./RecieptItem";
import { observer } from "mobx-react";
import invoiceStore from "../../stores/invoiceStore";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { Button, Icon } from "native-base";
import Device from "react-native-device-detection";
import apackageStore from "../../stores/packageStore";
import Dicount from "./Dicount";
import costStore from "../../stores/costStore";
import { StackActions } from "@react-navigation/native";
const RecieptList = ({ route, navigation }) => {
  const popAction = StackActions.pop(1);
  const handleCheckout = (payment) => {
    invoiceStore.checkout(phoneNumber, payment);
    setPhoneNumber();
    invoiceStore.setDiscount(0);
  };
  const [notes, setNotes] = route
    ? React.useState(route.params.invoice.notes)
    : React.useState(null);
  const handleDone = (invoice, notes) => {
    route.params.invoice.notDone === true
      ? invoice.notes === null
        ? Alert.alert("Done", " تم الحضور", [
            { text: "cancel", onPress: () => null, style: "cancel" },
            {
              text: "Yes",
              onPress: () =>
                invoiceStore.updateInvoice(invoice.id, null) &
                navigation.dispatch(popAction),
            },
          ])
        : Alert.alert("Done", " تم استكمال الاعمال", [
            { text: "cancel", onPress: () => null, style: "cancel" },
            {
              text: "Yes",
              onPress: () =>
                invoiceStore.updateInvoice(invoice.id, null) &
                navigation.dispatch(popAction),
            },
          ])
      : Alert.alert("لم يتم استكمال الاعمال", "not finished", [
          { text: "cancel", onPress: () => null, style: "cancel" },
          {
            text: "Yes",
            onPress: () =>
              invoiceStore.updateInvoice(invoice.id, notes) &
              navigation.dispatch(popAction),
          },
        ]);
  };
  const cash = "cash";
  const knet = "k-net";
  const online = "online";
  const hadnlePaymentMethhod = () => {
    Alert.alert("طريقه الدفع", "Payment Method", [
      { text: "cancel", onPress: () => null, style: "cancel" },
      {
        text: "Cash",
        onPress: () => handleCheckout(cash),
      },
      { text: "K-net", onPress: () => handleCheckout(knet) },
      { text: "Online", onPress: () => handleCheckout(online) },
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
  // console.log(notes);
  const list = route
    ? [
        ...route.params.invoice.services.map((service) => service),
        ...route.params.invoice.packages.map((apackage) => apackage),
        ...route.params.invoice.offers.map((offer) => offer),
        ...route.params.invoice.products.map((product) => product),
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
  let dtFormat = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "numeric",

    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        alignItems: "center",
        height: "100%",
        marginTop: route ? 0 : 17,
      }}
    >
      {route && (
        <TouchableOpacity
          onPress={
            Device.isTablet
              ? () => handleDone(route.params.invoice, notes)
              : null
          }
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            {Device.isTablet ? <Text>(تعديل)</Text> : null}
            <Text
              style={{
                // padding: 10,

                fontSize: 20,
                color: !route.params.invoice.notDone ? "green" : "red",
              }}
            >
              {" "}
              {!route.params.invoice.notDone
                ? "تم الحضور"
                : route.params.invoice.notes !== null
                ? "لم يتم استكمال الاعمال"
                : "لم يتم الحضور"}
            </Text>
          </View>
        </TouchableOpacity>
      )}
      {route ? (
        <>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={[styles.text1, { marginRight: 5 }]}>
              {route.params.invoice.payment}
            </Text>
            <Text style={styles.text1}>
              {dtFormat.format(new Date(route.params.invoice.createdAt))}
            </Text>
          </View>
        </>
      ) : null}
      <View
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: "center",
          alignItems: "center",
          alignItems: "center",
        }}
      >
        {Device.isTablet ? (
          route ? (
            <View style={styles.input}>
              <Text style={styles.inputTitle}>
                الاعمال اللتي لم يتم استكمالها
              </Text>
              <TextInput
                value={notes}
                name="notes"
                onChangeText={(notes) => setNotes(notes)}
                placeholder={"الاعمال اللتي لم يتم استكمالها"}
                style={styles.inputContent}
                // numberOfLines={5}
                multiline={true}
              />
            </View>
          ) : null
        ) : null}
        <View
          style={[
            styles.view,
            {
              alignItems: "center",
            },
          ]}
        >
          <View
            style={
              route
                ? [
                    styles.container,
                    {
                      width: Device.isTablet ? "65%" : "95%",
                      height: route ? " 88%" : "95%",
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
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
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
              {route ? (
                route.params.invoice.notes !== null ? (
                  <View
                    style={{
                      width: "100%",
                      padding: 10,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontSize: 18 }}>ملاحظه</Text>
                    <Text style={{ color: "red", marginVertical: 10 }}>
                      {" "}
                      لم يتم استكمال
                    </Text>
                    <Text>{route.params.invoice.notes}</Text>
                  </View>
                ) : null
              ) : null}
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
                  width: route
                    ? Device.isTablet
                      ? "104.3%"
                      : "106%"
                    : "106.5%",
                },
              ]}
            >
              <Button
                disabled={
                  route ? true : invoiceStore.items.length === 0 ? true : false
                }
                color={"white"}
                onPress={hadnlePaymentMethhod}
                style={[
                  styles.button,
                  {
                    backgroundColor: route
                      ? "#2a9df4"
                      : invoiceStore.items.length === 0
                      ? "gray"
                      : "#2a9df4",
                    width: "100%",
                  },
                ]}
              >
                <Text style={{ color: "white" }}>
                  Total{"\n"}
                  {route
                    ? `${route.params.invoice.price - costPrices()} KD`
                    : `${invoiceStore.totalPrice} KD`}
                </Text>
              </Button>
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
    left: 0,
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
  input: {
    height: 300,
    width: 300,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
  },
  inputTitle: {
    width: "100%",
    color: "red",
    textAlign: "center",
    fontSize: 18,
    marginBottom: 20,
  },
  inputContent: {
    width: "100%",
    borderWidth: 1,
    borderColor: "gray",
    height: "85%",
    textAlign: "center",
    fontSize: 16,
    padding: 20,
    borderRadius: 20,
  },
});
