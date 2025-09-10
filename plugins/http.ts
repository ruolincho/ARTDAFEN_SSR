import type {AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig} from 'axios';
import axios from 'axios';
import {checkStatus, CODE_SUCCESS, CODE_TOKEN_FAIL} from '~/api/helper';
import type {IResultData} from "~/api/interface";
import { useRouter } from '#app'
import { useRuntimeConfig } from '#imports'
import {LOGIN_URL} from "~/config";
import {ElMessage} from "element-plus";
import type {HttpClient} from "~/api/interface";
import {useUserStore} from '~/stores/modules/user'
import {useCurrencyStore} from '~/stores/modules/currency'

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  loading?: boolean;
  cancel?: boolean;
}

export default defineNuxtPlugin((_nuxtApp) => {
  const config = useRuntimeConfig()

  const instance: AxiosInstance = axios.create({
    // 默认地址请求地址，可在 .env.** 文件中修改
    baseURL: config.public.apiBase,
    // 设置超时时间，默认超时时间60s
    timeout: Number(config.public.httpTimeout || 60000),
    // 跨域时候允许携带凭证
    withCredentials: true
  })

  /**
   * @description 请求拦截器
   * 客户端发送请求 -> [请求拦截器] -> 服务器
   * token校验(JWT) : 接受服务器返回的 token,存储到 vuex/pinia/本地储存当中
   */
  instance.interceptors.request.use(
      (config: CustomAxiosRequestConfig) => {
        const userStore = useUserStore()
        const currencyStore = useCurrencyStore()

        if (config.headers && typeof config.headers.set === 'function') {
          config.headers.set('Token', userStore.token);
          config.headers.set('X-Currency', currencyStore.currentCurrency);
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
  );

  /**
   * @description 响应拦截器
   *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
   */
  instance.interceptors.response.use(
      response => {
        const router = useRouter();
        const {data} = response;
        // 如果是文件流，直接返回整个响应对象
        if (response.config.responseType === 'blob') {
          return response;
        }

        // 无效Token
        if (data.status === CODE_TOKEN_FAIL) {
          router.replace(LOGIN_URL);
          ElMessage.error(data.message);
          return Promise.reject(data);
        }

        // 全局错误信息拦截（防止下载文件的时候返回数据流，没有 code 直接报错）
        if (data.status !== CODE_SUCCESS) {
          ElMessage.error({message: data.message || 'request error！', dangerouslyUseHTMLString: true});
          return Promise.reject(data);
        }
        // 成功请求（在页面上除非特殊情况，否则不用处理失败逻辑）
        return data;
      },
      async error => {
        const router = useRouter();
        const {response} = error;
        // 请求超时 && 网络错误单独判断，没有 response
        if (error.message.indexOf('timeout') !== -1) {
          ElMessage.error('Request timeout! Please try again later.');
        }
        if (error.message.indexOf('Network Error') !== -1) {
          ElMessage.error('Network error! Please try again later.');
        }
        // 根据服务器响应的错误状态码，做不同的处理
        if (response) {
          checkStatus(response?.status, response?.data?.message);
        }
        // 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
        if (!window.navigator.onLine) {
          router.replace('/500');
        }
        return Promise.reject(error);
      }
  );

  /**
   * @description 常用请求方法封装
   */
  const http: HttpClient = {
    get<T>(url: string, params: object = {}, _object = {}): Promise<IResultData<T>> {
      return instance.get(url, {params, ..._object});
    },
    post<T>(url: string, params: object = {}, _object = {}): Promise<IResultData<T>> {
      return instance.post(url, params, _object);
    },
    put<T>(url: string, params: object = {}, _object = {}): Promise<IResultData<T>> {
      return instance.put(url, params, _object);
    },
    delete<T>(url: string, data: object = {}, _object = {}): Promise<IResultData<T>> {
      return instance.delete(url, {data, ..._object});
    },
    download(url: string, params = {}, _object = {}): Promise<BlobPart> {
      return instance.post(url, params, {..._object, responseType: 'blob'});
    },
    template(url: string, params = {}, _object = {}): Promise<BlobPart> {
      return instance.get(url, {params, ..._object, responseType: 'blob'});
    },
    upload<T>(url: string, params = {}, _object: AxiosRequestConfig<{}> | undefined): Promise<IResultData<T>> {
      return instance.post(url, params, {
        ..._object,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    }
  }

  return { provide: { http: http } }
})
