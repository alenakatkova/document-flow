import { instance } from "./utils";

export const logUserIn = async (username : string, password : string) => {
  try {
    return await instance.post("/auth/login", {
      username,
      password,
    });
  } catch (e) {
    console.error(e);
  }
};

export const logUserOut = async () => {
  try {
    return await instance.delete("/auth/logout");
  } catch (e) {
    console.error(e);
  }
};
