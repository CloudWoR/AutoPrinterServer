export interface State {
  userinfo: Userinfo | undefined;
};

export interface Userinfo {
  icon: string;
  roles: string[];
  menus: Menus[];
  username: string;
}

export interface Menus {
  id: number,
  level: number,
  name: string;
  parentId: number;
  sort: number,
  title: string;
  icon: string;
  hidden: number;
  createTime: string;
  children?: Menus[];
}