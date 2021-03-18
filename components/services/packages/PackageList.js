import { observer } from "mobx-react";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import apackageStore from "../../../stores/packageStore";
import SearchBarr from "../../SearchBar/SearchBarr";
import PackageItem from "./PackageItem";
// import packages from "./packages";
const PackageList = () => {
  const [query, setQuery] = useState("");
  const apackageList = apackageStore.apackages
    .filter(
      (apackage) =>
        JSON.stringify(apackage.phoneNumber).includes(query) ||
        apackage.name.toLowerCase().includes(query.toLowerCase())
    )
    .map((apackage) => (
      <PackageItem apackage={apackage} key={`p${apackage.id}`} />
    ));
  return (
    <>
      <SearchBarr setQuery={setQuery} query={query} />
      <ScrollView>
        <View style={styles.box}>{apackageList}</View>
      </ScrollView>
    </>
  );
};
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
