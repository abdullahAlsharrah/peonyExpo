import { observer } from "mobx-react";
import React from "react";
import ServicesScreen from "../../screens/ServicesScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Invoices from "../invoices/Invoices";
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
import AddItem from "../Admin/AddItem";
import { StyleSheet } from "react-native";
import HairRemovalMenu from "../Admin/Menu/HairRemovalMenu";

import RecieptList from "../invoices/RecieptList";
import FacialMenu from "../Admin/Menu/FacialMenu";
import { Icon } from "native-base";
import { useNavigation } from "@react-navigation/native";
import InvoicesByMonthList from "../invoices/InvoicesByMonthList";
import ThisMonthInvoices from "../invoices/ThisMonthInvoices";
import OnlineInvoices from "../invoices/OnlineInvoices";

const AdminStack = createStackNavigator();
const RecieptsStack = createStackNavigator();
const RootNavigator = () => {
  // const wait = (timeout) => {
  //   return new Promise((resolve) => setTimeout(resolve, timeout));
  // };
  // const [refreshing, setRefreshing] = React.useState(false);

  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  //   invoiceStore.fetchInvoices();
  //   productStore.fetchProducts();
  //   apackageStore.fetchPackages();
  //   serviceStore.fetchServices();
  //   offerStore.fetchOffers();
  //   costStore.fetchCosts();
  //   wait(2000).then(() => setRefreshing(false));
  // }, []);
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
  const SideMenuIcon = () => {
    const navigation = useNavigation();
    return (
      <Icon
        name="menu"
        onPress={() => navigation.openDrawer()}
        style={{ marginLeft: 15 }}
      />
    );
  };
  const ReciptsScreen = () => (
    <AdminStack.Navigator
      screenOptions={{
        headerLeft: () => <SideMenuIcon />,
      }}
    >
      <AdminStack.Screen name="Today's Reciepts" component={Invoices} />
      <AdminStack.Screen name="Reciept" component={RecieptList} />
    </AdminStack.Navigator>
  );
  const ReciptsScreenTablet = () => (
    <AdminStack.Navigator
      screenOptions={{
        header: () => false,
      }}
    >
      <AdminStack.Screen name="Today's Reciepts" component={Invoices} />
      <AdminStack.Screen name="Reciept" component={RecieptList} />
    </AdminStack.Navigator>
  );
  const OnlineReciptsScreenTablet = () => (
    <AdminStack.Navigator
      screenOptions={{
        header: () => false,
      }}
    >
      <AdminStack.Screen name="Online" component={OnlineInvoices} />
      <AdminStack.Screen name="Reciept" component={RecieptList} />
    </AdminStack.Navigator>
  );

  const MonthlyReciptsScreen = () => (
    <RecieptsStack.Navigator
      screenOptions={{
        // header: () => false,
        headerLeft: () => <SideMenuIcon />,
      }}
    >
      <RecieptsStack.Screen
        name="Monthly Reciepts"
        component={InvoicesByMonthList}
        options={
          {
            // header: () => false,
          }
        }
      />
      <RecieptsStack.Screen name="Reciept" component={RecieptList} />
    </RecieptsStack.Navigator>
  );
  const ThisMonthlyReciptsScreen = () => (
    <RecieptsStack.Navigator
      screenOptions={{
        // header: () => false,
        headerLeft: () => <SideMenuIcon />,
      }}
    >
      <RecieptsStack.Screen
        name="This Month"
        component={ThisMonthInvoices}
        options={
          {
            // header: () => false,
          }
        }
      />
      <RecieptsStack.Screen name="Reciept" component={RecieptList} />
    </RecieptsStack.Navigator>
  );
  const EmployeeScreen = () => (
    <AdminStack.Navigator>
      <AdminStack.Screen
        name="Employees"
        component={EmployeeList}
        options={{
          // header: () => false,
          headerLeft: () => <SideMenuIcon />,
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
          // header: () => false,
          headerLeft: () => <SideMenuIcon />,
        }}
      />
    </AdminStack.Navigator>
  );
  const MenuScreen = () => (
    <AdminStack.Navigator>
      <AdminStack.Screen name="Menu" component={MenuTabScreen} />
    </AdminStack.Navigator>
  );

  const Service = createBottomTabNavigator();
  const MenuTab = createBottomTabNavigator();
  const MenuDrawerIphone = createDrawerNavigator();

  const MenuDrawerScreen = () => (
    <MenuDrawerIphone.Navigator
      screenOptions={{
        headerLeft: () => <SideMenuIcon />,
      }}
      // tabBarOptions={{
      //   pressColor: "gray",
      //   style: {
      //     position: "absolute",
      //     top: 0,
      //     justifyContent: "center",
      //     alignContent: "center",
      //     alignItems: "center",
      //     backgroundColor: "#c39e81",
      //     shadowColor: "#000",
      //     shadowOffset: {
      //       width: 0,
      //       height: 2,
      //     },
      //     shadowOpacity: 0.8,
      //     shadowRadius: 5,
      //     elevation: 5,
      //   },

      //   activeTintColor: "black",
      //   inactiveTintColor: "white",
      //   labelStyle: {
      //     fontSize: Device.isTablet ? 20 : 15,
      //     marginBottom: -15,
      //   },
      // }}
    >
      <MenuDrawerIphone.Screen
        name="Hammam"
        component={HammamMenu}
        options={{
          // header: () => false,
          headerLeft: () => <SideMenuIcon />,
        }}
      />
      <MenuDrawerIphone.Screen name="Massage" component={MassageMenu} />
      <MenuDrawerIphone.Screen name="Nails" component={NailMenu} />
      <MenuDrawerIphone.Screen name="Hair" component={HairMenu} />
      <MenuDrawerIphone.Screen name="Makeup" component={MakeupMenu} />
      <MenuDrawerIphone.Screen
        name="Hair Removal"
        component={HairRemovalMenu}
      />
      <MenuDrawerIphone.Screen name="Facial" component={FacialMenu} />
    </MenuDrawerIphone.Navigator>
  );
  const MenuTabScreen = () => (
    <MenuTab.Navigator
      screenOptions={{
        header: () => false,
        // headerLeft: () => <SideMenuIcon />,
      }}
      tabBarOptions={{
        pressColor: "gray",
        style: {
          position: "absolute",
          top: 0,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          backgroundColor: "#c39e81",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.8,
          shadowRadius: 5,
          elevation: 5,
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
      <MenuTab.Screen name="Facial" component={FacialMenu} />
    </MenuTab.Navigator>
  );
  const Mobile = createDrawerNavigator();
  const Reciepts = createDrawerNavigator();
  const AddItems = createStackNavigator();
  const AddScreen = () => (
    <AddItems.Navigator
      screenOptions={{
        // header: () => false,
        headerLeft: () => <SideMenuIcon />,
      }}
    >
      <AddItems.Screen name="Add Item" component={AddItem} />
    </AddItems.Navigator>
  );
  const OnlineItems = createStackNavigator();
  const OnlineScreen = () => (
    <OnlineItems.Navigator
      screenOptions={{
        headerLeft: () => <SideMenuIcon />,
      }}
    >
      <OnlineItems.Screen
        name="Online Reciepts"
        component={OnlineReciptsScreenTablet}
      />
    </OnlineItems.Navigator>
  );
  const MobileDrawer = () => (
    <Mobile.Navigator
      screenOptions={{
        // header: () => false,
        headerLeft: () => <SideMenuIcon />,
      }}
      drawerContentOptions={{
        headerLeft: () => <SideMenuIcon />,
        activeTintColor: "black",
        activeBackgroundColor: "#c39e81",
      }}
    >
      <Mobile.Screen name="Today's Reciepts" component={ReciptsScreen} />
      <Mobile.Screen name="This Month" component={ThisMonthlyReciptsScreen} />
      <Mobile.Screen name="Online Reciepts" component={OnlineScreen} />

      <Mobile.Screen
        name="All Monthly Reciepts"
        component={MonthlyReciptsScreen}
      />
      <Mobile.Screen name="Cost" component={CostScreen} />
      <Mobile.Screen name="Employees" component={EmployeeScreen} />
      <Mobile.Screen name="Add Items" component={AddScreen} />

      {/* <Mobile.Screen name="Menu" component={MenuScreen} /> */}
    </Mobile.Navigator>
  );
  const RecieptsDrawer = () => (
    <Reciepts.Navigator
      screenOptions={{
        // header: () => false,
        headerLeft: () => <SideMenuIcon />,
      }}
      drawerContentOptions={{
        headerLeft: () => <SideMenuIcon />,
        activeTintColor: "black",
        activeBackgroundColor: "#c39e81",
      }}
    >
      <Reciepts.Screen name="This Month" component={ThisMonthlyReciptsScreen} />
      <Reciepts.Screen name="Online Reciepts" component={OnlineScreen} />
      <Reciepts.Screen
        name="All Monthly Reciepts"
        component={MonthlyReciptsScreen}
      />

      {/* <Reciepts.Screen name="Menu" component={MenuScreen} /> */}
    </Reciepts.Navigator>
  );
  return Device.isTablet ? (
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
          marginBottom: Device.isAndroid ? 15 : 0,
        },
      }}
    >
      <>
        <Service.Screen
          name="Home"
          component={PackageScreen}
          options={{ header: () => false }}
        />
        <Service.Screen
          name="Today's"
          component={ReciptsScreenTablet}
          options={{ header: () => false }}
        />
        <Service.Screen
          name="Reciepts"
          component={OnlineReciptsScreenTablet}
          options={{ header: () => false }}
        />
        <Service.Screen
          name="Menu"
          component={MenuTabScreen}
          options={{ header: () => false }}
        />
      </>
    </Service.Navigator>
  ) : (
    // <Service.Navigator
    //   initialRouteName="Home"
    //   tabBarOptions={{
    //     pressColor: "gray", //for click (ripple) effect color
    //     style: {
    //       backgroundColor: "#c39e81",
    //       justifyContent: "center",
    //       alignItems: "center",
    //       alignContent: "center",
    //       shadowColor: "#000",
    //       // height: 20,
    //       shadowOffset: {
    //         width: 0,
    //         height: 2,
    //       },
    //       shadowOpacity: 0.8,
    //       shadowRadius: 5,
    //       elevation: 5, //color you want to change
    //     },
    //     activeTintColor: "black",
    //     inactiveTintColor: "white",
    //     labelStyle: {
    //       fontSize: Device.isTablet ? 20 : 15,
    //       marginBottom: Device.isAndroid ? 15 : 0,
    //     },
    //   }}
    // >
    //   <Service.Screen component={MobileDrawer} name="Home" />
    //   <Service.Screen component={RecieptsDrawer} name="All Reciepts" />
    // </Service.Navigator>
    <MobileDrawer />
    // <Service.Screen name="Home" component={MobileDrawer} />
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
