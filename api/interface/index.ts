import type { AxiosRequestConfig } from 'axios'

// 请求响应参数（不包含data）
export interface IResult {
  code: string;
  message: string;
}

// 请求响应参数（包含data）
export interface IResultData<T = any> extends IResult {
  data: T;
  status: number;
}

export interface IPage<T = any> {
  /*当前页数*/
  current: number
  /*总页码*/
  pages: number
  /*列表数据*/
  records: T[]
  /*页数*/
  size: number
  /*数据条数*/
  total: number
}

export interface IPageQuery {
  page: number;
  size: number;
}

export interface HttpClient {
  get<T>(url: string, params?: object, _object?: object): Promise<IResultData<T>>
  post<T>(url: string, params?: object, _object?: object): Promise<IResultData<T>>
  put<T>(url: string, params?: object, _object?: object): Promise<IResultData<T>>
  delete<T>(url: string, data?: object, _object?: object): Promise<IResultData<T>>
  download(url: string, params?: object, _object?: object): Promise<BlobPart>
  template(url: string, params?: object, _object?: object): Promise<BlobPart>
  upload<T = any>(url: string, params?: object, _object?: AxiosRequestConfig<{}> | undefined): Promise<IResultData<T>>
}