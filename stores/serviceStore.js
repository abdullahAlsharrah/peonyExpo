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
    console.log("hello", this.getServiceById(11));
    console.log(
      "hi",
      this.services.find((service) => service.id === 11)
    );
  };

  getServiceById = (serviceId) => {
    runInAction(() => {
      this.services.find((service) => service.id === serviceId);
    });
  };
}
const serviceStore = new ServiceStore();
serviceStore.fetchServices();
export default serviceStore;
