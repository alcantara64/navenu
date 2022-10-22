/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://github.com/infinitered/ignite/blob/master/docs/Backend-API-Integration.md)
 * documentation for more details.
 */
import {
  ApiResponse,
  ApisauceInstance,
  create,
} from "apisauce"
import Config from "../../config"
import type {
  ApiConfig,
  ApiFeedResponse,
  LoginResponse,
} from "./api.types"
import {_rootStore } from "../../models"
import { getSnapshot } from "mobx-state-tree"
import { GeneralApiProblem, getGeneralApiProblem } from "./apiProblem"
import { AxiosRequestConfig } from "axios"

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig

  /**
   * Set up our API instance. Keep this lightweight!
   */

  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config;
   const rootStore = _rootStore && getSnapshot(_rootStore); 
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
        Authorization: `${rootStore?.authenticationStore?.authToken}`
        
      },
    })

   this.apisauce.addRequestTransform((request) =>{
    request.headers.lat = rootStore?.authenticationStore?.latitude;
    request.headers.lng = rootStore?.authenticationStore?.longitude;
    request.headers.Authorization = rootStore?.authenticationStore?.authToken; 
    console.log('req', request);
   })
  }
  


  async login(payload:{password:string, email:string}):Promise<{ kind: "ok"; token:string } | GeneralApiProblem>{
    
    const response: ApiResponse<LoginResponse> = await this.apisauce.post(
      `/Authentication/key`,
      payload
    )
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    const rawData = response.data;

   return {kind: 'ok', token: rawData.token}
  }

  async get(url:string, params?:Record<string, unknown>, axiosConfig?:AxiosRequestConfig){
   return this.apisauce.get<any>(url, params, axiosConfig);
  }

  async post(url:string, payload:Record<string, unknown>, axiosConfig?:AxiosRequestConfig){
    return this.apisauce.post(url, payload, axiosConfig);
   }
  
   async put(url:string, payload:Record<string, unknown>, axiosConfig?:AxiosRequestConfig){
    return this.apisauce.put(url, payload, axiosConfig);
   }

   async delete(url:string, payload?:Record<string, unknown>, axiosConfig?:AxiosRequestConfig){
    return this.apisauce.delete(url, payload, axiosConfig);
   }
}

// Singleton instance of the API for convenience
export const api = new Api()
