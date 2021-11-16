import { ApiResponse } from 'model/ApiResponse';
import { IProduct } from "../../model/IProduct";
import { IProductCategory } from "../../model/IProductCategory";
import { IProductType } from "../../model/IProductType";
import { API_URL } from "../../src/utils/constants";


export const saveProduct = async (product: IProduct, token: string): Promise<ApiResponse<IProduct>> => {

  const apiResponse: ApiResponse<IProduct> = {
    content: null,
    status: undefined
  }

  const res = await fetch(`${API_URL}/admin/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
    body: JSON.stringify(product)
  })
    .then(res =>  {
      apiResponse.status = res.status;
      return res.json();
    })
    .catch(e => console.warn(e));

    apiResponse.entity = res;

  return apiResponse
}

export const updateProduct = async (updatedProduct: IProduct, token: string): Promise<ApiResponse<IProduct>> => {

  const apiResponse: ApiResponse<IProduct> = {
    content: null,
    status: undefined
  }

  const res = await fetch(`${API_URL}/admin/products`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
    body: JSON.stringify(updatedProduct)
  })
    .then(res => {
      apiResponse.status = res.status;
      return res.json();
    })
    .catch(e => console.warn(e));

    apiResponse.entity = res;

  return apiResponse
}

export const getProduct = async (id: string, token: string): Promise<ApiResponse<IProduct>> => {

  const apiResponse: ApiResponse<IProduct> = {
    content: null,
    status: undefined
  }

  const res = await fetch(`${API_URL}/admin/products/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    }
  })
  .then(res => {
    apiResponse.status = res.status;
    return res.json();
  })
  .catch(e => console.warn(e));
  
  apiResponse.entity = res;

  return apiResponse
}

export const deleteProduct = async (id: string, token: string): Promise<ApiResponse<IProduct>> => {

  const apiResponse: ApiResponse<IProduct> = {
    content: null,
    status: undefined
  }

  await fetch(`${API_URL}/admin/products/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    }
  })
  .then(res => {
    apiResponse.status = res.status;
    return res.json();
  })
  .catch(e => console.warn(e));
  
  return apiResponse
}

export const getAllProducts = async (token: string): Promise<ApiResponse<IProduct>> => {

  const apiResponse: ApiResponse<IProduct> = {
    content: null,
    status: undefined
  }

  const res = await fetch(`${API_URL}/admin/products`, {
    method: "GET",
    headers: {
      "Authorization": token
    }
  })
  .then(res => {
    apiResponse.status = res.status;
    return res.json();
  })
  .catch(e => console.warn(e));

  apiResponse.content = res;
  
  return apiResponse
}

export const getAllProductTypes = async (token: string): Promise<ApiResponse<IProductType>> => {

  const apiResponse: ApiResponse<IProductType> = {
    content: null,
    status: undefined
  }

  const res = await fetch(`${API_URL}/admin/product-types`, {
    method: "GET",
    headers: {
      "Authorization": token
    }
  })
  .then(res => {
    apiResponse.status = res.status;
    return res.json();
  })
  .catch(e => console.warn(e));

  apiResponse.content = res;
    
  return apiResponse
}

export const getAllProductCategories = async (token: string): Promise<ApiResponse<IProductCategory>> => {

  const apiResponse: ApiResponse<IProductCategory> = {
    content: null,
    status: undefined
  }

  const res = await fetch(`${API_URL}/admin/product-categories`, {
    method: "GET",
    headers: {
      "Authorization": token
    }
  })
  .then(res => {
    apiResponse.status = res.status;
    return res.json();
  })
  .catch(e => console.warn(e));

  apiResponse.content = res;
  
  return apiResponse
}