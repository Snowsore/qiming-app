const request = async (config) => {
	const res = await uni.request(config);

	if (res.statusCode >= 400) throw res;

	return res;
};

export default request;
