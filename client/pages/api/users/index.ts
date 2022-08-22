import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../interfaces/user";
import { instance } from "../utils";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<User[]>
) {
  let users: User[] = [];
  try {
    const res = await instance.get("/users");
    console.log(res.data)
    users = res.data;
    return users;
  } catch (error) {
    console.log(error);
  }

  //res.status(200).json({ message: 'Hello from Next.js!' })
}