import { observer } from "mobx-react";
import { Button, List, Spinner } from "native-base";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Device from "react-native-device-detection";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import invoiceStore from "../../../stores/invoiceStore";
import SearchBarr from "../../SearchBar/SearchBarr";
import CustomerItem from "./CustomerItem";
import "intl";
import "intl/locale-data/jsonp/en";
const CustomersList = () => {
  const [data, setData] = React.useState(10);
  const [query, setQuery] = React.useState("");
  const [sort, setSort] = React.useState("visits");
  const [customers, setCustomers] = React.useState([]);
  const [OnRefresh, SetRefresh] = React.useState(false);
  let dtFormat = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const list = invoiceStore.invoices
    .filter((invoice) => invoice.phoneNumber !== null)
    .map((invoice) => ({
      phone: invoice.phoneNumber,
      createdAt: invoice.createdAt,
      invoice: invoice.price,
    }));
  useEffect(() => {
    SetRefresh(true);
    setTimeout(() => {
      let listC = [];
      list.forEach((customer) => {
        const item = listC.find(
          (_customer) => _customer.number === customer.phone
        );
        !item
          ? listC.push({
              number: customer.phone,
              count: 1,
              invoices: 1,
              price: customer.invoice,
              date: [dtFormat.format(new Date(customer.createdAt))],
            })
          : item.date.includes(dtFormat.format(new Date(customer.createdAt)))
          ? (item.invoices = item.invoices + 1) &
            (item.price = item.price + customer.invoice)
          : (item.count = item.count + 1) &
            item.date.push(dtFormat.format(new Date(customer.createdAt))) &
            (item.invoices = item.invoices + 1) &
            (item.price = item.price + customer.invoice);
      });
      setCustomers(listC);
      SetRefresh(false);
    }, 2000);
  }, []);

  const phoneList = customers
    .sort((a, b) =>
      sort === "visits"
        ? b.count - a.count
        : sort === "invoices"
        ? b.invoices - a.invoices
        : b.price - a.price
    )
    .filter((customer) => JSON.stringify(customer).includes(query))
    .slice(0, data)
    .map((customer) => <CustomerItem customer={customer} />);
  return (
    <ScrollView>
      {OnRefresh ? (
        <Spinner />
      ) : (
        <>
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
              <View
                style={{
                  marginBottom: 20,

                  // width: "100%",
                  // backgroundColor: "white",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <TouchableOpacity
                    onPress={() => setSort("visits")}
                    style={sort === "visits" ? styles.button1 : styles.button}
                  >
                    <Text
                      style={sort === "visits" ? styles.text1 : styles.text}
                    >
                      visits
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setSort("invoices")}
                    style={sort === "invoices" ? styles.button1 : styles.button}
                  >
                    <Text
                      style={sort === "invoices" ? styles.text1 : styles.text}
                    >
                      invoices
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setSort("prices")}
                    style={sort === "prices" ? styles.button1 : styles.button}
                  >
                    <Text
                      style={sort === "prices" ? styles.text1 : styles.text}
                    >
                      prices
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
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
        </>
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
  button: {
    width: 70,
    justifyContent: "center",
    borderRadius: 0,
    backgroundColor: "white",
    height: 30,
  },
  text: {
    color: "black",
    textAlign: "center",
  },
  button1: {
    width: 70,
    justifyContent: "center",
    borderRadius: 0,
    backgroundColor: "#c39e81",
    height: 30,
  },
  text1: {
    color: "white",
    textAlign: "center",
  },
});
