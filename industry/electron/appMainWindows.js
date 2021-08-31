const { BrowserView, BrowserWindow, app } = require('electron');
const isDevEnv = process.env.APP_ENV == "dev";//require('electron-is-dev');
const path = require('path');
const { DEV_ADDRESS, SERVICE_ADDRESS, IS_LICENSE_CHECK } = require('../electron/config');

module.exports = class AppMainWindow extends BrowserWindow {
    constructor() {
        const config = {
            width: 1010,
            height: 716,
            minWidth: 800,
            minHeight: 600,
            autoHideMenuBar: false,
            fullscreen: false,
            webPreferences: {
                nodeIntegration: true,
                enableRemoteModule: true,
                webviewTag: true,
                webSecurity: false,
                preload: path.join(__dirname, '../electron/preload.js'),
            },
            icon: `${path.join(__dirname, '../resource/icon.png')}`,
        };

        if (process.platform === 'darwin') {
            app.dock.setIcon(`${path.join(__dirname, '../resource/icon.png')}`);
        }

        console.log("devModel["+ isDevEnv +"]");
        super(config);
        this.mainWindow = this;
        this.browserView = null;
        this.initMainWindow();
    }

    initMainWindow() {
        this.loadURL(
            isDevEnv ? DEV_ADDRESS : `file://${path.join(__dirname, '../dist/index.html')}`,
        ).then(() => {
            console.log('main url is loading....');
        });
    }


    destoryMainWindow() {
        this.mainWindow = null;
    }

    removeView() {
        this.mainWindow.removeBrowserView(this.browserView);
    }
}