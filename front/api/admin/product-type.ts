import { ApiResponse } from "model/ApiResponse";
import { IProductType } from "model/IProductType";
import { API_URL } from "../../src/utils/constants";

export const saveProductType = async (type: IProductType, token: string): Promise<ApiResponse<IProductType>> => {

  const apiResponse: ApiResponse<IProductType> = {
    content: null,
    status: undefined
  }

  const res = await fetch(`${API_URL}/admin/product-types`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
    body: JSON.stringify(type)
  })
    .then(res =>  {
      apiResponse.status = res.status;
      return res.json();
    })
    .catch(e => console.warn(e));

    apiResponse.entity = res;

  return apiResponse
}

export const updateProductType = async (updatedProductType: IProductType, token: string): Promise<ApiResponse<IProductType>> => {

  const apiResponse: ApiResponse<IProductType> = {
    content: null,
    status: undefined
  }

  const res = await fetch(`${API_URL}/admin/product-types`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
    body: JSON.stringify(updatedProductType)
  })
    .then(res => {
      apiResponse.status = res.status;
      return res.json();
    })
    .catch(e => console.warn(e));

    apiResponse.entity = res;

  return apiResponse
}

export const getProductType = async (id: string, token: string): Promise<ApiResponse<IProductType>> => {

  const apiResponse: ApiResponse<IProductType> = {
    content: null,
    status: undefined
  }

  const res = await fetch(`${API_URL}/admin/product-types/${id}`, {
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

export const deleteProductType = async (id: string, token: string): Promise<ApiResponse<IProductType>> => {

  const apiResponse: ApiResponse<IProductType> = {
    content: null,
    status: undefined
  }

  await fetch(`${API_URL}/admin/product-types/${id}`, {
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