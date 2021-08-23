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
      runInAction(() => {
        this.costs = response.data;
        this.loading = false;
      }); //   });
    } catch (error) {
      console.log("fetching problem", error);
    }
  };

  getCostById = (costId) => {
    try {
      runInAction(() => {
        this.costs.find((cost) => cost.id === costId);
      });
    } catch (error) {
      console.log(error);
    }
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

  deleteCost = async (costId) => {
    try {
      await instance.delete(`/costs/${costId}`);
      runInAction(() => {
        this.costs = this.costs.filter((cost) => cost.id !== costId);
      });
    } catch (error) {
      console.log(error);
    }
  };
}
const costStore = new CostStore();
costStore.fetchCosts();
export default costStore;
