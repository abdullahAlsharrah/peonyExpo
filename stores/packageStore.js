import { makeAutoObservable, runInAction } from "mobx";
import { Alert } from "react-native";
import instance from "./instance";

class PackageStore {
  apackages = [];
  loading = true;
  constructor() {
    makeAutoObservable(this);
  }
  fetchPackages = async () => {
    try {
      const response = await instance.get("/packages");
      this.apackages = response.data;
      runInAction(() => {
        this.loading = false;
      });
    } catch (error) {
      console.log("fetching problem", error);
    }
  };
  getPackageByserviceId = (serviceId) => {
    runInAction(() => {
      this.apackages.find((apackage) => apackage.serviceId === serviceId);
    });
  };
  // update apackage !!!!!!
  updatePackage = async (apackageId) => {
    try {
      const apackage = this.apackages.find(
        (apackage) => apackage.id === apackageId
      );
      if (apackage.time > 0) {
        await instance.put(`/apackages/${apackageId}`);
        apackage.time - 1;
        this.apackages.push(apackage);
      } else {
        Alert.alert("Sorry this Package Has Finished!!");
      }
    } catch (error) {
      console.log("updating apackage problem", error);
    }
  };
  // add phone number to the apackage!!
  AddPackage = async (serviceId, newPackage) => {
    const res = await instance.post(`/packages/${serviceId}`, newPackage);
    runInAction(() => {
      this.apackages.push(res.data);
    });
  };
}
const apackageStore = new PackageStore();
apackageStore.fetchPackages();
export default apackageStore;
