import { PhoneType } from "./enum/PhoneType";
import { IClient } from "./IClient";

export interface IPhone {
  id?: bigint;
  areaCode?: string;
  number?: string;
  type?: PhoneType;
  mainPhone?: boolean;
  client?: IClient;
}