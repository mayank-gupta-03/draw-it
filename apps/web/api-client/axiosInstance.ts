import { API_BASE_URL, HOST_URL } from "@repo/common/config";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${HOST_URL}${API_BASE_URL}`,
});

axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default axiosInstance;
