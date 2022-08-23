export interface User {
  id: number,
  username: string;
  email: string;
  age: number;
  password: string;
}

export interface NewUserData {
  username: string;
  email: string;
  password: string;
  age?: number;
}