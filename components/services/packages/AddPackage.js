import { observer } from "mobx-react";
import { Button, Icon, Input, Item, Label } from "native-base";
import React from "react";
import { View, Text, Modal, StyleSheet } from "react-native";
import Device from "react-native-device-detection";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import invoiceStore from "../../../stores/invoiceStore";
import apackageStore from "../../../stores/packageStore";
import DropDownServList from "../ServiceDropList";
const AddPackage = ({ language }) => {
  const [service, setService] = React.useState({});
  const [newPackage, setPackage] = React.useState({
    name: "",
    arabic: "",
    price: 0,
    phoneNumber: 0,
    time: 5,
  });
  const handleopen = () => {
    setModalVisible(true);
  };
  const [today, setToday] = React.useState("no");
  const handleSubmite = async () => {
    const item =
      today === "yes"
        ? { ...newPackage, time: newPackage.time - 1 }
        : newPackage;

    apackageStore.AddPackage(service.id, item);
    setModalVisible(false);
    invoiceStore.addItemToInvoice(newItem);
  };
  const newItem = {
    apackageId: apackageStore.apackages.length + 1,
    pprice: newPackage.price,
    price: newPackage.price,
    name: service.name,
    time: newPackage.time,
  };
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  return (
    <>
      <TouchableOpacity onPress={handleopen}>
        <View
          style={
            Device.isTablet
              ? [
                  styles.item,
                  {
                    height: 40,
                    bottom: -1.8,
                    left: -2,
                    width: "100%",
                    backgroundColor: "#2a9df4",
                  },
                ]
              : styles.item
          }
        >
          <Text style={{ color: Device.isTablet ? "white" : "black" }}>
            {language === "ar" ? "اضافه اشتراك" : "Add Package"}
          </Text>
        </View>
      </TouchableOpacity>
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
            <Text style={{ fontSize: 20, padding: 5 }}>
              {language === "ar" ? "اليوم" : "Today"}
            </Text>
            <View
              style={{
                justifyContent: "center",
                display: "flex",
                flexDirection: "row",
                paddingBottom: 10,
                // width: "100%",
              }}
            >
              <Button
                style={{
                  width: 70,
                  height: 40,
                  marginHorizontal: 5,
                  color: "red",
                  justifyContent: "center",
                  backgroundColor: today === "no" ? "#c39e81" : "gray",
                }}
                onPress={() => setToday("no")}
              >
                <Text> {language === "ar" ? "لا" : "no"}</Text>
              </Button>
              <Button
                style={{
                  width: 70,
                  height: 40,
                  marginHorizontal: 5,
                  color: "red",
                  backgroundColor: today === "yes" ? "#c39e81" : "gray",
                  justifyContent: "center",
                }}
                onPress={() => setToday("yes")}
              >
                <Text> {language === "ar" ? "نعم" : "Yes"}</Text>
              </Button>
            </View>
            <View
              style={{
                justifyContent: "center",
                display: "flex",
                flexDirection: "row",
                paddingBottom: 10,
                // width: "100%",
              }}
            >
              <Button
                style={{
                  width: 70,
                  height: 40,
                  marginHorizontal: 5,
                  color: "red",
                  justifyContent: "center",
                  backgroundColor: selected === "Offers" ? "#c39e81" : "gray",
                }}
                onPress={() =>
                  setSelected("Offers") &
                  setPackage({
                    name: "",
                    arabic: "",
                    price: 0,
                    phoneNumber: 0,
                    time: 0,
                  }) &
                  setService({})
                }
              >
                <Text>عرض 5</Text>
              </Button>
              <Button
                style={{
                  width: 70,
                  height: 40,
                  marginHorizontal: 5,
                  color: "red",
                  backgroundColor: selected === null ? "#c39e81" : "gray",
                  justifyContent: "center",
                }}
                onPress={() =>
                  setSelected(null) &
                  setPackage({
                    name: "",
                    arabic: "",
                    price: 0,
                    phoneNumber: 0,
                    time: 5,
                  }) &
                  setService({})
                }
              >
                <Text> اشتراك</Text>
              </Button>
            </View>
            <View style={[styles.inputView, { height: 40, zIndex: 100 }]}>
              <DropDownServList
                language={language}
                onChangeText={(service) =>
                  setService(service.value) &
                  setPackage({
                    ...newPackage,
                    price:
                      selected === null
                        ? 4 * service.value.price
                        : newPackage.time * service.value.price,
                  })
                }
                category={selected}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Name..."
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
                maxLength={8}
                placeholderTextColor="gray"
                onChangeText={(phoneNumber) =>
                  setPackage({ ...newPackage, phoneNumber })
                }
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                value={`${newPackage.time}`}
                keyboardType={"numeric"}
                placeholder="Time..."
                maxLength={8}
                placeholderTextColor="gray"
                onChangeText={
                  selected === null
                    ? null
                    : (time) =>
                        parseInt(time) &
                        setPackage({
                          ...newPackage,
                          time,
                          price: time * service.price,
                        })
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
    height: 500,
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
