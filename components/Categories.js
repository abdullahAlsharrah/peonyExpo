import React from "react";
import { Container, Tab, Tabs, Spinner } from "native-base";
import serviceStore from "../stores/serviceStore";
import { observer } from "mobx-react";
import Service from "./services/Service";
import ProductList from "./products/ProductList";
import AddButton from "./buttons/AddButton";
import AddService from "./services/AddService";
const Categories = () => {
  if (serviceStore.loading) return <Spinner />;
  return (
    <Container>
      <Tabs
        tabBarInactiveTextColor={"black"}
        tabBarActiveTextColor={"#c39e81"}
        tabBarUnderlineStyle={{ backgroundColor: "#c39e81" }}
      >
        <Tab heading="Packages">
          <Service category="Packages" />
        </Tab>
        <Tab heading="Offers">
          <Service category="Offers" />
        </Tab>
        <Tab heading="Nails">
          <Service category="Nail" />
          <AddService />
        </Tab>
        <Tab heading="Hair">
          <Service category="Hair" />
          <AddService />
        </Tab>
        <Tab heading="Body">
          <Service category="Body" />
          <AddService />
        </Tab>
        <Tab heading="Products">
          <ProductList />
        </Tab>
      </Tabs>
    </Container>
  );
};
export default observer(Categories);
