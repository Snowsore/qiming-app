/**
 * 将对象添加当作参数拼接到URL上面
 * @param baseUrl 需要拼接的url
 * @param obj 参数对象
 * @returns {string} 拼接后的字符串
 * 例子:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */

function appendUrlParams(baseUrl, obj) {
  let parameters = ''
  let url = ''
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&'
  }
  parameters = parameters.replace(/&$/, '')

  if (baseUrl.includes('#/')) {
    const hashStr = baseUrl.split('#/')[1]
    if (!hashStr.includes('?')) {
      return baseUrl + '?' + parameters
    }
    const originHash = (hashStr + '&' + parameters).split('?')[0]
    const pStr = (hashStr + '&' + parameters).split('?')[1].split('&')
    const params = pStr.reduce((newMap, eachStr) => {
      const coup = eachStr.split('=')
      newMap[coup[0]] = eachStr.slice(coup[0].length + 1)
      return newMap
    }, {})
    return baseUrl.split('#/')[0] + '#/' + appendUrlParams(originHash, params)
  }
  if (/\?$/.test(baseUrl)) {
    url = baseUrl + parameters
  } else {
    url = baseUrl.replace(/\/?$/, '?') + parameters
  }
  return url
}

const getURLParameters = url =>
  (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (a, v) => ((a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a),
    {}
);

export { appendUrlParams, getURLParameters }
