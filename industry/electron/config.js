/**
 * electron全局配置
 */

const DEV_ADDRESS = 'http://localhost:8000';

// 默认后台服务器地址
const SERVICE_ADDRESS = 'http://localhost:8080/';

// 是否开启 输入 licnse 页面
const IS_LICENSE_CHECK = false;

module.exports = { DEV_ADDRESS, SERVICE_ADDRESS, IS_LICENSE_CHECK };