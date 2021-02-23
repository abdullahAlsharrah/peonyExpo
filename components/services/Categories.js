import React from "react";
import { Tab, Tabs, Spinner, ScrollableTab, Icon } from "native-base";
import serviceStore from "../../stores/serviceStore";
import { observer } from "mobx-react";
import Service from "./Service";
import ProductList from "../products/ProductList";
import AddService from "./AddService";
import { StyleSheet, View } from "react-native";
import Device from "react-native-device-detection";
import AddProduct from "../products/AddProduct";
import PackageList from "./packages/PackageList";
import AddPackage from "./packages/AddPackage";
import OfferList from "./offers/OfferList";
import AddOffer from "./offers/AddOffer";
const Categories = () => {
  if (serviceStore.loading) return <Spinner />;
  return (
    <View
      style={
        Device.isTablet
          ? {
              flex: 1,
              marginTop: Device.isTablet ? 0 : 50,
              shadowColor: "black",
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 10,
              shadowRadius: 3.25,

              elevation: 5,
            }
          : {
              flex: 1,
              marginTop: Device.isTablet ? 0 : 50,
            }
      }
    >
      <Tabs renderTabBar={Device.isTablet ? null : () => <ScrollableTab />}>
        <Tab heading="Packages">
          <PackageList />
          <AddPackage />
        </Tab>
        <Tab heading="Offers">
          <OfferList />
          <AddOffer />
        </Tab>
        <Tab heading="Nails">
          <Service category="Nail" />
          <AddService />
        </Tab>
        <Tab heading="Hair">
          <Service category="Hair" />
          <AddService />
        </Tab>
        <Tab heading="Body">
          <Service category="Body" />
          <AddService />
        </Tab>
        <Tab heading="Products">
          <ProductList />
          <AddProduct />
        </Tab>
      </Tabs>
    </View>
  );
};
export default observer(Categories);
const styles = StyleSheet.create({
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
