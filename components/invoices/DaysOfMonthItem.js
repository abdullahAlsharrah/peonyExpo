import { Separator } from "native-base";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import costStore from "../../stores/costStore";
import invoiceStore from "../../stores/invoiceStore";
import InvoiceItem from "./InvoiceItem";
import InvoicesByMonthItem from "./InvoicesByMonthItem";

const DaysOfMonthItem = ({ day, navigation, query, list, month }) => {
  let dtFormat = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const year = new Date().getFullYear();
  const _list = list.filter(
    (invoice) => new Date(invoice.createdAt).getDate() === day
  );
  // (new Date(invoice.createdAt).getMonth() === month - 1) &
  // (new Date(invoice.createdAt).getFullYear() === new Date().getFullYear())

  const invoicesList = list
    .filter((invoice) => new Date(invoice.createdAt).getDate() === day)
    .filter((invoice) => JSON.stringify(invoice.phoneNumber).includes(query))
    .map((invoice) => (
      <InvoiceItem invoice={invoice} key={invoice.id} navigation={navigation} />
    ));
  const totalInvoicesPrice = () => {
    let total = 0;
    _list
      .filter((invoice) => new Date(invoice.createdAt).getDate() === day)
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
          (dtFormat.format(new Date(cost.createdAt)) ===
            dtFormat.format(new Date(year, month - 1, day)))
      )
      .forEach((cost) => (total += cost.price));
    return total.toFixed(2);
  };

  const totalPaymentInvoices = (payment) => {
    let total = 0;
    _list
      .filter(
        (invoice) =>
          invoice.payment === payment &&
          new Date(invoice.createdAt).getDate() === day
      )
      .forEach((invoice) => {
        total += invoice.price;
      });
    return total.toFixed(2);
  };
  if (
    month - 1 > new Date().getMonth() ||
    (month - 1 >= new Date().getMonth()) & (day > new Date().getDate())
  )
    return null;

  return query && invoicesList.length === 0 ? null : (
    <View>
      {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}> */}
      <View style={styles.horizontalList}>
        <Text>{day}</Text>
        <Text style={styles.total}>
          Cash:{" "}
          <Text style={{ color: "green" }}>
            {totalPaymentInvoices("cash")} KD
          </Text>
        </Text>
        <Text> |</Text>
        <Text style={styles.total}>
          K-net:{" "}
          <Text style={{ color: "green" }}>
            {totalPaymentInvoices("k-net")} KD
          </Text>
        </Text>
        <Text> |</Text>
        <Text style={styles.total}>
          Online:{" "}
          <Text style={{ color: "green" }}>
            {totalPaymentInvoices("online")} KD
          </Text>
        </Text>
        <Text> |</Text>
        {/* </View> */}
        <Text style={styles.total}>
          Cash back: <Text style={{ color: "red" }}>{cashBackByDate()} KD</Text>
        </Text>
        <Text> |</Text>
        <Text style={styles.total}>
          Total:{" "}
          <Text style={{ color: "green" }}>
            {totalInvoicesPrice() - cashBackByDate()} KD
          </Text>
        </Text>
        <Text> |</Text>
      </View>
      {/* </ScrollView> */}
      {invoicesList}
      <Separator style={{ height: 3, backgroundColor: "#c39e81" }} />
    </View>
  );
};

export default DaysOfMonthItem;
const styles = StyleSheet.create({
  text: { textAlign: "center", width: "25%" },
  total: {
    textAlign: "center",
    fontSize: 12,
    marginLeft: 10,
    // width: "33%",
  },
  totalInvoices: {
    textAlign: "center",
    fontSize: 20,
  },
  horizontalList: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
    alignItems: "center",
    alignContent: "center",
  },
});
