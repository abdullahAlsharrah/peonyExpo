import { Button, Icon, Input, Item, Label } from "native-base";
import React, { useState } from "react";
import { View, Text, StyleSheet, Modal } from "react-native";
import employeeStore from "../../stores/employeeStore";

const AddEmployee = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const [_employee, setEmployee] = useState({
    name: "",
    salary: 0,
    jobTitle: "",
  });

  const handleAdd = () => {
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
            <View style={{ flexDirection: "row", width: "100%" }}>
              <Item floatingLabel last style={{ width: "33%" }}>
                <Label>Job Title</Label>
                <Input
                  style={styles.modalText}
                  value={_employee.jobTitle}
                  onChangeText={(jobTitle) =>
                    setEmployee({ ..._employee, jobTitle })
                  }
                />
              </Item>
              <Item floatingLabel last style={{ width: "33%" }}>
                <Label>Name</Label>
                <Input
                  style={styles.modalText}
                  value={_employee.name}
                  onChangeText={(name) => setEmployee({ ..._employee, name })}
                />
              </Item>
              <Item floatingLabel last style={{ width: "33%" }}>
                <Label>Salary</Label>
                <Input
                  style={styles.modalText}
                  onChangeText={(salary) =>
                    (salary > 0 ? (salary = parseInt(salary)) : (salary = 0)) &
                    setEmployee({ ..._employee, salary })
                  }
                  value={JSON.stringify(_employee.salary)}
                />
              </Item>
            </View>

            <Button style={styles.openButton} onPress={handleAdd}>
              <Text style={styles.textStyle}>Add</Text>
            </Button>
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
    left: "20%",
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
