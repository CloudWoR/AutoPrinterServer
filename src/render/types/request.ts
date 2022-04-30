export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginData {
  token: string;
  tokenHead: string;
}

export interface AdminInfoData {
  icon: null;
  menus: unknown[];
  roles: string[];
  username: string;
}

export interface ResponseData<T = null> {
  code: number;
  message: string;
  data?: T | null;
}