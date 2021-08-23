import React from "react";
import { Tab, Tabs, ScrollableTab, Spinner } from "native-base";
import Invoices from "./Invoices";
import { observer } from "mobx-react";
import invoiceStore from "../../stores/invoiceStore";
import { View } from "react-native";
import Device from "react-native-device-detection";
import InvoicesByMonthList from "./InvoicesByMonthList";
const InvoicesByMonth = ({ navigation }) => {
  if (invoiceStore.loading) return <Spinner />;
  return (
    <View
      style={{
        flex: 1,
        marginTop: Device.isTablet ? 20 : 30,
      }}
    >
      {}
      <Tabs
        renderTabBar={Device.isTablet ? null : () => <ScrollableTab />}
        style={{
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          backgroundColor: "white",
        }}
        tabContainerStyle={{ backgroundColor: "white" }}
      >
        <Tab heading="Jan">
          <View style={{ flex: 1, marginTop: 20 }}>
            <InvoicesByMonthList month={1} navigation={navigation} />
          </View>
        </Tab>
        <Tab heading="Feb">
          <View style={{ flex: 1, marginTop: 20 }}>
            <InvoicesByMonthList month={2} navigation={navigation} />
          </View>
        </Tab>
        <Tab heading="Mar">
          <View style={{ flex: 1, marginTop: 20 }}>
            <InvoicesByMonthList
              month={3}
              navigation={navigation}
              navigation={navigation}
            />
          </View>
        </Tab>
        <Tab heading="Apr">
          <View style={{ flex: 1, marginTop: 20 }}>
            <InvoicesByMonthList month={4} navigation={navigation} />
          </View>
        </Tab>
        <Tab heading="May">
          <View style={{ flex: 1, marginTop: 20 }}>
            <InvoicesByMonthList month={5} navigation={navigation} />
          </View>
        </Tab>
        <Tab heading="Jun">
          <View style={{ flex: 1, marginTop: 20 }}>
            <InvoicesByMonthList month={6} navigation={navigation} />
          </View>
        </Tab>
        <Tab heading="Jul">
          <View style={{ flex: 1, marginTop: 20 }}>
            <InvoicesByMonthList month={7} navigation={navigation} />
          </View>
        </Tab>
        <Tab heading="Aug">
          <View style={{ flex: 1, marginTop: 20 }}>
            <InvoicesByMonthList month={8} navigation={navigation} />
          </View>
        </Tab>
        <Tab heading="Sep">
          <View style={{ flex: 1, marginTop: 20 }}>
            <InvoicesByMonthList month={9} navigation={navigation} />
          </View>
        </Tab>
        <Tab heading="Oct">
          <View style={{ flex: 1, marginTop: 20 }}>
            <InvoicesByMonthList month={10} navigation={navigation} />
          </View>
        </Tab>
        <Tab heading="Nov">
          <View style={{ flex: 1, marginTop: 20 }}>
            <InvoicesByMonthList month={11} navigation={navigation} />
          </View>
        </Tab>
        <Tab heading="Dec">
          <View style={{ flex: 1, marginTop: 20 }}>
            <InvoicesByMonthList month={12} navigation={navigation} />
          </View>
        </Tab>
      </Tabs>
    </View>
  );
};

export default observer(InvoicesByMonth);
