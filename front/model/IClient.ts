import { IUser } from "src/pages/create-account";
import { IAddress } from "./IAddress";
import { IPhone } from "./IPhone";

export interface IClient {
  id?: bigint;
  name?: string;
  cpf?: string;
  user?: IUser;
  addresses?: IAddress[];
  phones?: IPhone[];
}