import React from "react";
import {
  Container,
  Header,
  Tab,
  Tabs,
  ScrollableTab,
  Spinner,
} from "native-base";
import Invoices from "./Invoices";
import { observer } from "mobx-react";
import invoiceStore from "../../stores/invoiceStore";
const InvoicesByMonth = () => {
  if (invoiceStore.loading) return <Spinner />;
  return (
    <Container style={{ paddingTop: 10 }}>
      <Tabs
        renderTabBar={() => <ScrollableTab />}
        tabBarInactiveTextColor={"black"}
        tabBarActiveTextColor={"#c39e81"}
        tabBarUnderlineStyle={{ backgroundColor: "#c39e81" }}
      >
        <Tab heading="Jun">
          <Invoices month={0} />
        </Tab>
        <Tab heading="Feb">
          <Invoices month={1} />
        </Tab>
        <Tab heading="Mar">
          <Invoices month={2} />
        </Tab>
        <Tab heading="Apr">
          <Invoices month={3} />
        </Tab>
        <Tab heading="May">
          <Invoices month={4} />
        </Tab>
        <Tab heading="Jun">
          <Invoices month={5} />
        </Tab>
        <Tab heading="Jul">
          <Invoices month={6} />
        </Tab>
        <Tab heading="Aug">
          <Invoices month={7} />
        </Tab>
        <Tab heading="Sep">
          <Invoices month={8} />
        </Tab>
        <Tab heading="Oct">
          <Invoices month={9} />
        </Tab>
        <Tab heading="Nov">
          <Invoices month={10} />
        </Tab>
        <Tab heading="Dec">
          <Invoices month={11} />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default observer(InvoicesByMonth);
