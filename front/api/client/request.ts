import { ApiResponse } from "model/ApiResponse";
import { IRequest } from "model/IRequest";
import { API_URL } from "src/utils/constants";

export const saveRequest = async (request: IRequest, token: string): Promise<ApiResponse<IRequest>> => {

  const apiResponse: ApiResponse<IRequest> = {
    content: null,
    status: undefined
  }

  const res = await fetch(`${API_URL}/client/requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
    body: JSON.stringify(request)
  })
    .then(res =>  {
      apiResponse.status = res.status;
      return res.json();
    })
    .catch(e => console.warn(e));

    apiResponse.entity = res;

  return apiResponse
}

export const updateRequest = async (updatedRequest: IRequest, token: string): Promise<ApiResponse<IRequest>> => {

  const apiResponse: ApiResponse<IRequest> = {
    content: null,
    status: undefined
  }

  const res = await fetch(`${API_URL}/client/requests`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
    body: JSON.stringify(updatedRequest)
  })
    .then(res => {
      apiResponse.status = res.status;
      return res.json();
    })
    .catch(e => console.warn(e));

    apiResponse.entity = res;

  return apiResponse
}

export const getRequest = async (id: string, token: string): Promise<ApiResponse<IRequest>> => {

  const apiResponse: ApiResponse<IRequest> = {
    content: null,
    status: undefined
  }

  const res = await fetch(`${API_URL}/client/requests/${id}`, {
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

export const getAllRequests = async (token: string): Promise<ApiResponse<IRequest>> => {

  const apiResponse: ApiResponse<IRequest> = {
    content: null,
    status: undefined
  }

  const res = await fetch(`${API_URL}/client/requests`, {
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
