import { makeAutoObservable } from "mobx";
import AsyncStorage from "@react-native-community/async-storage";
import instance from "./instance";

class InvoiceStore {
  items = [];
  invoices = [];

  constructor() {
    makeAutoObservable(this);
  }
  // fetchInvoice = async () => {
  //   const items = await AsyncStorage.getItem("myInvoice");
  //   this.items = items ? JSON.parse(items) : [];
  // };

  addItemToInvoice = async (newItem) => {
    const foundItem = this.items.find(
      (item) => item.serviceId === newItem.serviceId
    );
    if (foundItem) null;
    else this.items.push(newItem);
  };
  get totalPrice() {
    let total = 0;
    this.items.forEach((item) => {
      total += item.price;
    });

    return total;
  }
  removeItemFromInvoice = async (itemId) => {
    this.items = this.items.filter((item) => item.serviceId !== itemId);
  };
  canlcelCheckout = async () => {
    this.items = [];
  };

  fetchInvoices = async () => {
    try {
      const response = await instance.get("/invoices");
      this.invoices = response.data;
    } catch (error) {
      console.log("fetching invoices", error);
    }
  };

  checkout = async () => {
    try {
      const res = await instance.post("/checkout", this.items);
      this.items = [];
      alert("You have successfully checked out.");
    } catch (error) {
      console.log(error);
    }
  };
}
const invoiceStore = new InvoiceStore();
invoiceStore.fetchInvoices();
export default invoiceStore;
