import { ApiResponse } from "model/ApiResponse";
import { IClient } from "model/IClient";
import { API_URL } from "src/utils/constants";

export const updateClient = async (updatedClient: IClient, token: string): Promise<ApiResponse<IClient>> => {

 
  const apiResponse: ApiResponse<IClient> = {}

  const res = await fetch(`${API_URL}/client/me`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
    body: JSON.stringify(updatedClient)
  })
    .then(res => {
      apiResponse.status = res.status;
      return res.json();
    })
    .catch(e => console.warn(e));

    apiResponse.entity = res;

  return apiResponse
}

export const getClient = async (id: string, token: string): Promise<ApiResponse<IClient>> => {

 
  const apiResponse: ApiResponse<IClient> = {}

  const res = await fetch(`${API_URL}/client/me`, {
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