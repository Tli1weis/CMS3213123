import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface HYInterceptors<T = AxiosResponse> {
  requestSuccessFn?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestFailFn?: (err: any) => any;
  responseSuccessFn?: (res: T) => T;
  responseFailFn?: (err: any) => any;
}

export interface HYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HYInterceptors<T>;
}
