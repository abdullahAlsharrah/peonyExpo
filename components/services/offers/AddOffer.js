import { observer } from "mobx-react";
import { Button, Icon, Input, Item, Label } from "native-base";
import React from "react";
import { View, Text, Modal, StyleSheet } from "react-native";
import Device from "react-native-device-detection";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import invoiceStore from "../../../stores/invoiceStore";
import offerStore from "../../../stores/offerStore";

import DropDownServList from "../ServiceDropList";
const AddOffer = () => {
  const [services, setServices] = React.useState([]);
  const [offer, setOffer] = React.useState({
    name: "",
    arabic: "",
  });
  const handleopen = () => {
    setModalVisible(true);
  };

  const handleSubmite = async () => {
    const servicesId = services.map((service) => ({
      serviceId: service.id,
    }));

    offerStore.addOffer(servicesId, offer.name, totalPrice());
    setModalVisible(false);
  };
  const totalPrice = () => {
    let total = 0;
    services.forEach((item) => {
      total += 0.85 * item.price;
    });
    return total;
  };
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <>
      <TouchableOpacity onPress={handleopen}>
        <View style={styles.item}>
          <Text>Add Offer</Text>
        </View>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Offer has been Added.");
        }}
      >
        <View style={styles.centeredView}>
          <View
            style={
              Device.isTablet
                ? [styles.modalView, { width: "30%" }]
                : styles.modalView
            }
          >
            <Icon
              name="close"
              style={{
                color: "tomato",
                position: "absolute",
                top: 10,
                right: 10,
              }}
              onPress={() => setModalVisible(false)}
            />
            <View style={[styles.inputView, { height: 40, zIndex: 100 }]}>
              <DropDownServList
                service={services}
                onChangeText={(service) => setServices(service)}
                multiple={true}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Offer Name..."
                placeholderTextColor="gray"
                onChangeText={(name) => setOffer({ ...offer, name })}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="الاسم بالعربي"
                placeholderTextColor="gray"
                onChangeText={(arabic) => setOffer({ ...offer, arabic })}
              />
            </View>
            <View style={[styles.inputView, { flexDirection: "row" }]}>
              <Text style={{ margin: 20, marginLeft: 0 }}>
                {totalPrice()} KD
              </Text>
              {/* <Button
                style={styles.priceButton}
                onPress={() =>
                  offerStore.addItemToOffer(services) &
                  setOffer({ ...offer, price: totalPrice() })
                }
              >
                <Text style={[styles.textStyle, { color: "black" }]}>
                  calculate the price
                </Text>
              </Button> */}
            </View>
            <View>
              <Button style={styles.openButton} onPress={handleSubmite}>
                <Text style={styles.textStyle}>Add</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default observer(AddOffer);
const styles = StyleSheet.create({
  input: { marginHorizontal: 5, fontSize: 20, color: "#fff" },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    height: 300,
    width: "90%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "green",
    borderRadius: 10,
    width: 70,
    elevation: 2,
    justifyContent: "center",
    // bottom: -20,
    // left: "50%",
    marginTop: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  icon: {
    fontSize: 40,
    color: "green",
    position: "absolute",
    bottom: 10,
    right: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputView: {
    width: "100%",
    color: "white",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  inputText: {
    height: 50,
  },
  inputViewT: {
    width: "50%",
    color: "white",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  priceButton: {
    margin: 5,
    backgroundColor: "white",
  },
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
