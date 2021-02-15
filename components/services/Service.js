import { observer } from "mobx-react";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import serviceStore from "../../stores/serviceStore";
import ServiceItem from "./ServiceItem";
// import services from "./services";
const Service = ({ category, handleopen }) => {
  const list = handleopen
    ? serviceStore.services
    : serviceStore.services.filter((service) => service.category === category);
  const serviceList = list.map((service) => (
    <ServiceItem
      service={service}
      key={`s${service.id}`}
      handleopen={handleopen}
    />
  ));
  return (
    <ScrollView>
      <View style={styles.box}>{serviceList}</View>
    </ScrollView>
  );
};

export default observer(Service);
const styles = StyleSheet.create({
  box: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    // marginLeft: 15,
  },
});
