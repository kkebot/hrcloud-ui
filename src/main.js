import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import utils from './utils'
import iView from 'iview'
// import Mock from './mock'
import request from './utils/request'
// import echarts from 'echarts/lib/echarts'
import '@/themes/common.less'
import '@/themes/my-theme.less'
import '@/assets/icons/iconfont.css'

import ECharts from 'vue-echarts' // 在 webpack 环境下指向 components/ECharts.vue
import 'echarts/theme/macarons.js'

/* Register component */

Vue.use(iView)
Vue.component('v-chart', ECharts)
/* Use plugins */

Vue.prototype.$utils = utils
Vue.prototype.$http = request
// Vue.prototype.$echarts = echarts

/* Config */

Vue.config.productionTip = false

/* Initial */

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
