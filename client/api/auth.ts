import { instance } from "./utils";

export const logUserIn = async (teamManagerName : string, password : string) => {
  try {
    return await instance.post("/teams/login", {
      teamManagerName,
      password,
    });
  } catch (e) {
    console.error(e);
  }
};

export const logUserOut = async () => {
  try {
    return await instance.delete("/teams/logout");
  } catch (e) {
    console.error(e);
  }
};
