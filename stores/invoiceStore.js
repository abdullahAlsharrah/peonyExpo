import { makeAutoObservable, runInAction } from "mobx";
import instance from "./instance";

class InvoiceStore {
  invoices = [];
  items = [];
  loading = true;
  discount = 0;

  constructor() {
    makeAutoObservable(this);
  }
  setDiscount = async (discount) => {
    runInAction(() => {
      this.discount = discount;
    });
  };
  addItemToInvoice = async (newItem) => {
    const foundItem = this.items.find(
      (item) =>
        item.serviceId === newItem.serviceId &&
        item.offerId === newItem.offerId &&
        item.productId === newItem.productId &&
        item.apackageId === newItem.apackageId
    );
    if (foundItem) {
      (foundItem.quantity = foundItem.quantity + 1),
        (foundItem.price =
          (foundItem.price / (foundItem.quantity - 1)) * foundItem.quantity);
    } else {
      runInAction(() => {
        this.items.push(newItem);
      });
    }
  };
  get totalPrice() {
    let total = 0;
    this.items.forEach((item) => {
      total += item.price;
    });

    return total - total * this.discount;
  }

  removeItemFromInvoice = async (itemId) => {
    runInAction(() => {
      this.items = this.items.filter(
        (item) =>
          `s${item.serviceId}` !== itemId &&
          `p${item.apackageId}` !== itemId &&
          `pr${item.productId}` !== itemId &&
          `o${item.offerId}` !== itemId
      );
    });
  };
  cancelCheckout = async () => {
    runInAction(() => {
      this.items = [];
    });
  };

  fetchInvoices = async () => {
    try {
      const response = await instance.get("/invoices");
      runInAction(() => {
        this.invoices = response.data;
        this.loading = false;
      });
    } catch (error) {
      console.log("fetching invoices", error);
    }
  };

  checkout = async (phoneNumber) => {
    try {
      const invoice = {
        items: this.items,
        price: this.totalPrice,
        phoneNumber: phoneNumber,
        discount: this.discount,
      };
      await instance.post("/invoices", invoice);
      runInAction(() => {
        this.items = [];
        this.phoneNumber = 0;
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
