import React from "react";
import { Tab, Tabs, Spinner, ScrollableTab } from "native-base";
import serviceStore from "../stores/serviceStore";
import { observer } from "mobx-react";
import Service from "./services/Service";
import ProductList from "./products/ProductList";
import AddService from "./services/AddService";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Device from "react-native-device-detection";
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
          <Service category="Packages" />
        </Tab>
        <Tab heading="Offers">
          <Service category="Offers" />
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
        </Tab>
      </Tabs>
    </View>
  );
};
export default observer(Categories);
