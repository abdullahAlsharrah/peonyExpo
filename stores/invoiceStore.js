import { makeAutoObservable, runInAction } from "mobx";
import instance from "./instance";

class InvoiceStore {
  invoices = [];
  items = [];
  loading = true;

  constructor() {
    makeAutoObservable(this);
  }

  addItemToInvoice = async (newItem) => {
    const foundItem = this.items.find(
      (item) => item.serviceId === newItem.serviceId
    );
    if (foundItem) null;
    else
      runInAction(() => {
        this.items.push(newItem);
      });
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
  cancelCheckout = async () => {
    this.items = [];
  };

  fetchInvoices = async () => {
    try {
      const response = await instance.get("/invoices");
      runInAction(() => {
        this.loading = false;
        this.invoices = response.data;
      });
    } catch (error) {
      console.log("fetching invoices", error);
    }
  };

  checkout = async () => {
    try {
      await instance.post("/invoices", this.items);
      runInAction(() => {
        this.items = [];
        this.fetchInvoices();
      });
      alert("You have successfully checked out.");
    } catch (error) {
      console.log(error);
    }
  };
}
const invoiceStore = new InvoiceStore();
invoiceStore.fetchInvoices();
export default invoiceStore;
