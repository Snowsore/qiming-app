import App from './App'
import { helaPay, PKG, TOKEN, APP_VERSION } from './hela_api/constant.js'

try {
  const ua = window.navigator.userAgent.toLowerCase()
  window.$isWechat = ua.indexOf('micromessenger') !== -1
  
  if (window.$isWechat) {
	   const pMap = getURLParameters(window.location.href) // 获取 URL params 的函数。
	    if (pMap && pMap.code) {
	        window.$WechatCode = pMap.code
	    } else { // snsapi_base是静默授权。snsapi_userinfo
	        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3039cc08dfa09009&redirect_uri=${encodeURIComponent(
	            window.location.href
	        )}&response_type=code&scope=snsapi_base&state=__WX_INIT__#wechat_redirect`
	    }
  }
  helaPay.init({
      pkg: PKG,
      tk: TOKEN,
      version: APP_VERSION,
      code: window.$WechatCode || ''
    }).catch((err) => console.log(err))
	.finally(() => {
		helaPay.requestUserInfo()
    })
} catch (err) {
  console.log(err)
}


// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import { getURLParameters } from './utils'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif