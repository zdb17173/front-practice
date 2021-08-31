/**
 * 为window挂载方法
 */

const { PromiseIpc } = require('electron-promise-ipc');

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';
window.electron = require('electron');

// 超时时间为30秒
window.promiseIpc = new PromiseIpc({ maxTimeoutMs: 30000 });

const { ipcRenderer } = window.electron;

/** 挂载停止启动loading方法 */
window.stopLoading = () => {
    ipcRenderer.send('stop-loading-main');
};
