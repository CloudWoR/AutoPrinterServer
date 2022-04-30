import request from './request';
import { AxiosResponse } from 'axios';
import type { AdminInfoData, LoginData, LoginParams, ResponseData } from '@render/types/request';

export const adminLoginApi =
  (data: LoginParams): Promise<ResponseData<LoginData>> => request.post('admin/login', data);

// 获取登录用户信息
export const adminInfoApi = (): Promise<ResponseData<AdminInfoData>> => request.get('/admin/info');
