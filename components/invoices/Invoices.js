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
import { useIsFocused } from "@react-navigation/native";
import offerStore from "../../stores/offerStore";
const Invoices = ({ month, navigation }) => {
  const [query, setQuery] = React.useState("");
  const isFocused = useIsFocused();
  const d = new Date();
  let dtFormat = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  useEffect(() => {
    // const fetchData = async () => {
    //   const _invoices = await instance.get(
    //     `/invoices/${new Date().getMonth() + 1}`
    //   );
    //   setInvoices(_invoices.data);
    // };
    // fetchData();
    if (isFocused) {
      invoiceStore.fetchInvoices();
      offerStore.fetchOffers();
      costStore.fetchCosts();
      const interval = setInterval(() => {
        //   // const fetchData = async () => {
        //   //   const _invoices = await instance.get(`/invoices/${month}`);
        //   //   setInvoices(_invoices.data);
        //   // };
        invoiceStore.fetchInvoices();
        offerStore.fetchOffers();
        costStore.fetchCosts();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isFocused]);

  // if (invoices.length === 0)
  //   return (
  //     <View style={{ flex: 1 }}>
  //       <Spinner />
  //     </View>
  //   );

  const list = invoiceStore.invoices
    .filter(
      (invoice) =>
        // (invoice.payment === "cash") &
        dtFormat.format(new Date(invoice.createdAt)) === dtFormat.format(d)
      // new Date(invoice.createdAt).getDate() === 15 &&
      // new Date(invoice.createdAt).getMonth() === d.getMonth()
    )
    // .slice()
    .sort((a, b) => a.id - b.id);
  const invoicesList = list
    .filter((invoice) => JSON.stringify(invoice.phoneNumber).includes(query))
    .map((invoice) => (
      <InvoiceItem
        invoice={invoice}
        key={invoice.id}
        navigation={navigation}
        month={month}
      />
    ));
  // wait(5000).then(() => invoiceStore.fetchInvoices() & costStore.fetchCosts());

  const totalInvoicesPrice = () => {
    let total = 0;
    list.forEach((invoice) => {
      total += invoice.price;
    });

    return total.toFixed(2);
  };
  const totalPaymentInvoices = (payment) => {
    let total = 0;
    list
      .filter((invoice) => invoice.payment === payment)
      .forEach((invoice) => {
        total += invoice.price;
      });
    return total.toFixed(2);
  };

  const cashBackByDate = () => {
    let total = 0;

    costStore.costs
      .filter(
        (cost) =>
          (cost.invoiceId !== null) &
          (dtFormat.format(new Date(cost.createdAt)) === dtFormat.format(d))
      )
      .forEach((cost) => (total += cost.price));
    return total.toFixed(2);
  };

  return invoiceStore.loading ? (
    <Spinner />
  ) : (
    <Content style={{ marginLeft: -10 }}>
      <Text
        style={[
          styles.total,
          {
            marginLeft: 0,
            width: "100%",
            borderWidth: 1,
            padding: 5,
            borderColor: "green",
            backgroundColor: "rgb(230, 255, 230)",
          },
        ]}
      >
        Total:{" "}
        <Text style={{ color: "green" }}>
          {totalInvoicesPrice() - cashBackByDate()} KD
        </Text>
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          margin: 10,
        }}
      >
        {/* <Text style={styles.total}>
            Incomes: <Text style={styles.total}>{totalInvoicesPrice()} KD</Text>
          </Text> */}
        {/* <View style={[styles.total, { marginLeft: 20, marginRight: -10 }]}> */}

        <View
          style={{
            width: Device.isTablet ? "50%" : null,
            margin: 10,
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Text style={styles.total}>
            Cash:{" "}
            <Text style={{ color: "green" }}>
              {totalPaymentInvoices("cash")} KD
            </Text>
          </Text>
          <Text style={styles.total}>
            K-net:{" "}
            <Text style={{ color: "green" }}>
              {totalPaymentInvoices("k-net")} KD
            </Text>
          </Text>
          <Text style={styles.total}>
            Online:{" "}
            <Text style={{ color: "green" }}>
              {totalPaymentInvoices("online")} KD
            </Text>
          </Text>
          {/* </View> */}

          <Text style={styles.total}>
            Cash back:{" "}
            <Text style={{ color: "red" }}>{cashBackByDate()} KD</Text>
          </Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={Device.isTablet ? styles.search : styles.search1}>
          <SearchBarr query={query} setQuery={setQuery} />
        </View>
      </View>
      <List style={{ paddingBottom: 15 }}>
        <ListItem>
          <Text style={styles.text}>No.</Text>
          <Text style={styles.text}>Phone No.</Text>

          <Text style={styles.text}>Serv : Prod</Text>

          <Text style={styles.text}> Total KD</Text>
        </ListItem>
        {invoicesList}
      </List>
    </Content>
  );
};

export default observer(Invoices);
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
