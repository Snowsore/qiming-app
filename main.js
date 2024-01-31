import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
import { helaPay, PKG, TOKEN, APP_VERSION } from './api/constant.js'


helaPay.init({
  pkg: PKG,
  tk: TOKEN,
  version: APP_VERSION,
  code: '' // 微信code授权码。其他环境暂时为 '' 就行
})
.then(res => {
	console.log(res)
})
.catch(err => {
	console.log(err)
})

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif


// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif