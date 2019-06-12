import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import {getToken, removeToken} from '@/utils/auth'
import {getCookie} from "../utils/cookies";
import {hasAuthorities} from "../utils";

Vue.use(Router);

const isDevelopment = process.env.NODE_ENV === 'development';

const router = new Router({
  routes: routes,
  mode: isDevelopment ? 'hash' : 'history'
});


router.beforeEach(async (to, from, next) => {
  Vue.prototype.$Loading.start();
  const isToLogin = (to.name === 'Login');
  if (!!getCookie('JSESSIONID')) {

    if (isToLogin) {
      // 已登录且要跳转的页面是登录页 跳转到home页
      next({ name: 'Home' });
      Vue.prototype.$Loading.finish()
    } else {
      if (hasAuthorities(to.meta.authorities))
        next();
      else
        next({ name: 'Unauthorized' })
    }
  } else {
    if (isToLogin) {
      // 未登陆且要跳转的页面是登录页
      next()
    } else {
      // 未登录且要跳转的页面不是登录页 跳转到登录页
      next({ name: 'Login' });
      Vue.prototype.$Loading.finish()
    }
  }
});

router.afterEach((to, from) => {
  // const title = to.meta && to.meta.title
  // if (title) document.title = title

  Vue.prototype.$Loading.finish()
})

export default router
