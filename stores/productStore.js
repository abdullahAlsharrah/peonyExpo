import { makeAutoObservable, runInAction } from "mobx";
import instance from "./instance";

class ProductStore {
  products = [];
  loading = true;

  constructor() {
    makeAutoObservable(this);
  }

  fetchProducts = async () => {
    try {
      // runInAction(() => {
      const response = await instance.get("/products");
      this.products = response.data;
      runInAction(() => {
        this.loading = false;
      }); //   });
    } catch (error) {
      console.log("fetching problem", error);
    }
  };

  getProductById = (productId) => {
    runInAction(() => {
      this.products.find((product) => product.id === productId);
    });
  };
}
const productStore = new ProductStore();
productStore.fetchProducts();
export default productStore;
