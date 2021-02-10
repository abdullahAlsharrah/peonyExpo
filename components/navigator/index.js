import { observer } from "mobx-react";
import React from "react";
import { View, Text } from "react-native";
import ServicesScreen from "../../screens/ServicesScreen";
import DailyInvoices from "../Admin/DailyInvoices";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Invoices from "../Admin/Invoices";
import InvoicesByMonth from "../Admin/InvoicesByMonth";

const RootNavigator = () => {
  const Service = createBottomTabNavigator();
  return (
    <Service.Navigator initialRouteName="Home">
      <Service.Screen name="Home" component={ServicesScreen} />
      <Service.Screen name="DailyInvoices" component={DailyInvoices} />
      <Service.Screen name="InvoicesByMonth" component={InvoicesByMonth} />
    </Service.Navigator>
  );
};

export default observer(RootNavigator);
