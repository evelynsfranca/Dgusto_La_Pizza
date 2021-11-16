import { UserAuthorities } from "./UserAuthorities";

export interface IUser {
  id?: bigint;
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  authorities?: Array<UserAuthorities>;
}

export const defaultUser: IUser = {
  name: '',
  username: '',
  email: '',
  password: '',
  authorities: []
}