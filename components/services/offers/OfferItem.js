// import { observer } from "mobx-react";
// import { ListItem } from "native-base";
// import React from "react";
// import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
// import invoiceStore from "../../../stores/invoiceStore";

// const OfferItem = ({ offer }) => {
//   const newItem = {
//     quantity: 1,
//     offerId: offer.id,
//     price: offer.price,
//     name: offer.name,
//   };
//   const handleAdd = () => {
//     invoiceStore.addItemToInvoice(newItem);
//   };
//   const handleRemove = () => {
//     const foundItem = invoiceStore.items.find(
//       (item) => item.offerId === newItem.offerId
//     );
//     if (foundItem) {
//       invoiceStore.removeItemFromInvoice(`o${foundItem.offerId}`);
//     } else null;
//   };

//   const foundItem = invoiceStore.items.find(
//     (item) => item.offerId === offer.id
//   );

//   return (
//     <ListItem
//       style={{
//         flexDirection: "row",
//         backgroundColor: foundItem ? "tomato" : "white",
//       }}
//       onPress={handleAdd}
//       onLongPress={handleRemove}
//     >
//       <Text style={[styles.text, { color: foundItem ? "white" : "black" }]}>
//         {offer.name}
//       </Text>

//       <Text style={[styles.text, { color: foundItem ? "white" : "black" }]}>
//         {offer.services.map((service) => (
//           <Text>
//             {service.name}
//             {" ,  "}
//           </Text>
//         ))}
//       </Text>

//       <Text style={[styles.text, { color: foundItem ? "white" : "black" }]}>
//         {offer.price} KD
//       </Text>
//     </ListItem>
//   );
// };

// export default observer(OfferItem);
// const styles = StyleSheet.create({
//   item: {
//     height: 50,
//     width: 100,
//     borderRadius: 8,
//     justifyContent: "center",
//     alignContent: "center",
//     alignItems: "center",
//     margin: 10,
//     marginBottom: 50,
//     shadowColor: "black",
//     shadowOffset: {
//       width: 0,
//       height: 0,
//     },
//     shadowOpacity: 0.8,
//     shadowRadius: 3.25,

//     elevation: 5,
//   },
//   text: { textAlign: "center", width: "33%" },
// });
