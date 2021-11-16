import { ApiResponse } from "model/ApiResponse";
import { IProductCategory } from "model/IProductCategory";
import { API_URL } from "../../src/utils/constants";

export const saveProductCategory = async (category: IProductCategory, token: string): Promise<ApiResponse<IProductCategory>> => {

  const apiResponse: ApiResponse<IProductCategory> = {
    content: null,
    status: undefined
  }

  const res = await fetch(`${API_URL}/admin/product-categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
    body: JSON.stringify(category)
  })
    .then(res =>  {
      apiResponse.status = res.status;
      return res.json();
    })
    .catch(e => console.warn(e));

    apiResponse.entity = res;

  return apiResponse
}

export const updateProductCategory = async (updatedProductCategory: IProductCategory, token: string): Promise<ApiResponse<IProductCategory>> => {

  const apiResponse: ApiResponse<IProductCategory> = {
    content: null,
    status: undefined
  }

  const res = await fetch(`${API_URL}/admin/product-categories`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
    body: JSON.stringify(updatedProductCategory)
  })
    .then(res => {
      apiResponse.status = res.status;
      return res.json();
    })
    .catch(e => console.warn(e));

    apiResponse.entity = res;

  return apiResponse
}

export const getProductCategory = async (id: string, token: string): Promise<ApiResponse<IProductCategory>> => {

  const apiResponse: ApiResponse<IProductCategory> = {
    content: null,
    status: undefined
  }

  const res = await fetch(`${API_URL}/admin/product-categories/${id}`, {
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

export const deleteProductCategory = async (id: string, token: string): Promise<ApiResponse<IProductCategory>> => {

  const apiResponse: ApiResponse<IProductCategory> = {
    content: null,
    status: undefined
  }

  await fetch(`${API_URL}/admin/product-categories/${id}`, {
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