import { makeAutoObservable, runInAction } from "mobx";
import instance from "./instance";

class OfferStore {
  offers = [];
  items = [];
  name = "";
  loading = true;

  constructor() {
    makeAutoObservable(this);
  }
  addItemToOffer = async (item) => {
    runInAction(() => {
      this.items = item;
    });
  };
  get totalPrice() {
    let total = 0;
    this.items.forEach((item) => {
      total += 0.85 * item.price;
    });
    return total;
  }
  removeItemFromOffer = async (itemId) => {
    this.items = this.items.filter(
      (item) => item.serviceId !== itemId
      // &&
      // item.apackageId !== itemId &&
      // item.productId !== itemId
    );
  };
  cancelList = async () => {
    this.items = [];
    this.price = 0;
  };

  fetchOffers = async () => {
    try {
      const response = await instance.get("/offers");
      runInAction(() => {
        this.offers = response.data;
        this.loading = false;
      });
    } catch (error) {
      console.log("fetching offers", error);
    }
  };

  addOffer = async (services, name, price) => {
    try {
      const offer = { items: services, name, price };
      await instance.post("/offers", offer);
      runInAction(() => {
        this.items = [];
        this.price = 0;
        this.name = "";
        this.fetchOffers();
      });
      alert("You have successfully add an offer.");
    } catch (error) {
      console.log(error);
    }
  };
}
const offerStore = new OfferStore();
offerStore.fetchOffers();
export default offerStore;
