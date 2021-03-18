import { makeAutoObservable, runInAction } from "mobx";
import instance from "./instance";

class CostStore {
  costs = [];
  loading = true;

  constructor() {
    makeAutoObservable(this);
  }

  fetchCosts = async () => {
    try {
      // runInAction(() => {
      const response = await instance.get("/costs");
      this.costs = response.data;
      runInAction(() => {
        this.loading = false;
      }); //   });
    } catch (error) {
      console.log("fetching problem", error);
    }
  };

  getCostById = (costId) => {
    runInAction(() => {
      this.costs.find((cost) => cost.id === costId);
    });
  };
  addCost = async (newItem) => {
    try {
      const formData = new FormData();
      for (const key in newItem) formData.append(key, newItem[key]);
      const res = await instance.post("/costs", formData);
      runInAction(() => {
        this.costs.push(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };
}
const costStore = new CostStore();
costStore.fetchCosts();
export default costStore;
