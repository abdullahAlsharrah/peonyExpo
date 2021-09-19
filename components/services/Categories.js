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
import AddOffer from "./offers/AddOffer";
import OfferCategories from "./OfferCategories";
const Categories = ({ language }) => {
  if (serviceStore.loading) return <Spinner />;
  const renderTabBar = (props) => {
    props.tabStyle = Object.create(props.tabStyle);
    return <ScrollableTab {...props} />;
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
      <Tabs renderTabBar={renderTabBar} ScrollableTab={true}>
        <Tab heading={language === "ar" ? "بكجات" : "Packages"}>
          <PackageList language={language} />
          <AddPackage language={language} />
        </Tab>
        <Tab heading={language === "ar" ? "عروض" : "Offers"}>
          {/* <Service category="Offers" /> */}
          <OfferCategories language={language} />
        </Tab>
        <Tab heading={language === "ar" ? "شعر" : "Hair"}>
          <Service category="Hair" language={language} />
        </Tab>
        <Tab heading={language === "ar" ? "ميك اب" : "Make Up"}>
          <Service category="Makeup" language={language} />
        </Tab>
        <Tab heading={language === "ar" ? "اظافر" : "Nails"}>
          <Service category="Nails" language={language} />
        </Tab>
        <Tab heading={language === "ar" ? "بخار" : "Hammam"}>
          <Service category="body" language={language} />
        </Tab>
        <Tab heading={language === "ar" ? "مساج" : "Massage"}>
          <Service category="Massage Spa" language={language} />
        </Tab>
        <Tab heading={language === "ar" ? "حف" : "Removal"}>
          <Service category="Hair Removal" language={language} />
        </Tab>
        <Tab heading={language === "ar" ? "فيشل" : "Facial"}>
          <Service category="Facial" language={language} />
        </Tab>
        <Tab heading={language === "ar" ? "منتجات" : "Products"}>
          <ProductList language={language} />
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
