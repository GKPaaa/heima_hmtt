import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.less'
import 'amfe-flexible'
import '@/styles/index.less'
import MyIcon from '@/components/MyIcon.vue'
import '@/components'
import * as obj from '@/filter'

import FollowUser from '@/components/FollowUser.vue'
Vue.component(FollowUser.name, FollowUser)

Object.keys(obj).forEach((key) => {
  Vue.filter(key, obj[key])
})
Vue.components = { MyIcon }
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
