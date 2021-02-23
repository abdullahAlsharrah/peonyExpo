import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Input, Item, Label } from "native-base";

const Employee = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [bodyMani, isBadiMani] = React.useState({
    name1: "",
    salery1: 120,
    name2: "",
    salery2: 120,
  });
  const [hairStylest, isHairStylest] = React.useState({
    name: "",
    salery: 350,
  });
  const [massage, isMassage] = React.useState({
    name: "",
    salery: 250,
  });
  const totalSalery = parseInt(
    parseInt(bodyMani.salery1) +
      parseInt(bodyMani.salery2) +
      parseInt(hairStylest.salery) +
      parseInt(massage.salery)
  );

  return (
    <TouchableOpacity
      onPress={() => {
        setModalVisible(true);
      }}
    >
      <View style={styles.budget}>
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
              <View style={{ flexDirection: "row", width: "100%" }}>
                <Item floatingLabel last style={{ width: "50%" }}>
                  <Label>Mani body</Label>
                  <Input
                    style={styles.modalText}
                    value={bodyMani.name1}
                    onChangeText={(name1) => isBadiMani({ ...bodyMani, name1 })}
                  />
                </Item>
                <Item floatingLabel last style={{ width: "50%" }}>
                  <Label>Salery</Label>
                  <Input
                    style={styles.modalText}
                    value={bodyMani.salery1}
                    onChangeText={(salery1) =>
                      isBadiMani({ ...bodyMani, salery1 })
                    }
                  />
                </Item>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  marginTop: 10,
                }}
              >
                <Item floatingLabel last style={{ width: "50%" }}>
                  <Label>Mani body</Label>
                  <Input
                    style={styles.modalText}
                    value={bodyMani.name2}
                    onChangeText={(name2) => isBadiMani({ ...bodyMani, name2 })}
                  />
                </Item>
                <Item floatingLabel last style={{ width: "50%" }}>
                  <Label>Salery</Label>
                  <Input
                    style={styles.modalText}
                    value={bodyMani.salery2}
                    onChangeText={(salery2) =>
                      isBadiMani({ ...bodyMani, salery2 })
                    }
                  />
                </Item>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  marginTop: 10,
                }}
              >
                <Item floatingLabel last style={{ width: "50%" }}>
                  <Label>Hair Stylest</Label>
                  <Input
                    style={styles.modalText}
                    value={hairStylest.name}
                    onChangeText={(name) =>
                      isHairStylest({ ...hairStylest, name })
                    }
                  />
                </Item>
                <Item floatingLabel last style={{ width: "50%" }}>
                  <Label>Salery</Label>
                  <Input
                    style={styles.modalText}
                    value={hairStylest.salery}
                    onChangeText={(salery) =>
                      isHairStylest({ ...hairStylest, salery })
                    }
                  />
                </Item>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  marginTop: 10,
                }}
              >
                <Item floatingLabel last style={{ width: "50%" }}>
                  <Label>Massage</Label>
                  <Input
                    style={styles.modalText}
                    value={massage.name}
                    onChangeText={(name) => isMassage({ ...massage, name })}
                  />
                </Item>
                <Item floatingLabel last style={{ width: "50%" }}>
                  <Label>Salery</Label>
                  <Input
                    style={styles.modalText}
                    value={massage.salery}
                    onChangeText={(salery) => isMassage({ ...massage, salery })}
                  />
                </Item>
              </View>

              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <Text style={styles.text}>Salaries: </Text>
        <Text style={styles.text}>{totalSalery}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Employee;
const styles = StyleSheet.create({
  budget: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#c39e81",
    borderRadius: 100,
    width: 150,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 10,
    shadowRadius: 3.25,

    elevation: 5,
    margin: 10,
  },
  input: { marginHorizontal: 5, fontSize: 20, color: "#fff" },
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  view: {
    flexDirection: "row",
  },
  text: { fontSize: 20, color: "#fff" },
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
    backgroundColor: "#F194FF",
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
