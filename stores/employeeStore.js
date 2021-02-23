import { makeAutoObservable, runInAction } from "mobx";
import instance from "./instance";

class EmployeeStore {
  employees = [];
  loading = true;

  constructor() {
    makeAutoObservable(this);
  }

  fetchEmployees = async () => {
    try {
      // runInAction(() => {
      const response = await instance.get("/employees");
      this.employees = response.data;
      runInAction(() => {
        this.loading = false;
      }); //   });
    } catch (error) {
      console.log("fetching problem", error);
    }
  };

  getEmployeeById = (employeeId) => {
    runInAction(() => {
      this.employees.find((employee) => employee.id === employeeId);
    });
  };
  addEmployee = async (newItem) => {
    try {
      const formData = new FormData();
      for (const key in newItem) formData.append(key, newItem[key]);
      const res = await instance.post("/employees", formData);
      runInAction(() => {
        this.employees.push(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  updateEmployee = async (updatedEmployee) => {
    try {
      await instance.put(`/employees/${updatedEmployee.id}`, updatedEmployee);
      const employee = this.employees.find(
        (_employee) => _employee.id === updatedEmployee.id
      );
      for (const key in updatedEmployee) employee[key] = updatedEmployee[key];
    } catch (error) {
      console.log(error);
    }
  };
}
const employeeStore = new EmployeeStore();
employeeStore.fetchEmployees();
export default employeeStore;
