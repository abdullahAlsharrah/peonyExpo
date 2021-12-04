import { StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import React from "react";
import { observer } from "mobx-react";

const DropDownCatList = ({ onChangeText, category }) => {
  const menu = [
    "Hair",
    "Hair Removal",
    "Facial",
    "body",
    "Makeup",
    "Massage Spa",
    "Nails",
    "Offers",
    "Offers8",
  ];
  const categories = menu.map((category) => ({
    label: category,
    value: category,
  }));
  return (
    <View style={styles.dropdownview}>
      <DropDownPicker
        items={categories}
        defaultValue={category}
        containerStyle={styles.services}
        style={{ backgroundColor: "white" }}
        dropDownMaxHeight={300}
        itemStyle={{ justifyContent: "flex-center" }}
        dropDownStyle={{ backgroundColor: "white", height: 500 }}
        onChangeItem={onChangeText}
        labelStyle={{ fontSize: 18, textAlign: "left", color: "#000" }}
        searchable={true}
        placeholderStyle={{ color: "gray" }}
        placeholder={"Select a Category"}
        searchablePlaceholder="Search here !"
        searchablePlaceholderTextColor="gray"
        seachableStyle={{}}
        searchableError={() => <Text>Not Found</Text>}
      />
    </View>
  );
};

export default observer(DropDownCatList);

const styles = StyleSheet.create({
  dropdownview: {
    zIndex: 100,
    backgroundColor: "white",
    flex: 1,
    // marginTop: 5,
  },
  container: {
    // flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    height: 300,
  },
  inputText: {
    height: 50,
    color: "white",
  },
  services: {
    height: 40,
    width: "100%",
    backgroundColor: "white",
    // paddingVertical: 10,
  },
});
