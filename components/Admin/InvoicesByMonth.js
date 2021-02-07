import React from "react";
import { Container, Header, Tab, Tabs, ScrollableTab } from "native-base";
import invoiceStore from "../../stores/invoiceStore";
import Invoices from "./Invoices";
const InvoicesByMonth = () => {
  const Jan = invoiceStore.invoices.filter(
    (invoice) => new Date(invoice.createdAt).getMonth() === 0
  );
  const Feb = invoiceStore.invoices.filter(
    (invoice) => new Date(invoice.createdAt).getMonth() === 1
  );
  const Mar = invoiceStore.invoices.filter(
    (invoice) => new Date(invoice.createdAt).getMonth() === 2
  );
  const Apr = invoiceStore.invoices.filter(
    (invoice) => new Date(invoice.createdAt).getMonth() === 3
  );
  const May = invoiceStore.invoices.filter(
    (invoice) => new Date(invoice.createdAt).getMonth() === 4
  );
  const Jun = invoiceStore.invoices.filter(
    (invoice) => new Date(invoice.createdAt).getMonth() === 5
  );
  const Jul = invoiceStore.invoices.filter(
    (invoice) => new Date(invoice.createdAt).getMonth() === 6
  );
  const Aug = invoiceStore.invoices.filter(
    (invoice) => new Date(invoice.createdAt).getMonth() === 7
  );
  const Sep = invoiceStore.invoices.filter(
    (invoice) => new Date(invoice.createdAt).getMonth() === 8
  );
  const Oct = invoiceStore.invoices.filter(
    (invoice) => new Date(invoice.createdAt).getMonth() === 9
  );
  const Nov = invoiceStore.invoices.filter(
    (invoice) => new Date(invoice.createdAt).getMonth() === 10
  );
  const Dec = invoiceStore.invoices.filter(
    (invoice) => new Date(invoice.createdAt).getMonth() === 11
  );
  return (
    <Container>
      <Header hasTabs />
      <Tabs renderTabBar={() => <ScrollableTab />}>
        <Tab heading="Jun">
          <Invoices list={Jan} />
        </Tab>
        <Tab heading="Feb">
          <Invoices list={Feb} />
        </Tab>
        <Tab heading="Mar">
          <Invoices list={Mar} />
        </Tab>
        <Tab heading="Apr">
          <Invoices list={Apr} />
        </Tab>
        <Tab heading="May">
          <Invoices list={May} />
        </Tab>
        <Tab heading="Jun">
          <Invoices list={Jun} />
        </Tab>
        <Tab heading="Jul">
          <Invoices list={Jul} />
        </Tab>
        <Tab heading="Aug">
          <Invoices list={Aug} />
        </Tab>
        <Tab heading="Sep">
          <Invoices list={Sep} />
        </Tab>
        <Tab heading="Oct">
          <Invoices list={Oct} />
        </Tab>
        <Tab heading="Nov">
          <Invoices list={Nov} />
        </Tab>
        <Tab heading="Dec">
          <Invoices list={Dec} />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default InvoicesByMonth;
