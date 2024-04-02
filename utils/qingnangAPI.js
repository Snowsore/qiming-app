import { appendUrlParams } from '../utils.js';

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

const createPayment = async (data) => {
	const res = await request({
		url: `/api/payment/wechat_h5`,
		method: 'POST',
		data
	});

	return res.data;
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

<<<<<<< HEAD
const linkUser = async (data) => {
	const res = await request({
		url: `/api/user/link`,
		method: 'POST',
		data
	});
	return res.data;
};

=======
>>>>>>> 51f9038 (Drop helapay add qingnangAPI)
export default {
	createFortuneOrder,
	getOrder,
	getFortuneService,
	getNamingService,
	createPayment,
	getPackageOptions,
	checkOrderPayment,
<<<<<<< HEAD
	isPaidedPackage,
	linkUser
=======
	isPaidedPackage
>>>>>>> 51f9038 (Drop helapay add qingnangAPI)
};
