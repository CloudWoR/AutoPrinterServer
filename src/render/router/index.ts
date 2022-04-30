import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import store from '@render/store';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/login.vue'),
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

// 前置路由守卫
router.beforeEach((to, from, next) => {
  // 判断token值
  const token = localStorage.getItem('token');
  // 获取vuex里面的userinfo
  const userinfo = store.state.userinfo;
  if (token && !userinfo) {
    store.dispatch('FETCH_USERINFO').then(() => {
      next(to);
    }).catch(() => {
      localStorage.removeItem('token');
      next('/login');
    })
  } else if (
    token &&
    userinfo &&
    from.path === '/login' &&
    to.path === '/homepage'
  ) {
    next('/index');
  } else if (!token && to.path !== '/login') {
    next('/login');
  } else if (to.path === '/') {
    next('/index');
  } else {
    next();
  }
  // if (token && !userinfo) {
  //   store.dispatch('FETCH_USERINFO').then(() => {
  //     next(to);
  //   }).catch(() => {
  //     localStorage.clear();
  //     next('/login');
  //   });
  // } else if (
  //   token && 
  //   userinfo && 
  //   from.path === '/login' &&
  //   to.path === '/homepage'
  // ) { // /homepage用来规避死循环
  //   // 重定向
  //   console.log('重定向')
  //   next('/index');
  // } else if (!token) {
  //   next('/login');
  // } else {
  //   next();
  // }
})

export default router;
