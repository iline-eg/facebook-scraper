import { injectable } from "inversify";
import Axios, { AxiosRequestConfig } from "axios";

@injectable()
export class HttpClientService {
  get<T>(url: string, config?: AxiosRequestConfig) {
    return Axios.get<T>(url, config);
  }
}
