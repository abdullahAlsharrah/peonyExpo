import { Button, Icon, Input, Item, Label } from "native-base";
import React, { useState } from "react";
import { View, Text, StyleSheet, Modal } from "react-native";
import Device from "react-native-device-detection";
import { TextInput } from "react-native-gesture-handler";
import costStore from "../../../stores/costStore";

const AddCost = ({ _invoiceId, item }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [cost, setCost] = useState(
    _invoiceId
      ? {
          name: item.name,
          price: 0,
          invoiceId: _invoiceId,
          itemId: item.id,
        }
      : {
          name: "",
          price: 0,
        }
  );

  const handleSubmite = () => {
    costStore.addCost(cost);
    setModalVisible(!modalVisible);
    setCost({
      name: "",
      price: 0,
      invoiceId: null,
      itemId: null,
    });
  };

  return (
    <>
      <Icon
        onPress={() => {
          setModalVisible(true);
        }}
        name="pluscircle"
        type="AntDesign"
        style={item ? null : styles.icon}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
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
              <Text style={{ textAlign: "center", margin: 20, fontSize: 20 }}>
                Add New Cost
              </Text>
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                value={cost.name}
                placeholder="Cost Of..."
                placeholderTextColor="gray"
                onChangeText={(name) => setCost({ ...cost, name })}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                keyboardType={"number-pad"}
                placeholder="Price..."
                placeholderTextColor="gray"
                onChangeText={(price) => setCost({ ...cost, price })}
              />
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

export default AddCost;
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
    marginTop: 10,
    // bottom: -10,
    // left: "50%",
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
