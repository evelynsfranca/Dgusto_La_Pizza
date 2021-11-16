import { ApiResponse } from "model/ApiResponse";
import { IUser } from "../../model/IUser";
import { API_URL } from "../../src/utils/constants";

export const saveUser = async (user: IUser, token: string): Promise<ApiResponse<IUser>> => {

 
  const apiResponse: ApiResponse<IUser> = {}

  await fetch(`${API_URL}/admin/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
    body: JSON.stringify(user)
  })
    .then(res => {
      apiResponse.entity = <IUser>res.json();
      apiResponse.status = res.status;
      return res;
    }).catch(e => console.warn(e));

  return apiResponse
}

export const updateUser = async (updatedUser: IUser, token: string): Promise<ApiResponse<IUser>> => {

 
  const apiResponse: ApiResponse<IUser> = {}

  const res = await fetch(`${API_URL}/admin/users`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
    body: JSON.stringify(updatedUser)
  })
    .then(res => {
      apiResponse.status = res.status;
      return res.json();
    })
    .catch(e => console.warn(e));

    apiResponse.entity = res;

  return apiResponse
}

export const getUser = async (id: string, token: string): Promise<ApiResponse<IUser>> => {

 
  const apiResponse: ApiResponse<IUser> = {}

  const res = await fetch(`${API_URL}/admin/users/${id}`, {
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

export const getAllUsers = async (token: string): Promise<ApiResponse<IUser>> => {
  const apiResponse: ApiResponse<IUser> = {}

  const res = await fetch(`${API_URL}/admin/users`, {
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

export const deleteUser = async (id: string, token: string): Promise<ApiResponse<void | number>> => {

  const apiResponse: ApiResponse<void | number> = {}

  await fetch(`${API_URL}/admin/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    }
  })
  .then(res => {
    apiResponse.status = res.status;
    return res;
  })
  .catch(e => console.warn(e));
  
  return apiResponse
}