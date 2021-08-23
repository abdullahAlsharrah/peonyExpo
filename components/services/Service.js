import { observer } from "mobx-react";
import { Spinner } from "native-base";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import serviceStore from "../../stores/serviceStore";
import MenuItem from "../Admin/Menu/MenuItem";
import AddOffer from "./offers/AddOffer";
import ServiceItem from "./ServiceItem";
// import services from "./services";
const Service = ({ category, handleopen, menu }) => {
  if (serviceStore.loading) return <Spinner />;
  const list = handleopen
    ? serviceStore.services
    : serviceStore.services.filter((service) => service.category === category);
  const serviceList = list.map((service) =>
    !menu ? (
      <ServiceItem
        service={service}
        key={`s${service.id}`}
        handleopen={handleopen}
      />
    ) : (
      <MenuItem item={service} key={`s${service.id}`} />
    )
  );
  return (
    <ScrollView>
      <View style={handleopen ? [styles.box, { marginTop: 30 }] : [styles.box]}>
        {serviceList}
      </View>
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
