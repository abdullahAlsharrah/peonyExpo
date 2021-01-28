const { makeAutoObservable, runInAction } = require("mobx");

class RecieptStore {
  items = [];

  constructor() {
    makeAutoObservable(this);
  }

  addItemToCart = (newItem) => {
    runInAction(() => {
      const foundItem = this.items.find((item) => item.id === newItem.id);
      if (foundItem) null;
      else this.items.push(newItem);
    });
  };
  get totalPrice() {
    let total = 0;
    this.items.forEach((item) => {
      total += item.price;
    });
    return total;
  }
}
const recieptStore = new RecieptStore();
export default recieptStore;
