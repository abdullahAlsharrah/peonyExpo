import { observer } from "mobx-react";
import React from "react";
import ServicesScreen from "../../screens/ServicesScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Invoices from "../Admin/Invoices";
import InvoicesByMonth from "../Admin/InvoicesByMonth";
import Categories from "../Categories";
import Device from "react-native-device-detection";
import AddPackage from "../services/packages/AddPackage";

const packageStack = createStackNavigator();
const RootNavigator = () => {
  const PackageScreen = () => (
    <packageStack.Navigator>
      <packageStack.Screen name="Home" component={ServicesScreen} />
      <packageStack.Screen name="AddPackage" component={AddPackage} />
    </packageStack.Navigator>
  );
  const Service = createBottomTabNavigator();
  return (
    <Service.Navigator initialRouteName="Home">
      {Device.isTablet ? (
        <Service.Screen name="Home" component={PackageScreen} />
      ) : (
        <Service.Screen name="Home" component={Categories} />
      )}
      <Service.Screen name="DailyInvoices" component={Invoices} />
      <Service.Screen name="InvoicesByMonth" component={InvoicesByMonth} />
    </Service.Navigator>
  );
};

export default observer(RootNavigator);
