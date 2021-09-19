import { observer } from "mobx-react";
import { Content, List, ListItem, Spinner, View } from "native-base";
import React, { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import costStore from "../../stores/costStore";
import invoiceStore from "../../stores/invoiceStore";
import InvoiceItem from "./InvoiceItem";
import "intl";
import "intl/locale-data/jsonp/en"; // or any other locale you need
import SearchBarr from "../SearchBar/SearchBarr";
import Device from "react-native-device-detection";
import languageStore from "../../stores/language";

const OnlineInvoices = ({ navigation }) => {
  if (invoiceStore.loading) return <Spinner />;
  const language = languageStore.language;
  const [query, setQuery] = React.useState("");

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     invoiceStore.fetchInvoices();
  //     costStore.fetchCosts();
  //   }, 10000);
  //   return () => clearInterval(interval);
  // }, []);

  const list = invoiceStore.invoices.filter(
    (invoice) => invoice.payment === "online"
  );
  const notDoneInvoicesList = invoiceStore.invoices
    .filter((invoice) => invoice.notDone === true && invoice.notes !== null)
    .filter((invoice) => JSON.stringify(invoice.phoneNumber).includes(query))
    .map((invoice) => (
      <InvoiceItem invoice={invoice} key={invoice.id} navigation={navigation} />
    ));
  const updatedInvoicesList = invoiceStore.invoices
    .filter(
      (invoice) =>
        invoice.notDone === false &&
        new Date().getDate() === new Date(invoice.updatedAt).getDate() &&
        new Date().getDate() !== new Date(invoice.createdAt).getDate()
    )
    .filter((invoice) => JSON.stringify(invoice.phoneNumber).includes(query))
    .map((invoice) => (
      <InvoiceItem invoice={invoice} key={invoice.id} navigation={navigation} />
    ));
  const invoicesList = list
    .filter((invoice) => invoice.notDone === true && invoice.notes === null)
    .filter((invoice) => JSON.stringify(invoice.phoneNumber).includes(query))
    .map((invoice) => (
      <InvoiceItem invoice={invoice} key={invoice.id} navigation={navigation} />
    ));

  return (
    <Content style={{ marginLeft: -10 }}>
      <View style={styles.searchContainer}>
        <View style={Device.isTablet ? styles.search : styles.search1}>
          <SearchBarr query={query} setQuery={setQuery} />
        </View>
      </View>
      <List>
        <ListItem>
          <Text style={styles.text}>No.</Text>
          <Text style={styles.text}>Phone No.</Text>

          <Text style={styles.text}>Serv : Prod</Text>

          <Text style={styles.text}> Total KD</Text>
        </ListItem>
        <View
          style={{
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          {invoicesList.length !== 0 && (
            <Text style={[styles.title, { color: "red" }]}>
              <Text style={{ color: "black", fontSize: 15 }}>
                {language === "ar" ? "(رابط)" : "(online)"}
              </Text>
              {language === "ar" ? "لم يتم الحضور" : "Did Not Come Yet"}
            </Text>
          )}
        </View>
        {invoicesList}
        {notDoneInvoicesList.length !== 0 && (
          <View
            style={{
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <View style={styles.separator} />

            <Text style={[styles.title, { color: "red" }]}>
              {language === "ar" ? "لم يتم استكمال الاعمال" : "Not Done"}
            </Text>
          </View>
        )}
        {notDoneInvoicesList}
        {updatedInvoicesList.length !== 0 && (
          <View
            style={{
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <View style={styles.separator} />

            <Text style={styles.title}>
              {language === "ar" ? "تم الحضور اليوم" : "Done Today"}
            </Text>
          </View>
        )}
        {updatedInvoicesList}
      </List>
    </Content>
  );
};

export default observer(OnlineInvoices);
const styles = StyleSheet.create({
  text: { textAlign: "center", width: "25%" },
  total: {
    textAlign: "center",
    fontSize: 12,
    // width: "33%",
    marginLeft: 20,
  },
  totalInvoices: {
    textAlign: "center",
    fontSize: 20,
  },
  search: {
    width: "80%",
  },
  search1: {
    width: "95%",
    marginLeft: 10,
  },
  searchContainer: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  separator: {
    width: "90%",
    height: 2,
    backgroundColor: "gray",
    marginBottom: 5,
  },
  title: {
    fontWeight: "700",
    fontSize: 20,
    color: "green",
  },
});
