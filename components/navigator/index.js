import { observer } from "mobx-react";
import React from "react";
import ServicesScreen from "../../screens/ServicesScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Invoices from "../invoices/Invoices";
import InvoicesByMonth from "../invoices/InvoicesByMonth";
import Categories from "../services/Categories";
import Device from "react-native-device-detection";
import AddPackage from "../services/packages/AddPackage";
import EmployeeList from "../Admin/employyes/EmployeeList";
import CostList from "../Admin/cost/CostList";
import Menu from "../Admin/Menu/Menu";
import HammamMenu from "../Admin/Menu/HammamMenu";
import MassageMenu from "../Admin/Menu/MassageMenu";
import NailMenu from "../Admin/Menu/NailMenu";
import HairMenu from "../Admin/Menu/HairMenu";
import MakeupMenu from "../Admin/Menu/MakeupMenu";
import Drawer from "../buttons/Drawer";

const AdminStack = createStackNavigator();
const RootNavigator = () => {
  const PackageScreen = () => (
    <AdminStack.Navigator>
      <AdminStack.Screen
        name="Home"
        component={ServicesScreen}
        options={{
          header: () => false,
        }}
      />
      <AdminStack.Screen
        name="AddPackage"
        component={AddPackage}
        options={{
          header: () => false,
        }}
      />
    </AdminStack.Navigator>
  );
  const ReciptsScreen = () => (
    <AdminStack.Navigator>
      <AdminStack.Screen
        name="Today's Reciepts"
        component={Invoices}
        options={{
          header: () => false,
        }}
      />
      {/* <AdminStack.Screen name="AddOffer" component={AddOffer} /> */}
    </AdminStack.Navigator>
  );
  const MonthlyReciptsScreen = () => (
    <AdminStack.Navigator>
      <AdminStack.Screen
        name="Monthly Reciepts"
        component={InvoicesByMonth}
        options={{
          header: () => false,
        }}
      />
    </AdminStack.Navigator>
  );
  const EmployeeScreen = () => (
    <AdminStack.Navigator>
      <AdminStack.Screen
        name="Employees"
        component={EmployeeList}
        options={{
          header: () => false,
        }}
      />
    </AdminStack.Navigator>
  );
  const CostScreen = () => (
    <AdminStack.Navigator>
      <AdminStack.Screen
        name="Costs"
        component={CostList}
        options={{
          header: () => false,
        }}
      />
    </AdminStack.Navigator>
  );
  const MenuScreen = () => (
    <AdminStack.Navigator>
      <AdminStack.Screen
        name="Menu"
        component={MenuTab}
        options={{
          header: () => false,
        }}
      />
      <AdminStack.Screen
        name="AddPackage"
        component={AddPackage}
        options={{
          header: () => false,
        }}
      />
    </AdminStack.Navigator>
  );

  const Service = createBottomTabNavigator();
  const Menu = createBottomTabNavigator();

  const MenuTab = () => (
    <Menu.Navigator
      tabBarOptions={{
        pressColor: "gray", //for click (ripple) effect color
        style: {
          position: "absolute",
          top: 0,
          backgroundColor: "#c39e81",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.8,
          shadowRadius: 5,
          elevation: 5, //color you want to change
        },
        activeTintColor: "black",
        inactiveTintColor: "white",
        labelStyle: {
          fontSize: Device.isTablet ? 20 : 15,
          marginBottom: -15,
        },
      }}
    >
      <Menu.Screen name="Hammam" component={HammamMenu} />
      <Menu.Screen name="Massage" component={MassageMenu} />
      <Menu.Screen name="Nails" component={NailMenu} />
      <Menu.Screen name="Hair" component={HairMenu} />
      <Menu.Screen name="Makeup" component={MakeupMenu} />
    </Menu.Navigator>
  );
  const Mobile = createDrawerNavigator();
  const MobileDrawer = () => (
    <Mobile.Navigator
      drawerContentOptions={{
        activeTintColor: "black",
        activeBackgroundColor: "#c39e81",
      }}
    >
      <Mobile.Screen name="Today's Reciepts" component={ReciptsScreen} />
      <Mobile.Screen name="Monthly Reciepts" component={MonthlyReciptsScreen} />
      <Mobile.Screen name="Cost" component={CostScreen} />
      <Mobile.Screen name="Employees" component={EmployeeScreen} />
      <Mobile.Screen name="Menu" component={MenuScreen} />
    </Mobile.Navigator>
  );
  return (
    <Service.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        pressColor: "gray", //for click (ripple) effect color
        style: {
          backgroundColor: "#c39e81",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.8,
          shadowRadius: 5,
          elevation: 5, //color you want to change
        },
        activeTintColor: "black",
        inactiveTintColor: "white",
        labelStyle: {
          fontSize: Device.isTablet ? 20 : 15,
          // marginBottom: -15,
        },
      }}
    >
      {Device.isTablet ? (
        <>
          <Service.Screen name="Home" component={PackageScreen} />
          <Service.Screen name="Reciepts" component={Invoices} />
          <Service.Screen name="Menu" component={MenuTab} />
        </>
      ) : (
        <>
          <Service.Screen name="Home" component={MobileDrawer} />
        </>
      )}
    </Service.Navigator>
  );
};

export default observer(RootNavigator);
