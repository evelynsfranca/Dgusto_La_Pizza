import { IProductCategory } from "./IProductCategory";
import { IProductType } from "./IProductType";

export interface IProduct {
  id?: bigint;
  name?: string;
  description?: string;
  unitValue?: number;
  stockQuantity?: number;
  productType?: IProductType;
  productCategory?: IProductCategory;
  createdDate?: Date;
  createdBy?: string;
}

export const defaultProduct: IProduct = {
  id: undefined,
  name: '',
  description: '',
  unitValue: undefined,
  stockQuantity: undefined,
  productType: undefined,
  productCategory: undefined,
  createdDate: undefined,
  createdBy: '',
}