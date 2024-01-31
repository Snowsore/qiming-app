import createHelaPay from 'hela-pay'

const helaPay = createHelaPay()
const PKG = 'web.ningmenglaice.com' // 悬壶里产品的 PKG
const APP_VERSION = '1.0.0' // eg. '1.1.1'
const TOKEN = helaPay.uuid(PKG) // 或者你自己项目的 TOKEN用户唯一标识

export {helaPay, PKG, APP_VERSION, TOKEN}