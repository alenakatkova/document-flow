export interface User {
  username: string;
  email: string;
  password: string;
  age: number;
}

export interface UserFromDB extends User {
  id: number;
  createdAt: string;
  updatedAt: string;
}
