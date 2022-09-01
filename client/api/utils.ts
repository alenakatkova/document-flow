import axios from "axios";

const baseUrl = "http://localhost:8080/api";

export const instance = axios.create({
  withCredentials: true,
  baseURL: baseUrl,
});

export const performPostRequest = async <T>(url : string, body : T) => {
  try {
    return await instance.post(url, body);
  } catch (error) {
    console.error(error);
  }
};