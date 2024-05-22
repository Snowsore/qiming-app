import request from './request.js';
import wechatLogin from './wechatLogin.js';

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

const createPayment = async ({ orderId, packageId, method, redirectUrl, success }) => {
	const whenRequestEnd = () => {
		try {
			if (redirectUrl) {
				// const paymentUrl = `&redirect_url=${encodeURIComponent(redirectUrl)}`;

				window.location.href = redirectUrl;
			}

			if (success) success();
		} catch (err) {
			alert(err);
		}
	};

	if (wechatLogin.isWechatBrowser()) {
		const res = await request({
			url: `/api/payment/wechat_jsapi`,
			method: 'POST',
			data: {
				orderId,
				packageId,
				method,
				openid: wechatLogin.getOpenid()
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
			(res) => {
				if (res.err_msg == 'get_brand_wcpay_request:ok') {
					whenRequestEnd();
				}
			}
		);
	} else {
		const res = await request({
			url: `/api/payment/wechat_h5`,
			method: 'POST',
			orderId,
			packageId,
			method
		});

		whenRequestEnd();
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
