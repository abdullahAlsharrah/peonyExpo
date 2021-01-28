import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ServiceItem from "./ServiceItem";
import services from "./services";
const Service = () => {
  const serviceList = services.map((service) => (
    <ServiceItem service={service} key={service.id} />
  ));
  return <View style={styles.box}>{serviceList}</View>;
};

export default Service;
const styles = StyleSheet.create({
  box: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
});
