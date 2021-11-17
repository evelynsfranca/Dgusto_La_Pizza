import { ApiResponse } from "model/ApiResponse";
import { IPhone } from "model/IPhone";
import { API_URL } from "src/utils/constants";

export const savePhone = async (phone: IPhone, token: string): Promise<ApiResponse<IPhone>> => {

  const apiResponse: ApiResponse<IPhone> = {
    content: null,
    status: undefined
  }

  const res = await fetch(`${API_URL}/client/phones`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
    body: JSON.stringify(phone)
  })
    .then(res =>  {
      apiResponse.status = res.status;
      return res.json();
    })
    .catch(e => console.warn(e));

    apiResponse.entity = res;

  return apiResponse
}

export const updatePhone = async (updatedPhone: IPhone, token: string): Promise<ApiResponse<IPhone>> => {

  const apiResponse: ApiResponse<IPhone> = {
    content: null,
    status: undefined
  }

  const res = await fetch(`${API_URL}/client/phones`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
    body: JSON.stringify(updatedPhone)
  })
    .then(res => {
      apiResponse.status = res.status;
      return res.json();
    })
    .catch(e => console.warn(e));

    apiResponse.entity = res;

  return apiResponse
}

export const getPhone = async (id: string, token: string): Promise<ApiResponse<IPhone>> => {

  const apiResponse: ApiResponse<IPhone> = {
    content: null,
    status: undefined
  }

  const res = await fetch(`${API_URL}/client/phones/${id}`, {
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

export const getAllPhones = async (token: string): Promise<ApiResponse<IPhone>> => {

  const apiResponse: ApiResponse<IPhone> = {
    content: null,
    status: undefined
  }

  const res = await fetch(`${API_URL}/client/phones`, {
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

export const deletePhone = async (id: string, token: string): Promise<ApiResponse<IPhone>> => {

  const apiResponse: ApiResponse<IPhone> = {
    content: null,
    status: undefined
  }

  await fetch(`${API_URL}/client/phones/${id}`, {
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