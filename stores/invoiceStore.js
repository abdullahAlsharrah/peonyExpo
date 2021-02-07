import { makeAutoObservable } from "mobx";
// import AsyncStorage from "@react-native-community/async-storage";
import instance from "./instance";

class InvoiceStore {
  items = [];

  constructor() {
    makeAutoObservable(this);
  }
  //   fetchInvoice = async () => {
  //     const items = await AsyncStorage.getItem("myInvoice");
  //     this.items = items ? JSON.parse(items) : [];
  //   };

  addItemToInvoice = async (newItem) => {
    const foundItem = this.items.find(
      (item) => item.serviceId === newItem.serviceId
    );
    if (foundItem) null;
    else this.items.push(newItem);
    // await AsyncStorage.setItem("myInvoice", JSON.stringify(this.items));
    // console.log(this.items);
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
// invoiceStore.fetchInvoice();
export default invoiceStore;
