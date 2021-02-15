import { observer } from "mobx-react";
import React from "react";
import { View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import invoiceStore from "../../../stores/invoiceStore";
import apackageStore from "../../../stores/packageStore";
import PackageItem from "./PackageItem";
// import packages from "./packages";
const PackageList = () => {
  const apackageList = apackageStore.apackages
    // .filter((apackage) => apackage.phoneNumber === )
    .map((apackage) => <PackageItem apackage={apackage} key={apackage.id} />);
  return (
    <ScrollView>
      <View style={styles.box}>{apackageList}</View>
    </ScrollView>
  );
};
console.log(invoiceStore.items);
export default observer(PackageList);
const styles = StyleSheet.create({
  box: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    // marginLeft: 15,
  },
});
