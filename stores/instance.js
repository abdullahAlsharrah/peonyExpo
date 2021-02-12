import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000",
  // baseURL: "exp://192.168.1.65:19000:8000",
});

export default instance;
