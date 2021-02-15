import { Spinner } from "native-base";
import React from "react";
import ProductItem from "./ProductItem";
import { observer } from "mobx-react";
import { ScrollView, StyleSheet, View } from "react-native";
import productStore from "../../stores/productStore";

const ProductList = () => {
  if (productStore.loading) return <Spinner />;
  const productList = productStore.products.map((product) => (
    <ProductItem product={product} key={`p${product.id}`} />
  ));

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.container}>{productList}</View>
    </ScrollView>
  );
};

export default observer(ProductList);
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
});
