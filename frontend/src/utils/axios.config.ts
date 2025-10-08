import axios from "axios";
import { baseUrl,} from "./constant";

const serverUrl = baseUrl

//basic axios instance 
const api = axios.create({
    baseURL:serverUrl,
    timeout: 1000,
    withCredentials:true,
})


interface ErrorResponse {
    message?:string,
    error?:string,
    statusCode?:number
}