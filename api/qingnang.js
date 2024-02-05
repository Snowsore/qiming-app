import { appendUrlParams } from '../utils.js';
import { helaPay } from './constant.js';

const request = async (config) => {
	const res = await uni.request(config);

	if (res.statusCode >= 400) throw res;

	return res;
};

export const apiFortune = {
	async createOrder(data) {
		const res = await request({
			url: `/order/fortune_service`,
			method: 'POST',
			data
		});
		return res.data;
	},

	async getOrder(orderId) {
		const res = await request({
			url: `/order/${orderId}`,
			method: 'GET'
		});
		return res.data;
	}
};

export const apiPayment = {
	async create(skuId) {
		const info = await helaPay.requestWakeWeChatPay(skuId, window.$isWechat);
		return info;
	},
	async request(payScanInfo, returnUrl) {
		if (payScanInfo) {
			const rUrl = returnUrl || encodeURIComponent(appendUrlParams(window.location.href, { payOrderId: payScanInfo.payOrderId }));

			if (window.$isWechat) {
				helaPay.wxJSPay(payScanInfo, () => {
					window.location.href = window.decodeURIComponent(rUrl);
				});
			} else {
				window.location.href = `${payScanInfo.orderStr}&redirect_url=${rUrl}`;
			}
		} else {
			// 未获取到订单信息
		}
	},
	async check(payScanInfo) {
		const { payOrderId } = payScanInfo;
		const res = await request({
			url: `/payment/hela/${payOrderId}`,
			method: 'GET'
		});
		return res.data;
	}
};

export default {
	apiFortune,
	apiPayment
};
