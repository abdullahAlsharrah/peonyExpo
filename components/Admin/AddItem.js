import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AddProduct from "../products/AddProduct";
import AddService from "../services/AddService";
import AddOffer from "../services/offers/AddOffer";
import AddPackage from "../services/packages/AddPackage";

const AddItem = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        flex: 1,
      }}
    >
      <AddService />
      <AddPackage />
      <AddOffer />
      <AddProduct />
    </View>
  );
};

export default AddItem;
