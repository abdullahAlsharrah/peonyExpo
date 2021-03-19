import { Button, Icon, Input, Item, Label } from "native-base";
import React from "react";
import { View, Text, Modal, StyleSheet, Alert } from "react-native";
import Device from "react-native-device-detection";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import invoiceStore from "../../stores/invoiceStore";
import serviceStore from "../../stores/serviceStore";

const AddService = () => {
  const [service, setService] = React.useState({
    name: "",
    price: 0,
    category: "",
  });
  const handleSubmite = () => {
    if (service === { name: "name", price: 0, category: "" }) {
      Alert.alert("Please fill the form");
    } else if (
      service.price === 0 ||
      service.name === "" ||
      service.category === ""
    ) {
      Alert.alert("Please fill the form");
    } else {
      serviceStore.AddService(service);
      setModalVisible(false);
    }
  };
  const [modalVisible, setModalVisible] = React.useState(false);
  const handleopen = () => {
    setModalVisible(true);
  };
  return (
    <>
      <TouchableOpacity onPress={handleopen}>
        <View style={styles.item}>
          <Text>Add Service</Text>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Service has been Added.");
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
                Add New Service
              </Text>
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Name..."
                placeholderTextColor="gray"
                onChangeText={(name) => setService({ ...service, name })}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Price..."
                placeholderTextColor="gray"
                onChangeText={(price) =>
                  (price = parseInt(price)) & setService({ ...service, price })
                }
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Category..."
                placeholderTextColor="gray"
                onChangeText={(category) =>
                  setService({ ...service, category })
                }
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

export default AddService;
const styles = StyleSheet.create({
  input: { marginHorizontal: 5, fontSize: 20, color: "#fff" },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    // height: 35,
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
