import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.1.65.:8080",
  // baseURL: "https://peony-api-nr5b9.ondigitalocean.app",
});

export default instance;
