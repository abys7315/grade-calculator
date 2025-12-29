import axios from "axios";

const instance = axios.create({
  baseURL: "https://grade-calculator-pjm2.onrender.com/api" || "http://localhost:5000/api"  
});

instance.interceptors.request.use((config) => {
  return config;
});

export default instance;
