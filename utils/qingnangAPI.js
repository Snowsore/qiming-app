import { appendUrlParams } from '../utils.js';

const isWechatBrowser = () => {
	return typeof WeixinJSBridge != 'undefined';
};

const request = async (config) => {
	const res = await uni.request(config);

	if (res.statusCode >= 400) throw res;

	return res;
};

const createFortuneOrder = async (data) => {
	const res = await request({
		url: `/api/order/fortune_service`,
		method: 'POST',
		data
	});
	return res.data;
};

const getOrder = async ({ orderId }) => {
	const res = await request({
		url: `/api/order/${orderId}`,
		method: 'GET'
	});
	return res.data;
};
const getFortuneService = async ({ orderId }) => {
	const res = await request({
		url: `/api/service/${orderId}`,
		method: 'GET'
	});
	return res.data;
};

const getNamingService = async ({ orderId }) => {
	const res = await request({
		url: `/api/service/${orderId}`,
		method: 'GET'
	});
	return res.data;
};
const getWechatCode = () => {
	const appId = 'wxb9484568f66dd447';
	const redirectUri = encodeURIComponent(window.location.href);
	const wechatAuthUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`;

	window.location.href = wechatAuthUrl;
};

const getOpenid = async (code) => {
	const res = await request({
		url: `/api/wechat/jsapi_code?code=${code}`,
		method: 'GET'
	});

	return res.data.openid;
};

const createPayment = async (data) => {
	if (isWechatBrowser()) {
		const urlParams = new URLSearchParams(window.location.search);
		const code = urlParams.get('code');

		if (!code) {
			getWechatCode();
			return;
		}

		const openid = await getOpenid(code);

		const res = await request({
			url: `/api/payment/wechat_jsapi`,
			method: 'POST',
			data: {
				...data,
				openid
			}
		});

		const { appId, timeStamp, nonceStr, package: pkg, signType, paySign } = res.data;

		WeixinJSBridge.invoke(
			'getBrandWCPayRequest',
			{
				appId,
				timeStamp,
				nonceStr,
				package: pkg,
				signType,
				paySign
			},
			function (response) {
				if (response.err_msg === 'get_brand_wcpay_request:ok') {
					console.log('Payment success');
				} else {
					console.log('Payment failed:', response.err_msg);
				}
			}
		);
	} else {
		const res = await request({
			url: `/api/payment/wechat_h5`,
			method: 'POST',
			data
		});

		return res.data;
	}
};

const getPackageOptions = async ({ orderId }) => {
	const res = await request({
		url: `/api/package_options/${orderId}`,
		method: 'GET'
	});
	return res.data;
};

const checkOrderPayment = async ({ orderId }) => {
	const res = await request({
		url: `/api/payment/check/${orderId}`,
		method: 'GET'
	});

	return res.data;
};

const isPaidedPackage = async ({ orderId }) => {
	const packageOption = await getPackageOptions({
		orderId
	});

	return !packageOption.function.endsWith('0');
};

const linkUser = async (data) => {
	const res = await request({
		url: `/api/user/link`,
		method: 'POST',
		data
	});
	return res.data;
};

export default {
	isWechatBrowser,
	createFortuneOrder,
	getOrder,
	getFortuneService,
	getNamingService,
	createPayment,
	getPackageOptions,
	checkOrderPayment,
	isPaidedPackage,
	linkUser
};
