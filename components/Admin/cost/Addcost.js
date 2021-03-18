import { Button, Icon, Input, Item, Label } from "native-base";
import React, { useState } from "react";
import { View, Text, StyleSheet, Modal } from "react-native";
import costStore from "../../stores/costStore";

const AddCost = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const [cost, setCost] = useState({
    name: "",
    price: 0,
  });

  const handleAdd = () => {
    costStore.addCost(cost);
    setModalVisible(!modalVisible);
    setCost({
      name: "",
      price: 0,
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
        style={styles.icon}
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
          <View style={styles.modalView}>
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
            <View style={{ width: "100%" }}>
              <Item floatingLabel last style={{ width: "33%" }}>
                <Label>Name</Label>
                <Input
                  style={styles.modalText}
                  value={cost.name}
                  onChangeText={(name) => setCost({ ...cost, name })}
                />
              </Item>
              <Item floatingLabel last style={{ width: "33%" }}>
                <Label>Price</Label>
                <Input
                  style={styles.modalText}
                  onChangeText={(price) =>
                    (price > 0 ? (price = parseInt(price)) : (price = 0)) &
                    setCost({ ...cost, price })
                  }
                  value={JSON.stringify(cost.price)}
                />
              </Item>
            </View>

            <View>
              <Button style={styles.openButton} onPress={handleAdd}>
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
    // left: "20%",
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
});
