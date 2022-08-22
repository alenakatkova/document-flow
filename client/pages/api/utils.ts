import axios from "axios";

const baseUrl = "http://localhost:8080/api";

export const instance = axios.create({
  withCredentials: true,
  baseURL: baseUrl,
});