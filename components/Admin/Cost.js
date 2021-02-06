import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";

const Cost = () => {
  const [modalVisible, setModalVisible] = React.useState(false);

  const [buildingCost, isBuildingCost] = React.useState("2000");
  const [furnetureCost, isFurnetureCost] = React.useState("1000");
  const [suplementCost, isSuplementCost] = React.useState("500");
  const cost =
    parseInt(buildingCost) + parseInt(furnetureCost) + parseInt(suplementCost);
  return (
    <TouchableOpacity
      style={[
        styles.budget,
        {
          width: "90%",
          backgroundColor: "red",
        },
      ]}
      onPress={() => {
        setModalVisible(true);
      }}
    >
      <View
        style={[
          styles.budget,
          {
            width: "100%",
            backgroundColor: "red",
          },
        ]}
      >
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={[styles.budget, { width: "100%" }]}>
                <Text style={styles.text}>Building Cost: </Text>
                <TextInput
                  numeric
                  keyboardType={"numeric"}
                  style={styles.input}
                  value={buildingCost}
                  onChangeText={(budget) => isBuildingCost(budget)}
                />
              </View>
              <View style={[styles.budget, { width: "100%" }]}>
                <Text style={styles.text}>Furniture Cost: </Text>
                <TextInput
                  numeric
                  keyboardType={"numeric"}
                  style={styles.input}
                  value={furnetureCost}
                  onChangeText={(budget) => isFurnetureCost(budget)}
                />
              </View>
              <View style={[styles.budget, { width: "100%" }]}>
                <Text style={styles.text}>Suplement Cost: </Text>
                <TextInput
                  numeric
                  keyboardType={"numeric"}
                  style={styles.input}
                  value={suplementCost}
                  onChangeText={(budget) => isSuplementCost(budget)}
                />
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
        <Text style={styles.text}>Cost :</Text>
        <Text style={styles.input}>{cost}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Cost;
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
    width: "95%",
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
