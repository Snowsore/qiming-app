import { appendUrlParams } from './utils.js'
import { helaPay } from './hela_api/constant.js'

const mobileWxPay = (skuId, returnUrl) => {
	helaPay
	  .requestWakeWeChatPay(skuId, window.$isWechat)
	  .then((payScanInfo) => {
		if (payScanInfo) {
			  const rUrl = returnUrl || encodeURIComponent(
			    appendUrlParams(window.location.href, { payOrderId: payScanInfo.payOrderId })
			  )
			if (window.$isWechat) {
				helaPay.wxJSPay(payScanInfo, () => {
			      window.location.href = window.decodeURIComponent(rUrl)
			    })
			} else {
			    window.location.href = `${payScanInfo.orderStr}&redirect_url=${rUrl}`
			}
		} else {
			// 未获取到订单信息
		}
	  })
}

export { mobileWxPay }