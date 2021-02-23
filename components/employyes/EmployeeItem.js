import { observer } from "mobx-react";
import { Button, Icon, Input, Item, Label, Spinner } from "native-base";
import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import employeeStore from "../../stores/employeeStore";

const EmployeeItem = ({ employee, counter }) => {
  if (employeeStore.loading) return <Spinner />;
  const [_employee, setEmployee] = useState(employee);
  const [updated, setUpdated] = useState(false);
  const handleUpdate = () => {
    employeeStore.updateEmployee(_employee);
    setUpdated(true);
  };
  return (
    <View style={{ flexDirection: "row", width: "100%" }}>
      <Item style={{ width: "39%" }}>
        <Text>{counter}</Text>
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
    height: 70,
    textAlign: "center",
  },
});
