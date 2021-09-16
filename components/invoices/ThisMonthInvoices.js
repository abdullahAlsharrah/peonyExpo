import { useIsFocused } from "@react-navigation/native";
import { observer } from "mobx-react";
import { Button, Separator, Spinner, Text, View } from "native-base";
import React, { useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import costStore from "../../stores/costStore";
import employeeStore from "../../stores/employeeStore";
import instance from "../../stores/instance";
import invoiceStore from "../../stores/invoiceStore";
import SearchBarr from "../SearchBar/SearchBarr";
import DaysOfMonthItem from "./DaysOfMonthItem";

function ThisMonthInvoices({ navigation }) {
  const ListViewRef = useRef();
  const [invoices, setInvoices] = React.useState([]);
  const isFocused = useIsFocused();
  const [query, setQuery] = React.useState("");
  const [_day, setDay] = React.useState(null);
  const month = new Date().getMonth() + 1;
  let days = [];
  const year = new Date().getFullYear();
  // the last date of the month
  const lastDay = new Date(year, month, 0).getDate();
  for (let x = 1; x <= lastDay; x++) {
    days.push(x);
  }

  // useEffect(() => {
  // const fetchData = async () => {
  //   const _invoices = await instance.get(`/invoices/${month}`);
  //   setInvoices(_invoices.data);
  // };
  // setTimeout(() => {
  // }, 3000);
  //   if (isFocused) {
  //     const interval = setInterval(() => {
  //       //   // const fetchData = async () => {
  //       //   //   const _invoices = await instance.get(`/invoices/${month}`);
  //       //   //   setInvoices(_invoices.data);
  //       //   // };
  //       invoiceStore.fetchInvoices();
  //       costStore.fetchCosts();
  //     }, 5000);
  //     return () => clearInterval(interval);
  //   }
  // }, [isFocused]);

  // if (invoices.length === 0) {
  //   return (
  //     <View style={{ flex: 1 }}>
  //       <Spinner />
  //     </View>
  //   );
  // }
  const d = new Date();
  const list = invoiceStore.invoices.filter(
    (invoice) =>
      (new Date(invoice.createdAt).getMonth() === month - 1) &
      (new Date(invoice.createdAt).getFullYear() === d.getFullYear())
  );

  const daysList = days
    .filter((day) => (_day === null ? day : day === _day))
    .map((day) => (
      <DaysOfMonthItem
        list={list}
        day={day}
        navigation={navigation}
        month={month}
        setQuery={setQuery}
        query={query}
        key={day}
      />
    ));

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

  const cashBackByMonth = () => {
    let total = 0;

    costStore.costs
      .filter(
        (cost) =>
          (cost.invoiceId !== null) &
          (new Date(cost.createdAt).getMonth() === month - 1)
      )
      .forEach((cost) => (total += cost.price));
    return total;
  };
  const totalCost = () => {
    let total = 0;
    costStore.costs
      .filter((cost) => cost.invoiceId === null)
      .filter(
        (cost) =>
          (new Date(cost.createdAt).getMonth() === month - 1) &
          (new Date(cost.createdAt).getFullYear() === new Date().getFullYear())
      )
      .forEach((cost) => (total += cost.price));
    employeeStore.employees
      .filter(
        (employee) => new Date(employee.createdAt).getMonth() <= month - 1
      )
      .forEach((employee) => (total += employee.salary));
    return total;
  };
  const totalExtraCost = () => {
    let total = 0;
    costStore.costs
      .filter((cost) => cost.invoiceId === null)
      .filter(
        (cost) =>
          (new Date(cost.createdAt).getMonth() === month - 1) &
          (new Date(cost.createdAt).getFullYear() === new Date().getFullYear())
      )
      .forEach((cost) => (total += cost.price));

    return total;
  };
  const scrolling = () => {
    ListViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
  };

  return (
    <>
      <ScrollView ref={ListViewRef}>
        <View
          style={{
            paddingTop: 5,
            marginBottom: 5,
            overflow: "hidden",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 5,
            }}
          >
            <Text
              style={[
                styles.total,
                {
                  borderWidth: 1,
                  padding: 5,
                  borderColor: "red",
                  backgroundColor: "rgb(255, 229, 229)",
                },
              ]}
            >
              Monthly Cost:{" "}
              <Text
                style={{
                  color: "red",
                  textAlign: "center",
                  fontSize: 12,
                }}
              >
                {totalCost()} KD
              </Text>
            </Text>
            <Text
              style={[
                styles.total,
                {
                  borderWidth: 1,
                  padding: 5,
                  borderColor: "green",
                  backgroundColor: "rgb(230, 255, 230)",
                },
              ]}
            >
              Revenue:{" "}
              <Text
                style={{
                  color:
                    totalCost() + cashBackByMonth() === totalInvoicesPrice()
                      ? "black"
                      : totalCost() + cashBackByMonth() < totalInvoicesPrice()
                      ? "green"
                      : "red",
                  textAlign: "center",
                  fontSize: 12,
                }}
              >
                {(
                  totalInvoicesPrice() -
                  totalCost() -
                  cashBackByMonth()
                ).toFixed(2)}{" "}
                KD
              </Text>
              {/* <Text> |</Text> */}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              // margin: 10,
            }}
          >
            <Text style={styles.total}>
              Cash:{" "}
              <Text style={{ color: "green", fontSize: 12 }}>
                {totalPaymentInvoices("cash")} KD
              </Text>
              <Text> |</Text>
            </Text>
            <Text style={styles.total}>
              K-net:{" "}
              <Text style={{ color: "green", fontSize: 12 }}>
                {totalPaymentInvoices("k-net")} KD
              </Text>
              <Text> |</Text>
            </Text>
            <Text style={styles.total}>
              Online:{" "}
              <Text style={{ color: "green", fontSize: 12 }}>
                {totalPaymentInvoices("online")} KD
              </Text>
              <Text> |</Text>
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              //   margin: 10,
            }}
          >
            <Text style={styles.total}>
              Cash Back:{" "}
              <Text style={{ color: "red", fontSize: 12 }}>
                {cashBackByMonth()} KD
              </Text>
              <Text> |</Text>
            </Text>
            <Text style={styles.total}>
              Ext. Cost:{" "}
              <Text
                style={{
                  color: "red",
                  textAlign: "center",
                  fontSize: 12,
                }}
              >
                {totalExtraCost()} KD
              </Text>
              <Text> |</Text>
            </Text>
            <Text style={styles.total}>
              Income:{" "}
              <Text
                style={{
                  fontSize: 12,
                  color:
                    cashBackByMonth() === totalInvoicesPrice()
                      ? "black"
                      : cashBackByMonth() < totalInvoicesPrice()
                      ? "green"
                      : "red",
                }}
              >
                {totalInvoicesPrice() - cashBackByMonth() - totalExtraCost()} KD
              </Text>
              <Text> |</Text>
            </Text>
          </View>
        </View>
        <Separator style={{ height: 3, backgroundColor: "#c39e81" }} />
        {_day !== null && (
          <TouchableOpacity onPress={() => setDay(null)}>
            <Text style={{ color: "red", textAlign: "center", width: "100%" }}>
              Cancel the date filter
            </Text>
          </TouchableOpacity>
        )}
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {days.map((day) => (
              <TouchableOpacity onPress={() => setDay(day)}>
                <View style={day === _day ? styles.selected : null}>
                  {day > new Date().getDate() ? null : (
                    <Text
                      style={{
                        marginHorizontal: 10,
                        paddingVertical: 5,
                        color: day === _day ? "white" : "black",
                      }}
                    >
                      {day}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={styles.searchContainer}>
          <View style={styles.search1}>
            <SearchBarr query={query} setQuery={setQuery} />
          </View>
        </View>
        {daysList}
      </ScrollView>

      <Button onPress={scrolling} style={styles.scrollToTopButton}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: "700",
            textAlign: "center",
            width: "100%",
            marginTop: 5,
          }}
        >
          ^
        </Text>
      </Button>
    </>
  );
}

export default observer(ThisMonthInvoices);
const styles = StyleSheet.create({
  text: { textAlign: "center", width: "25%" },
  total: {
    textAlign: "center",
    fontSize: 12,
    // width: "33%",
    marginLeft: 10,
  },
  totalInvoices: {
    textAlign: "center",
    fontSize: 20,
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
  scrollToTopButton: {
    width: 50,
    justifyContent: "center",
    height: 50,
    borderRadius: 100,
    position: "absolute",
    bottom: 30,
    left: 15,
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#c39e81",
  },
  selected: {
    backgroundColor: "#c39e81",
  },
});
