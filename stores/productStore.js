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
      runInAction(() => {
        this.products = response.data;
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
  addProduct = async (newItem) => {
    try {
      const formData = new FormData();
      for (const key in newItem) formData.append(key, newItem[key]);
      const res = await instance.post("/products", formData);
      runInAction(() => {
        this.products.push(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };
}
const productStore = new ProductStore();
productStore.fetchProducts();
export default productStore;
