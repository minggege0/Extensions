/*
 * @Description: lastupdate
 * @Author: minggege
 * @Date: 2021-05-29 22:34:50
 * @LastEditTime: 2021-05-31 12:11:46
 * @LastEditors: minggege
 * @FilePath: \extensions\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import tools from './plugins/tools'
import axios from "axios";
import * as echarts from 'echarts';
Vue.prototype.$axios=axios
Vue.prototype.$tools = tools
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#Extensions')