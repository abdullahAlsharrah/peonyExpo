import { observer } from "mobx-react";
import React from "react";
import {
  RefreshControl,
  StyleSheet,
  Text,
  Touchable,
  View,
} from "react-native";
import Categories from "../components/services/Categories";
import RecieptList from "../components/invoices/RecieptList";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import productStore from "../stores/productStore";
import apackageStore from "../stores/packageStore";
import serviceStore from "../stores/serviceStore";
import offerStore from "../stores/offerStore";
import languageStore from "../stores/language";
import { Button } from "native-base";

const ServicesScreen = () => {
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    productStore.fetchProducts();
    apackageStore.fetchPackages();
    serviceStore.fetchServices();
    offerStore.fetchOffers();
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const setLan = (lan) => {
    languageStore.setLanguage(lan);
  };
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Text style={styles.logoText}>PEONY</Text>
        <View style={styles.languageContainer}>
          <Button
            onPress={() => setLan("en")}
            style={
              languageStore.language === "en"
                ? styles.selected
                : styles.notSelected
            }
          >
            <Text style={styles.language}>En</Text>
          </Button>
          <Button
            onPress={() => setLan("ar")}
            style={[
              languageStore.language === "ar"
                ? styles.selected
                : styles.notSelected,
            ]}
          >
            <Text style={styles.language}>عربي</Text>
          </Button>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.container1}>
          <View style={styles.recipt}>
            <RecieptList language={languageStore.language} />
          </View>
          <View style={styles.box}>
            <Categories language={languageStore.language} />
          </View>
          {/* <StatusBar style="auto" /> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default observer(ServicesScreen);
const styles = StyleSheet.create({
  logoText: {
    textAlign: "center",
    fontSize: 50,
    color: "white",
    // color: "#c39e81",
  },
  logo: {
    height: 50,
    marginTop: 20,
    marginHorizontal: 30,
    marginBottom: 5,
  },
  container: {
    height: "100%",
    backgroundColor: "#c39e81",
  },
  container1: {
    height: "95%",
    flexDirection: "row",
    marginVertical: 20,
    marginHorizontal: 10,
  },
  box: {
    width: "70%",
    marginLeft: 5,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "transparent",
    marginBottom: 5,
  },
  recipt: {
    marginTop: -10,
    width: "30%",
    borderWidth: 2,
    borderColor: "transparent",
    marginBottom: 33,
  },
  scrollView: {
    flex: 1,
  },
  languageContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "flex-end",
    alignItems: "center",
    alignContent: "center",
    zIndex: 10,
  },
  language: {
    color: "white",
    marginHorizontal: 5,
    fontSize: 15,
  },
  selected: {
    backgroundColor: "gray",
    marginTop: -40,
    height: 40,
    width: 50,
    justifyContent: "center",
  },
  notSelected: {
    backgroundColor: "transparent",
    marginTop: -40,
    height: 40,
    justifyContent: "center",
  },
});
