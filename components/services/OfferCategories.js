import React from "react";
import { Tab, Tabs, Spinner, ScrollableTab, DefaultTabBar } from "native-base";
import serviceStore from "../../stores/serviceStore";
import { observer } from "mobx-react";
import Service from "./Service";
import { StyleSheet, View } from "react-native";
import Device from "react-native-device-detection";
import AddOffer from "./offers/AddOffer";
const OfferCategories = ({ language }) => {
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
        <Tab heading="5KD">
          <Service category="Offers" language={language} />
        </Tab>
        <Tab heading="8KD">
          <Service category="Offers8" language={language} />
        </Tab>
        <Tab heading="10 KD">
          <AddOffer language={language} />
        </Tab>
      </Tabs>
    </View>
  );
};
export default observer(OfferCategories);
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
