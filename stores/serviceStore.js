import { makeAutoObservable, runInAction } from "mobx";
import instance from "./instance";

class ServiceStore {
  services = [];
  loading = true;

  constructor() {
    makeAutoObservable(this);
  }

  fetchServices = async () => {
    try {
      // runInAction(() => {
      const response = await instance.get("/services");
      this.services = response.data;
      runInAction(() => {
        this.loading = false;
      }); //   });
    } catch (error) {
      console.log("fetching problem", error);
    }
  };

  getServiceById = (serviceId) => {
    runInAction(() => {
      this.services.find((service) => service.id === serviceId);
    });
  };

  AddService = async (newService) => {
    const res = await instance.post("/services", newService);
    runInAction(() => {
      this.services.push(res.data);
    });
  };
}
const serviceStore = new ServiceStore();
serviceStore.fetchServices();
export default serviceStore;
