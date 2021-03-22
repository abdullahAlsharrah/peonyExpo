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
import AddItem from "../Admin/AddItem";
import { RefreshControl, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import invoiceStore from "../../stores/invoiceStore";
import productStore from "../../stores/productStore";
import apackageStore from "../../stores/packageStore";
import HairRemovalMenu from "../Admin/Menu/HairRemovalMenu";

const AdminStack = createStackNavigator();
const RootNavigator = () => {
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    invoiceStore.fetchInvoices;
    productStore.fetchProducts;
    apackageStore.fetchPackages;
  });
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
        component={MenuTabScreen}
        options={{
          header: () => false,
        }}
      />
    </AdminStack.Navigator>
  );

  const Service = createBottomTabNavigator();
  const MenuTab = createBottomTabNavigator();

  const MenuTabScreen = () => (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <MenuTab.Navigator
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
        <MenuTab.Screen name="Hammam" component={HammamMenu} />
        <MenuTab.Screen name="Massage" component={MassageMenu} />
        <MenuTab.Screen name="Nails" component={NailMenu} />
        <MenuTab.Screen name="Hair" component={HairMenu} />
        <MenuTab.Screen name="Makeup" component={MakeupMenu} />
        <MenuTab.Screen name="Hair Removal" component={HairRemovalMenu} />
      </MenuTab.Navigator>
    </ScrollView>
  );
  const Mobile = createDrawerNavigator();
  const MobileDrawer = () => (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Mobile.Navigator
        drawerContentOptions={{
          activeTintColor: "black",
          activeBackgroundColor: "#c39e81",
        }}
      >
        <Mobile.Screen name="Today's Reciepts" component={ReciptsScreen} />
        <Mobile.Screen
          name="Monthly Reciepts"
          component={MonthlyReciptsScreen}
        />
        <Mobile.Screen name="Cost" component={CostScreen} />
        <Mobile.Screen name="Employees" component={EmployeeScreen} />
        <Mobile.Screen name="Menu" component={MenuScreen} />
        <Mobile.Screen name="Add Item" component={AddItem} />
      </Mobile.Navigator>
    </ScrollView>
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
          // height: 20,
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
          <Service.Screen name="Menu" component={MenuTabScreen} />
        </>
      ) : (
        <>
          <Service.Screen name="Home" component={MobileDrawer} />
          <Service.Screen name="Add Item" component={AddItem} />
          <Service.Screen name="Menu" component={Menu} />
        </>
      )}
    </Service.Navigator>
  );
};

export default observer(RootNavigator);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
});
