import React from "react";
import { Container, Tab, Tabs, Spinner } from "native-base";
import Service from "./Service";
import serviceStore from "../stores/serviceStore";
import { observer } from "mobx-react";
import ProductList from "./ProductList";
const Categories = () => {
  if (serviceStore.loading) return <Spinner />;
  const hairList = serviceStore.services.filter(
    (service) => service.category === "Hair"
  );
  const offersList = serviceStore.services.filter(
    (service) => service.category === "Offers"
  );
  const nailsList = serviceStore.services.filter(
    (service) => service.category === "Nail"
  );
  const packagesList = serviceStore.services.filter(
    (service) => service.category === "Packages"
  );
  const bodyList = serviceStore.services.filter(
    (service) => service.category === "Body"
  );
  return (
    <Container>
      <Tabs
        tabBarInactiveTextColor={"black"}
        tabBarActiveTextColor={"#c39e81"}
        tabBarUnderlineStyle={{ backgroundColor: "#c39e81" }}
      >
        <Tab heading="Packages">
          <Service list={packagesList} />
        </Tab>
        <Tab heading="Offers">
          <Service list={offersList} />
        </Tab>
        <Tab heading="Nails">
          <Service list={nailsList} />
        </Tab>
        <Tab heading="Hair">
          <Service list={hairList} />
        </Tab>
        <Tab heading="Body">
          <Service list={bodyList} />
        </Tab>
        <Tab heading="Products">
          <ProductList />
        </Tab>
      </Tabs>
    </Container>
  );
};
export default observer(Categories);
