import { observer } from "mobx-react";
import { Button, Icon, Input, Item, Label } from "native-base";
import React from "react";
import { View, Text, Modal, StyleSheet } from "react-native";
import Device from "react-native-device-detection";
import { TextInput } from "react-native-gesture-handler";
import invoiceStore from "../../../stores/invoiceStore";
import apackageStore from "../../../stores/packageStore";
import packageStore from "../../../stores/packageStore";
import Service from "../Service";

const AddPackage = () => {
  const [serviceId, setServiceId] = React.useState(0);
  const [newPackage, setPackage] = React.useState({
    name: "",
    price: 0,
    phoneNumber: 0,
    time: 5,
  });
  const handleopen = (service, price) => {
    setModalVisible(true);
    setPackage({ ...newPackage, price: 4 * price });
    setServiceId(service);
  };
  const handleSubmite = async () => {
    apackageStore.AddPackage(serviceId, newPackage);
    setModalVisible(false);
  };

  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <>
      <Service handleopen={handleopen} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Package has been Added.");
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
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Package Name..."
                placeholderTextColor="gray"
                onChangeText={(name) => setPackage({ ...newPackage, name })}
              />
            </View>
            <View style={styles.inputView}>
              <Text style={{ margin: 20, marginLeft: 0 }}>
                {newPackage.price} KD
              </Text>
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                keyboardType={"numeric"}
                placeholder="Phone Number..."
                placeholderTextColor="gray"
                onChangeText={(phoneNumber) =>
                  setPackage({ ...newPackage, phoneNumber })
                }
              />
            </View>
            <Button style={styles.openButton} onPress={handleSubmite}>
              <Text style={styles.textStyle}>Add</Text>
            </Button>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default observer(AddPackage);
const styles = StyleSheet.create({
  input: { marginHorizontal: 5, fontSize: 20, color: "#fff" },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    height: 270,
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
    bottom: -20,
    left: "50%",
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
});
