import { observer } from "mobx-react";
import { Icon, Input, Item, Spinner } from "native-base";
import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import employeeStore from "../../stores/employeeStore";

const EmployeeItem = ({ employee, counter }) => {
  if (employeeStore.loading) return <Spinner />;
  const [_employee, setEmployee] = useState(employee);
  const [updated, setUpdated] = useState(false);
  const handleUpdate = () => {
    employeeStore.updateEmployee(_employee);
    setUpdated(true);
  };
  const handleDelete = () => {
    Alert.alert(
      "Delete Employee",
      `Are you Sure you want to delete ${_employee.name}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => employeeStore.deleteEmployee(_employee.id),
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <View style={{ flexDirection: "row", width: "100%" }}>
      <Item style={{ width: "39%" }}>
        <Input
          style={styles.modalText}
          value={_employee.name}
          onChangeText={(name) => setEmployee({ ..._employee, name })}
        />
      </Item>
      <Item style={{ width: "30%" }}>
        <Input
          style={styles.modalText}
          value={_employee.jobTitle}
          onChangeText={(jobTitle) => setEmployee({ ..._employee, jobTitle })}
        />
      </Item>
      <Item style={{ width: "30%" }}>
        <Input
          style={styles.modalText}
          onChangeText={(salary) =>
            setUpdated(false) &
            (salary = parseInt(salary)) &
            setEmployee({ ..._employee, salary })
          }
          value={`${JSON.stringify(_employee.salary)} KD`}
        />
      </Item>

      <Icon
        onPress={handleDelete}
        name="delete"
        type="AntDesign"
        style={{
          fontSize: 15,
          color: "red",
          position: "absolute",
          left: 2,
          bottom: "40%",
        }}
      />
      {employee === _employee ? null : (
        <Icon
          onPress={handleUpdate}
          name="checkmark-outline"
          style={{
            color: updated ? "green" : "red",
            marginHorizontal: -20,
            marginTop: 20,
          }}
        />
      )}
    </View>
  );
};

export default observer(EmployeeItem);
const styles = StyleSheet.create({
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
    textAlign: "center",
    height: 70,
  },
});
