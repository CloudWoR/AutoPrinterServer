import { Module } from '@nestjs/common';
import { app, BrowserWindow, session } from 'electron';
import { join } from 'path';

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

function assetsDir() {
if (process.env.DEV) {
    return join(__dirname, '../../src/main/assets');
    } else {
    return join(__dirname, '../../../');
    }
}

@Module({
	providers: [{
		provide: 'WEB_CONTENTS',
		async useFactory(isDev: boolean) {
			app.on('window-all-closed', () => {
					if (process.platform !== 'darwin') {
							app.quit();
					}
			});

			const extensionPath = join(assetsDir(), 'extensions/6.1.4_0');
			app.whenReady().then(async () => {
					await session.defaultSession.loadExtension(extensionPath);
			})

			if (isDev) {
					if (process.platform === 'win32') {
							process.on('message', (data) => {
									if (data === 'graceful-exit') {
											app.quit();
									}
							});
					} else {
							process.on('SIGTERM', () => {
									app.quit();
							});
					}
				}

				await app.whenReady();

				const win = new BrowserWindow({
					width: 1000,
					height: 800,
					webPreferences: {
							nodeIntegration: true,
							webSecurity: false,
							contextIsolation: false,
							devTools: isDev,
					},
					autoHideMenuBar: !isDev,
				});

				win.maximize();

				const URL = isDev
					? process.env.DEV_SERVER_URL
					: `file://${join(app.getAppPath(), 'dist/render/index.html')}`;

				win.loadURL(URL);

				if (isDev) {
					win.webContents.openDevTools();
				}
				else {
					win.removeMenu();
				}

				win.on('closed', () => {
					win.destroy();
				});

				return win.webContents;
		},
		inject: ['IS_DEV']
	}],
	exports: ['WEB_CONTENTS']
})
export class WinModule { }