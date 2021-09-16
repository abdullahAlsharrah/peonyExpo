import { observer } from "mobx-react";
import { Button, List, Spinner } from "native-base";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Device from "react-native-device-detection";
import { ScrollView } from "react-native-gesture-handler";
import invoiceStore from "../../../stores/invoiceStore";
import SearchBarr from "../../SearchBar/SearchBarr";
import CustomerItem from "./CustomerItem";

const CustomersList = () => {
  const [data, setData] = React.useState(10);
  const [query, setQuery] = React.useState("");
  const [customers, setCustomers] = React.useState([]);
  const [OnRefresh, SetRefresh] = React.useState(false);

  useEffect(() => {
    SetRefresh(true);
    setTimeout(() => {
      const list = invoiceStore.invoices
        .filter((invoice) => invoice.phoneNumber !== null)
        .map((invoice) => invoice.phoneNumber);
      let listC = [];
      list.forEach((customer) => {
        const item = listC.find((_customer) => _customer.number === customer);
        !item
          ? listC.push({
              number: customer,
              count: 1,
            })
          : (item.count = item.count + 1);
      });
      setCustomers(listC);
      SetRefresh(false);
    }, 2000);
  }, []);
  const phoneList = customers

    .sort((a, b) => b.count - a.count)
    .filter((customer) => JSON.stringify(customer).includes(query))

    .slice(0, data)
    .map((customer) => <CustomerItem customer={customer} />);

  return (
    <ScrollView>
      {OnRefresh ? (
        <Spinner />
      ) : (
        <List style={{ justifyContent: "center", margin: 20 }}>
          <View style={styles.searchContainer}>
            <View style={Device.isTablet ? styles.search : styles.search1}>
              <SearchBarr query={query} setQuery={setQuery} />
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              margin: 20,
            }}
          >
            <Text>{customers.length} Customers</Text>
          </View>
          {phoneList}
          <Button
            disabled={customers.length === phoneList.length ? true : false}
            onPress={() => setData(data + 10)}
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor:
                customers.length === phoneList.length ? "gray" : "#c39e81",
            }}
          >
            <Text style={{ color: "white" }}>Load More ...</Text>
          </Button>
        </List>
      )}
    </ScrollView>
  );
};

export default observer(CustomersList);
const styles = StyleSheet.create({
  text: { textAlign: "center", width: "25%" },
  total: {
    textAlign: "center",
    fontSize: 12,
    // width: "33%",
    paddingBottom: 5,
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
});
