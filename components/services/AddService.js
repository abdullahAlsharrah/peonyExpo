import { Button, Icon, Input, Item, Label } from "native-base";
import React from "react";
import { View, Text, Modal, StyleSheet } from "react-native";
import serviceStore from "../../stores/serviceStore";

const AddService = ({ navigation }) => {
  const [service, setService] = React.useState({
    name: "",
    price: 0,
    category: "",
  });
  const handleSubmite = () => {
    serviceStore.AddService(service);
    setModalVisible(false);
  };
  const [modalVisible, setModalVisible] = React.useState(false);
  const handleopen = () => {
    setModalVisible(true);
  };
  return (
    <>
      <Icon
        onPress={handleopen}
        name="pluscircleo"
        type="AntDesign"
        style={{
          color: "#c39e81",
          fontSize: 40,
          position: "absolute",
          bottom: 10,
          right: 10,
        }}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Service has been Added.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Item floatingLabel>
              <Label>Name</Label>
              <Input
                value={service.name}
                onChangeText={(name) => setService({ ...service, name })}
              />
            </Item>
            <Item floatingLabel>
              <Label>Price</Label>
              <Input
                value={service.price}
                onChangeText={(price) => setService({ ...service, price })}
              />
            </Item>
            <Item floatingLabel>
              <Label>Category</Label>
              <Input
                value={service.category}
                onChangeText={(category) =>
                  setService({ ...service, category })
                }
              />
            </Item>
            <Button style={styles.openButton} onPress={handleSubmite}>
              <Text style={styles.textStyle}>Add</Text>
            </Button>
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
    backgroundColor: "#c39e81",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
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
});