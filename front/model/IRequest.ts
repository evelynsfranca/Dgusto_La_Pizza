import { PaymentMethod } from "./enum/PaymentMethod";
import { RequestStatus } from "./enum/RequestStatus";
import { IAddress } from "./IAddress";
import { IClient } from "./IClient";
import { IRequestItem } from "./IRequestItem";

export interface IRequest {
  id?: bigint;
  orderNumber?: string;
  orderDate?: string;
  deliveryFee?: number;
  status?: RequestStatus;
  paymentMethod?: PaymentMethod;
  totalValue?: number;
  delivery?: boolean;
  client?: IClient;
  address?: IAddress;
  requestItems?: IRequestItem[];
}