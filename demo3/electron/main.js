const { app} = require('electron');
const os = require('os');
const AppMainWindow = require('../electron/appMainWindows');
const AppTray = require('../electron/apptray');

// win7部分系统白屏优化: 下关闭硬件加速
const isWin7 = os.release().startsWith('6.1');
if (isWin7) app.disableHardwareAcceleration();

class MainApp {

    // 创建右键托盘
    createTray() {
        this.tray = new AppTray(this.mainWindow);
    }

    // 创建主进程窗口
    createMainWindow() {
        this.mainWindow = new AppMainWindow();
        this.createTray();
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        electronDev || this.handleKeepSingleApp();
    }

    init() {
        try {
            this.initAppLife();
            this.initIPC();
        } catch (e) {
            console.log('发现进程崩溃...........');
            app.exit(501);
        }
    }

    // 生命周期
    initAppLife() {
        app.whenReady().then(() => {
            this.createMainWindow();
        });

        app.on('window-all-closed', () => {
            console.log('window-all-closed');
            // this.tray?.exitDestory();
            // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，否则绝大部分应用及其菜单栏会保持激活。
            console.log('process.platform', process.platform);
            if (process.platform !== 'darwin') {
                console.log('quit');
                app.quit();
            }
        });

        app.on('before-quit', () => {
            console.log('before-quit');

            if (this.mainWindow) {
                this.mainWindow.destoryMainWindow();
            }
        });
    }


    可作为IPC通讯集合
    initIPC() {
        // 关闭启动loading层, 移除loading view视图
        // ipcMain.on('stop-loading-main', () => {
        //     this.mainWindow.removeView();
        // });
        //
        // ipcMain.on('try-license', async (e, url) => {
        //     if (licenseTry(url)) {
        //         this.mainWindow.loadMainPage();
        //     }
        // });
    }
}

new MainApp().init();