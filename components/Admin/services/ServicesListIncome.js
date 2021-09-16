import { Button, List, Spinner } from "native-base";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import invoiceStore from "../../../stores/invoiceStore";
import ServicesIncomeItem from "./ServicesIncomeItem";

const ServicesListIncome = () => {
  const [data, setData] = React.useState(10);
  const [services, setServices] = React.useState([]);
  const [OnRefresh, SetRefresh] = React.useState(false);

  useEffect(() => {
    SetRefresh(true);
    setTimeout(() => {
      const servicesBefor = [];
      const service = (servicess) => servicesBefor.push(servicess);
      invoiceStore.invoices
        .filter((invoice) => invoice.services)
        .map((invoice) => invoice.services)
        .map((sub) => sub.map(service));

      let listC = [];

      servicesBefor.forEach((service) => {
        const item = listC.find((_service) => _service.name === service.name);
        !item
          ? listC.push({
              name: service.name,
              count: service.OrderItem.quantity,
            })
          : (item.count = item.count + 1);
      });
      setServices(listC);
      setData(10);
      SetRefresh(false);
    }, 2000);
  }, []);

  const serviceList = services
    .sort((a, b) => b.count - a.count)
    .slice(0, data)
    .map((service) => <ServicesIncomeItem service={service} />);

  return (
    <ScrollView>
      {OnRefresh ? (
        <Spinner />
      ) : (
        <List style={{ justifyContent: "center", margin: 20 }}>
          <View
            style={{
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              margin: 20,
            }}
          >
            <Text>{services.length} Services</Text>
          </View>
          {serviceList}
          <Button
            disabled={services.length === serviceList.length ? true : false}
            onPress={() => setData(data + 10)}
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor:
                services.length === serviceList.length ? "gray" : "#c39e81",
            }}
          >
            <Text style={{ color: "white" }}>Load More ...</Text>
          </Button>
        </List>
      )}
    </ScrollView>
  );
};

export default ServicesListIncome;
