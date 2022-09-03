import { instance } from "./utils";

export const logUserIn = async (teamManagerName : string, password : string) => {
  try {
    return await instance.post("/auth/login", {
      teamManagerName,
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
