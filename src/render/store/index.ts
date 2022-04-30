import { createStore, Store } from 'vuex';
import { InjectionKey } from 'vue';
import router from '@render/router';
import { Router, RouteRecordRaw } from 'vue-router';
import type { Menus, State, Userinfo } from '@render/types/common';
import { adminInfoApi } from '@render/request/api';

function setMenusObject(menus: Menus[], parintId = 0): Menus[] {
  const children: Menus[] = [];
  const baseMenus = menus.filter((menu) => menu.parentId === parintId);
  if (baseMenus) {
    baseMenus.forEach(menu => {
      menu.children = menu.children || [];
      children.push(menu);
    })
  }
  for (const menu of menus) {
    for (const child of children) {
      if (child.id === menu.parentId) {
        child.children = setMenusObject(menus, menu.parentId);
      }
    } 
  }
  return children;
}

const store = createStore<State>({
  state: {
    userinfo: undefined,
  },
  getters: {
    // 当state的值不能被直接使用时，使用getters，类似于计算属性。
    GET_MENU(state) {
      const menus = state.userinfo?.menus;
      const menusObject = menus ? setMenusObject(menus) : [];
      return menusObject;
    }
  },
  mutations: {
    SAVE_USERINFO(state, userinfo: Userinfo) {
      state.userinfo = userinfo;
      const menus  = userinfo.menus;
      const menusObject = menus ? setMenusObject(menus) : [];
      router.addRoute(homepage);
      if (menusObject) {
        const routers = setRouters(menusObject, 'homepage/homepage.vue');
        for (const routerRecordRaw of routers) {
          router.addRoute(routerRecordRaw);
        }
      }
    },
  },
  actions: {
    FETCH_USERINFO(ctx) {
      return new Promise((resolve, reject) => {
        adminInfoApi().then(res => {
          if (res.code === 200) {
            ctx.commit('SAVE_USERINFO', res.data);
            resolve(res);
          } else {
            reject(res);
          }
        });
      });
    }
  },
});

export const key: InjectionKey<Store<State>> = Symbol();

export default store;

function setRouters(menus: Menus[], baseComponent: string): RouteRecordRaw[] {
  const routers: RouteRecordRaw[] = [];
  for (const menu of menus) {
    let component: RouteRecordRaw['component'];
    if (menu.parentId === 0) {
      component = () => import(`../views/${baseComponent}.vue`);
    } else {
      component = () => import(`../views/${baseComponent}/${menu.name}.vue`);
    }
    const routeRecodeRaw: RouteRecordRaw = {
      path: menu.parentId === 0 ? `/${menu.name}` : menu.name,
      name: menu.name,
      component,
      children: menu.children ? setRouters(menu.children, `${menu.name}`) : [],
    }
    routers.push(routeRecodeRaw);
  }
  return routers;
}

const homepage: RouteRecordRaw = {
  path: '/',
  name: 'homepage',
  component: () => import('../views/homepage/homepage.vue'),
  children: [{
    path: 'index', // 子路由加入斜杠代表根路由
    name: 'index',
    component: () => import('../views/index/index.vue'),
  }],
}
