import { ApiResponse } from "model/ApiResponse";
import { IProduct } from "model/IProduct";
import { API_URL } from "src/utils/constants";

export const getAllProducts = async (): Promise<ApiResponse<IProduct>> => {

  const apiResponse: ApiResponse<IProduct> = {
    content: null,
    status: undefined
  }

  const res = await fetch(`${API_URL}/products`, {
    method: "GET"
  })
  .then(res => {
    apiResponse.status = res.status;
    return res.json();
  })
  .catch(e => console.warn(e));

  apiResponse.content = res;
  
  return apiResponse
}