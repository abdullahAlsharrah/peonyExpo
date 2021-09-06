import axios from "axios";

const instance = axios.create({
  // baseURL: "http://192.168.43.21:8080",
  // baseURL: "http://localhost:8080",
  // baseURL: "http://192.168.8.129:8080",
  baseURL: "https://peony-api-nr5b9.ondigitalocean.app",
});

export default instance;
