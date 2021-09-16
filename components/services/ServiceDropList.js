import { StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import React from "react";
import serviceStore from "../../stores/serviceStore";
import { observer } from "mobx-react";

const DropDownServList = ({ onChangeText, service, multiple, category }) => {
  const list =
    category !== null
      ? category === "tenKDOffer"
        ? serviceStore.services.filter((service) => service.tenKDOffer === true)
        : serviceStore.services.filter(
            (service) => service.category === category
          )
      : serviceStore.services.filter(
          (service) =>
            service.category === "Offers" || service.category === "Offers8"
        );

  const services = list.map((service) => ({
    label: service.arabic,
    value: service,
  }));
  return (
    <View style={styles.dropdownview}>
      <DropDownPicker
        items={services}
        defaultValue={service}
        multiple={multiple}
        // multiple={true}
        multipleText="%d items have been selected."
        min={0}
        max={4}
        containerStyle={styles.services}
        style={{ backgroundColor: "white" }}
        dropDownMaxHeight={300}
        itemStyle={{ justifyContent: "flex-center" }}
        dropDownStyle={{ backgroundColor: "white", height: 500 }}
        onChangeItem={onChangeText}
        labelStyle={{ fontSize: 18, textAlign: "left", color: "#000" }}
        searchable={true}
        placeholderStyle={{ color: "gray" }}
        placeholder={"Select a Service"}
        searchablePlaceholder="Search here !"
        searchablePlaceholderTextColor="gray"
        seachableStyle={{}}
        searchableError={() => <Text>Not Found</Text>}
      />
    </View>
  );
};

export default observer(DropDownServList);

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
