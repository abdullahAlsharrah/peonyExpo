import { observer } from "mobx-react";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import serviceStore from "../../stores/serviceStore";
import ServiceItem from "./ServiceItem";
// import services from "./services";
const Service = ({ category }) => {
  const serviceList = serviceStore.services
    .filter((service) => service.category === category)
    .map((service) => <ServiceItem service={service} key={service.id} />);
  return <View style={styles.box}>{serviceList}</View>;
};

export default observer(Service);
const styles = StyleSheet.create({
  box: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    // justifyContent: "space-between",
    marginTop: 50,
    marginLeft: 20,
  },
});
