import { app, protocol, BrowserWindow, Menu } from 'electron'
import {
  createProtocol,
  installVueDevtools,
} from 'vue-cli-plugin-electron-builder/lib'
import createMainMenuTemplate from './electron/mainMenuTemplate'

const isDevelopment = process.env.NODE_ENV !== 'production'

let win

protocol.registerStandardSchemes(['app'], { secure: true })

/**
 * Create the main window of the app
 */
const createWindow = () => {
  win = new BrowserWindow({ width: 800, height: 600 })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) {
      win.webContents.openDevTools()
    }
  } else {
    createProtocol('app')
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => (win = null))
}

/**
 * Building the main menu of the app
 */
const buildMainMenu = () => {
  return Menu.setApplicationMenu(
    Menu.buildFromTemplate(createMainMenuTemplate(win))
  )
}

/**
 * Quit when all windows are closed.
 */
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

/**
 * On macOS it's common to re-create a window in the app when the
 * dock icon is clicked and there are no other windows open.
 */
app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

/**
 * On Electron is ready.
 */
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    await installVueDevtools()
  }

  createWindow()
  buildMainMenu()
})

/**
 * Exit cleanly on request from parent process in development mode.
 */
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
