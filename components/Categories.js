import React, { Component } from "react";
import { Container, Header, Tab, Tabs, ScrollableTab } from "native-base";
import Service from "./Service";
import servivces from "./services";
const Categories = () => {
  const hairList = servivces.filter((service) => service.category === "hair");
  const offersList = servivces.filter(
    (service) => service.category === "offers"
  );
  const nailsList = servivces.filter((service) => service.category === "nails");
  const packagesList = servivces.filter(
    (service) => service.category === "packages"
  );
  const bodyList = servivces.filter((service) => service.category === "body");
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
        <Tab heading="Products"></Tab>
      </Tabs>
    </Container>
  );
};
export default Categories;
