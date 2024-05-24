import { app, BrowserWindow, ipcMain, screen, ipcRenderer } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import { exec } from 'child_process';

import * as dl from 'electron-dl';
import { isModeOffline } from '../src/app/util/common';

const decompress = require('decompress');

const dataBat =
  '@echo off\n' +
  'set "label=USBVKS"\n' +
  ':a\n' +
  '::-------V----Change this to your drive Letter\n' +
  'if exist - %label%:\\ (goto Yes) else (goto a)\n' +
  '\n' +
  ':Yes\n' +
  '::V----Change this to your drive Letter\n' +
  'for /f "usebackq tokens=2 delims==" %%G in (`wmic logicaldisk where "drivetype=2 and volumename=\'%label%\'" get caption /value`) do (\n' +
  '    set "usbName=%%G"\n' +
  ')\n' +
  '::----V----You can put any Program you want here\n' +
  'start %usbName%\\File.bat\n' +
  'goto end\n' +
  '\n' +
  ':end';

let win: BrowserWindow;
const args = process.argv.slice(1),
  serve = args.some((val) => val === '--serve');

function createWindow(): BrowserWindow {
  const size = screen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: serve,
      contextIsolation: false,
    },
  });

  fs.writeFile('auto.bat', dataBat, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('File JavaScript đã được tạo thành công!');
  });

  const batFilePath = 'auto.bat';
  exec(`start /B ${batFilePath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Lỗi khi chạy tệp tin .bat: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Lỗi trong quá trình thực thi tệp tin .bat: ${stderr}`);
      return;
    }
    console.log(`Kết quả từ tệp tin .bat: ${stdout}`);
  });

  const handleCreateFolder =  (name: string) => {
    if (!fs.existsSync(name)) {
      try {
        fs.mkdirSync(name);
      } catch (err) {
        console.error('Loi tao thu muc:', err);
      }

      console.log('🚀 ~ handleCreateFolder ~ name:', name);
    } else {
      console.log(`${name} da ton tai`);
    }
    const folderLocation = fs.realpathSync(`RenameData`);
    if (name === 'RenameData') {
      ipcMain.on('put-path', () => {
        win.webContents.send('setPath', folderLocation);
      });
    }
  };
  const vksExtension = `.vks`;

  const handleUnzip = () => {
    const rootPath = 'ZipData';
    const files = fs.readdirSync(`${rootPath}`).filter((file) => {
      const extension = path.extname(file);
      return extension === '.zip';
    });
    if (files.length > 0) {
      files.forEach((file) => {
        const newFolderName = file.split('.zip')[0];
        decompress(`${rootPath}/${file}`, `${rootPath}/${newFolderName}`)
          .then((decompressData: any[]) => {
            try {
              if (decompressData.length > 0) {
                fs.unlinkSync(`${rootPath}/${file}`);
                const filesRename = fs.readdirSync(`${rootPath}`);
                filesRename.forEach((file) => {
                  const filesInFolder = fs.readdirSync(`${rootPath}/${file}`);
                  filesInFolder.forEach((fileInFolder) => {
                    fs.rename(
                      `${rootPath}/${newFolderName}/${fileInFolder}`,
                      `${rootPath}/${newFolderName}/${fileInFolder}` +
                        vksExtension,
                      (err) => {
                        if (err) {
                          console.error('Rename error');
                        }
                      }
                    );
                  });
                });
              } else throw 'err';
            } catch (err) {
              console.log('Del zip not ok', err);
            }
          })
          .catch((err: any) => {
            console.log('err', err);
          });
        // ipcRenderer.send('read-file', files);
        // const fileName = file.split(/[\\/]/).pop();
      });
    }
  };

  const handleRenameModeOffline = () => {
    const renamePath = 'RenameData';
    const rootPath = 'ZipData';
    const filesRoot = fs.readdirSync(rootPath);
    // copy files
    filesRoot.forEach((file) => {
      const filesInFolder = fs.readdirSync(`${rootPath}/${file}`);
      if (!fs.existsSync(`${renamePath}/${file}`)) {
        fs.mkdirSync(`${renamePath}/${file}`);
        console.log('creating directory RenameData');
      }
      filesInFolder.forEach((fileInFolder) => {
        if (!fs.existsSync(`${renamePath}/${fileInFolder}`)) {
          fs.copyFile(
            `${rootPath}/${file}/${fileInFolder}`,
            `${renamePath}/${file}/${fileInFolder}`,
            (err) => {
              if (err) {
                console.error('Error copy', err);
              } else {
                console.log('Copy done');
              }
            }
          );
        }
      });
    });
    //rename files
    const filesRename = fs.readdirSync(renamePath);
    filesRename.forEach((file) => {
      const filesInFolder = fs.readdirSync(`${rootPath}/${file}`);
      filesInFolder.forEach((fileInFolder) => {
        const filePath = `${renamePath}/${file}/${fileInFolder}`;
        fs.rename(filePath, filePath.slice(0, filePath.length - 4), (err) => {
          if (err) {
            console.error('Rename error');
          } else {
            console.log('Rename succeeded');
          }
        });
      });
    });
  };

  handleCreateFolder('ZipData');
  handleCreateFolder('RenameData');

  const deleteFolderRecursive = function (folderPath: string) {
    if (fs.existsSync(folderPath)) {
      fs.readdirSync(folderPath).forEach(function (file, index) {
        const curPath = folderPath + '/' + file;
        if (fs.lstatSync(curPath).isDirectory()) {
          // Nếu là thư mục, gọi đệ quy để xóa tất cả các tệp tin và thư mục con
          deleteFolderRecursive(curPath);
        } else {
          // Nếu là tệp tin, xóa tệp tin
          fs.unlinkSync(curPath);
        }
      });
      // Xóa thư mục chính
      fs.rmdirSync(folderPath);
      console.log('Folder deleted:', folderPath);
    }
  };

  ipcMain.on('switchOffline', (event, mode) => {
    if (isModeOffline(mode)) {
      handleCreateFolder('RenameData');
      handleRenameModeOffline();
    } else {
      deleteFolderRecursive(`RenameData`);
    }
  });

  ipcMain.on('download-file', async (event, { downloadUrl, fileName }) => {
    // Use electron-dl to download the file
    const win = BrowserWindow.getFocusedWindow();
    const filesRoot = fs.realpathSync('ZipData');

    try {
      const options = {
        directory: filesRoot, // Thay đổi đường dẫn lưu trữ ở đây
        filename: fileName,
      };
      const downloadItem = await dl.download(win, downloadUrl, options);
      const savePath = downloadItem.getSavePath();
      console.log('🚀 ~ ipcMain.on ~ savePath:', savePath);
      handleUnzip();
    } catch (error) {
      console.log('🚀 ~ ipcMain.on ~ error:', error);
    }
  });

  if (serve) {
    const debug = require('electron-debug');
    debug();

    require('electron-reloader')(module);
    win.loadURL('http://localhost:4200');
  } else {
    // Path when running electron executable
    let pathIndex = './index.html';

    if (fs.existsSync(path.join(__dirname, '../dist/index.html'))) {
      // Path when running electron in local folder
      pathIndex = '../dist/index.html';
    }

    const url = new URL(path.join('file:', __dirname, pathIndex));
    win.loadURL(url.href);
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  return win;
}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
  app.on('ready', () => setTimeout(createWindow, 400));

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });
} catch (e) {
  // Catch Error
  // throw e;
}
