import { Button, Icon, Input, Item, Label } from "native-base";
import React, { useState } from "react";
import { View, Text, StyleSheet, Modal } from "react-native";
import Device from "react-native-device-detection";
import { TextInput } from "react-native-gesture-handler";
import employeeStore from "../../../stores/employeeStore";

const AddEmployee = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const [_employee, setEmployee] = useState({
    name: "",
    salary: 0,
    jobTitle: "",
  });

  const handleSubmite = () => {
    employeeStore.addEmployee(_employee);
    setModalVisible(!modalVisible);
    setEmployee({
      name: "",
      salary: 0,
      jobTitle: "",
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
                Add New Employee
              </Text>
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Name..."
                placeholderTextColor="gray"
                onChangeText={(name) => setEmployee({ ..._employee, name })}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                keyboardType={"number-pad"}
                placeholder="Salary..."
                placeholderTextColor="gray"
                onChangeText={(salary) =>
                  (salary = parseInt(salary)) &
                  (salary > 0 ? (salary = parseInt(salary)) : (salary = 0)) &
                  setEmployee({ ..._employee, salary })
                }
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Job Title..."
                placeholderTextColor="gray"
                onChangeText={(jobTitle) =>
                  setEmployee({ ..._employee, jobTitle })
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

export default AddEmployee;
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
});
