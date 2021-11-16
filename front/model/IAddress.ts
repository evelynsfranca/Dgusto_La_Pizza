import { IClient } from "./IClient";

export interface IAddress {
  id?: bigint;
  zipCode?: string;
  street?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  country?: string;
  reference?: string;
  mainAddress?: boolean;
  client?: IClient;
}