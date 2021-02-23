import { observer } from "mobx-react";
import { Item, Spinner } from "native-base";
import React from "react";
import { View, Text } from "react-native";
import employeeStore from "../../stores/employeeStore";
import AddEmployee from "./AddEmployee";
import EmployeeItem from "./EmployeeItem";

const EmployeeList = () => {
  if (employeeStore.loading) return <Spinner />;
  let counter = 1;
  const employeeList = employeeStore.employees
    .slice()
    .sort((a, b) => b.createdAt - a.createdAt)
    .map((employee) => (
      <EmployeeItem
        employee={employee}
        key={`e${employee.id}`}
        counter={counter++}
      />
    ));
  return (
    <View style={{ flex: 1, margin: 20, marginTop: 60 }}>
      <View style={{ flexDirection: "row", width: "100%" }}>
        <Item style={{ width: "39%", justifyContent: "center" }}>
          <Text>Name</Text>
        </Item>
        <Item style={{ width: "30%", justifyContent: "center" }}>
          <Text>Job Title</Text>
        </Item>
        <Item style={{ width: "30%", justifyContent: "center" }}>
          <Text>Salary</Text>
        </Item>
      </View>
      {employeeList}
      <AddEmployee />
    </View>
  );
};

export default observer(EmployeeList);
