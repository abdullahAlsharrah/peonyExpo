import React from "react";
import { Tab, Tabs, ScrollableTab, Spinner } from "native-base";
import Invoices from "./Invoices";
import { observer } from "mobx-react";
import invoiceStore from "../../stores/invoiceStore";
import { View } from "react-native";
import Device from "react-native-device-detection";
const InvoicesByMonth = () => {
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
            <Invoices month={1} />
          </View>
        </Tab>
        <Tab heading="Feb">
          <View style={{ flex: 1, marginTop: 20 }}>
            <Invoices month={2} />
          </View>
        </Tab>
        <Tab heading="Mar">
          <View style={{ flex: 1, marginTop: 20 }}>
            <Invoices month={3} />
          </View>
        </Tab>
        <Tab heading="Apr">
          <View style={{ flex: 1, marginTop: 20 }}>
            <Invoices month={4} />
          </View>
        </Tab>
        <Tab heading="May">
          <View style={{ flex: 1, marginTop: 20 }}>
            <Invoices month={5} />
          </View>
        </Tab>
        <Tab heading="Jun">
          <View style={{ flex: 1, marginTop: 20 }}>
            <Invoices month={6} />
          </View>
        </Tab>
        <Tab heading="Jul">
          <View style={{ flex: 1, marginTop: 20 }}>
            <Invoices month={7} />
          </View>
        </Tab>
        <Tab heading="Aug">
          <View style={{ flex: 1, marginTop: 20 }}>
            <Invoices month={8} />
          </View>
        </Tab>
        <Tab heading="Sep">
          <View style={{ flex: 1, marginTop: 20 }}>
            <Invoices month={9} />
          </View>
        </Tab>
        <Tab heading="Oct">
          <View style={{ flex: 1, marginTop: 20 }}>
            <Invoices month={10} />
          </View>
        </Tab>
        <Tab heading="Nov">
          <View style={{ flex: 1, marginTop: 20 }}>
            <Invoices month={11} />
          </View>
        </Tab>
        <Tab heading="Dec">
          <View style={{ flex: 1, marginTop: 20 }}>
            <Invoices month={12} />
          </View>
        </Tab>
      </Tabs>
    </View>
  );
};

export default observer(InvoicesByMonth);
