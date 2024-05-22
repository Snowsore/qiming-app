import request from './request.js';

const appId = 'wxb9484568f66dd447';

let openid = '';

const isWechatBrowser = () => {
	return typeof WeixinJSBridge != 'undefined';
};

const isOpenid = () => {
	return openid != '';
};

const getOpenid = () => {
	return openid;
};

const requestOpenid = async (codeParam) => {
	const res = await request({ url: `/api/wechat/jsapi_code?code=${codeParam}`, method: 'GET' });
	return res.data.openid;
};

const requestCode = () => {
	const redirectUri = encodeURIComponent(window.location.href);
	const wechatAuthUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`;
	window.location.href = wechatAuthUrl;
};

const getCode = () => {
	const urlParams = new URLSearchParams(window.location.search);
	const codeFromUrl = urlParams.get('code');
	return codeFromUrl;
};

const init = async () => {
	if (isWechatBrowser()) {
		if (!isOpenid()) {
			const code = getCode();

			if (code == null) {
				return requestCode();
			}

			openid = await requestOpenid(code);
		}
	}
};

init();

export default { isWechatBrowser, getOpenid };
