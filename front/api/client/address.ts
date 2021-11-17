import { ApiResponse } from "model/ApiResponse";
import { IAddress } from "model/IAddress";
import { API_URL } from "src/utils/constants";

export const saveAddress = async (address: IAddress, token: string): Promise<ApiResponse<IAddress>> => {

  const apiResponse: ApiResponse<IAddress> = {
    content: null,
    status: undefined
  }

  const res = await fetch(`${API_URL}/client/addresses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
    body: JSON.stringify(address)
  })
    .then(res =>  {
      apiResponse.status = res.status;
      return res.json();
    })
    .catch(e => console.warn(e));

    apiResponse.entity = res;

  return apiResponse
}

export const updateAddress = async (updatedAddress: IAddress, token: string): Promise<ApiResponse<IAddress>> => {

  const apiResponse: ApiResponse<IAddress> = {
    content: null,
    status: undefined
  }

  const res = await fetch(`${API_URL}/client/addresses`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
    body: JSON.stringify(updatedAddress)
  })
    .then(res => {
      apiResponse.status = res.status;
      return res.json();
    })
    .catch(e => console.warn(e));

    apiResponse.entity = res;

  return apiResponse
}

export const getAddress = async (id: string, token: string): Promise<ApiResponse<IAddress>> => {

  const apiResponse: ApiResponse<IAddress> = {
    content: null,
    status: undefined
  }

  const res = await fetch(`${API_URL}/client/addresses/${id}`, {
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

export const getAllAddresses = async (token: string): Promise<ApiResponse<IAddress>> => {

  const apiResponse: ApiResponse<IAddress> = {
    content: null,
    status: undefined
  }

  const res = await fetch(`${API_URL}/client/addresses`, {
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

export const deleteAddress = async (id: string, token: string): Promise<ApiResponse<IAddress>> => {

  const apiResponse: ApiResponse<IAddress> = {
    content: null,
    status: undefined
  }

  await fetch(`${API_URL}/client/addresses/${id}`, {
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