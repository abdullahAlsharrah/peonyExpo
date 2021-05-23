import React from "react";
import { Tab, Tabs, Spinner, ScrollableTab, DefaultTabBar } from "native-base";
import serviceStore from "../../stores/serviceStore";
import { observer } from "mobx-react";
import Service from "./Service";
import ProductList from "../products/ProductList";
import { StyleSheet, View } from "react-native";
import Device from "react-native-device-detection";
import PackageList from "./packages/PackageList";
import AddPackage from "./packages/AddPackage";
import OfferList from "./offers/OfferList";
const Categories = () => {
  if (serviceStore.loading) return <Spinner />;
  const renderTabBar = (props) => {
    props.tabStyle = Object.create(props.tabStyle);
    return <DefaultTabBar {...props} />;
  };
  return (
    <View
      style={
        Device.isTablet
          ? {
              flex: 1,
              marginTop: Device.isTablet ? -1 : 50,
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
      <Tabs renderTabBar={renderTabBar}>
        <Tab heading="Packages">
          <PackageList />
          <AddPackage />
        </Tab>
        {/* <Tab heading="Offers">
          <OfferList />
        </Tab> */}
        <Tab heading="شعر">
          <Service category="Hair" />
        </Tab>
        <Tab heading="ميك اب">
          <Service category="Makeup" />
        </Tab>
        <Tab heading="اضافر">
          <Service category="Nails" />
        </Tab>
        <Tab heading="الجسم">
          <Service category="body" />
        </Tab>
        <Tab heading="بخار">
          <Service category="Massage Spa" />
        </Tab>
        <Tab heading="حف">
          <Service category="Hair Removal" />
        </Tab>
        <Tab heading="Products">
          <ProductList />
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
