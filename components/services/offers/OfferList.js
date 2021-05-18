// import { observer } from "mobx-react";
// import { List, ListItem, Spinner, Text, View } from "native-base";
// import React from "react";
// import { StyleSheet } from "react-native";
// import { ScrollView } from "react-native-gesture-handler";
// import offerStore from "../../../stores/offerStore";
// import OfferItem from "./OfferItem";

// const OfferList = () => {
//   if (offerStore.loading) return <Spinner />;
//   //   const d = new Date();
//   const offersList = offerStore.offers.map((offer) => (
//     <OfferItem offer={offer} key={`O${offer.id}`} />
//   ));
//   //   const totalInvoicesPrice = () => {
//   //     let total = 0;
//   //     list.map(
//   //       (offer) =>
//   //         offer.services.forEach((service) => {
//   //           total += service.price;
//   //         }) & offer.products.forEach((product) => (total += product.price))
//   //     );

//   //     return total;
//   //   };

//   return (
//     <ScrollView>
//       <List style={{ marginLeft: -20 }}>
//         <ListItem style={{ backgroundColor: "#c39e81" }}>
//           <Text style={styles.text}>Offer</Text>
//           <Text style={styles.text}>Offer Services</Text>

//           <Text style={styles.text}> Price KD</Text>
//         </ListItem>
//         {offersList}
//       </List>
//     </ScrollView>
//   );
// };
// export default observer(OfferList);
// const styles = StyleSheet.create({
//   box: {
//     flex: 1,
//     flexDirection: "row",
//     flexWrap: "wrap",
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 10,
//   },
//   text: { textAlign: "center", width: "33%" },
//   totalInvoices: {
//     textAlign: "center",
//     fontSize: 20,
//   },
// });
