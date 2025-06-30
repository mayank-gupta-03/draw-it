import axios from "axios";
import { API_BASE_URL, HOST_URL } from "@repo/common/config";

const axiosInstance = axios.create({
  baseURL: `${HOST_URL}${API_BASE_URL}`,
  withCredentials: true,
});

export default axiosInstance;
