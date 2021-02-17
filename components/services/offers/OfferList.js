import { observer } from "mobx-react";
import { Spinner, View } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import offerStore from "../../../stores/offerStore";
import OfferItem from "./OfferItem";

const OfferList = () => {
  if (offerStore.loading) return <Spinner />;
  //   const d = new Date();
  const offersList = offerStore.offers.map((offer) => (
    <OfferItem offer={offer} key={`O${offer.id}`} />
  ));
  //   const totalInvoicesPrice = () => {
  //     let total = 0;
  //     list.map(
  //       (offer) =>
  //         offer.services.forEach((service) => {
  //           total += service.price;
  //         }) & offer.products.forEach((product) => (total += product.price))
  //     );

  //     return total;
  //   };

  return (
    <ScrollView>
      <View style={styles.box}>{offersList}</View>
    </ScrollView>
  );
};
export default observer(OfferList);
const styles = StyleSheet.create({
  box: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
});
