import { observer } from "mobx-react";
import React from "react";
import ServicesScreen from "../../screens/ServicesScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Invoices from "../Admin/Invoices";
import InvoicesByMonth from "../Admin/InvoicesByMonth";
import AddService from "../services/AddService";
import Categories from "../Categories";
import Device from "react-native-device-detection";

const RootNavigator = () => {
  const Service = createBottomTabNavigator();
  return (
    <Service.Navigator initialRouteName="Home">
      {Device.isTablet ? (
        <Service.Screen name="Home" component={ServicesScreen} />
      ) : (
        <Service.Screen name="Home" component={Categories} />
      )}
      <Service.Screen name="DailyInvoices" component={Invoices} />
      <Service.Screen name="InvoicesByMonth" component={InvoicesByMonth} />
    </Service.Navigator>
  );
};

export default observer(RootNavigator);
