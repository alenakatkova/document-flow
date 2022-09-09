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

export const performDeleteRequest = async (url : string, id : number) => {
  try {
    return await instance.delete(url + id, {
      data: {
        id: id
      }
    });
  } catch (error) {
    console.error(error);
  }
};

export const performUpdateRequest = async <T>(url : string, data : T) => {
  try {
    return await instance.post(url, {
      newData: data
    });
  } catch (error) {
    console.error(error);
  }
};