import { observer } from "mobx-react";
import { List, ListItem, Text } from "native-base";
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
      <List style={{ flex: 1 }}>
        <ListItem>
          <Text style={styles.text}>Package</Text>
          <Text style={styles.text}>PhoneNumber</Text>
          <Text style={styles.text}>Time</Text>
          <Text style={styles.text}> Price KD</Text>
        </ListItem>
        {apackageList}
      </List>
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
  text: { textAlign: "center", width: "25%" },
});
