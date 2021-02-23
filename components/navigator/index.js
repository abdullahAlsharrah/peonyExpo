import { observer } from "mobx-react";
import React from "react";
import ServicesScreen from "../../screens/ServicesScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Invoices from "../invoices/Invoices";
import InvoicesByMonth from "../invoices/InvoicesByMonth";
import Categories from "../services/Categories";
import Device from "react-native-device-detection";
import AddPackage from "../services/packages/AddPackage";
import DropDownServList from "../services/ServiceDropList";
import EmployeeList from "../employyes/EmployeeList";

const packageStack = createStackNavigator();
const RootNavigator = () => {
  const PackageScreen = () => (
    <packageStack.Navigator>
      <packageStack.Screen
        name="Home"
        component={ServicesScreen}
        options={{
          header: () => false,
        }}
      />
      <packageStack.Screen
        name="AddPackage"
        component={AddPackage}
        options={{
          header: () => false,
        }}
      />
    </packageStack.Navigator>
  );
  const AdminScreen = () => (
    <packageStack.Navigator>
      <packageStack.Screen
        name="Home"
        component={Categories}
        options={{
          header: () => false,
        }}
      />
      <packageStack.Screen
        name="AddPackage"
        component={AddPackage}
        options={{
          header: () => false,
        }}
      />
      {/* <packageStack.Screen name="AddOffer" component={AddOffer} /> */}
    </packageStack.Navigator>
  );
  const Service = createBottomTabNavigator();
  return (
    <Service.Navigator initialRouteName="Home">
      {Device.isTablet ? (
        <Service.Screen name="Home" component={PackageScreen} />
      ) : (
        <Service.Screen name="Home" component={AdminScreen} />
      )}
      <Service.Screen name="DailyInvoices" component={Invoices} />
      <Service.Screen name="InvoicesByMonth" component={InvoicesByMonth} />
      <Service.Screen name="EmployeeList" component={EmployeeList} />
    </Service.Navigator>
  );
};

export default observer(RootNavigator);
