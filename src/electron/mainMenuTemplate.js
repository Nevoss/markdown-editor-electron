import { app, dialog } from 'electron'
import electronStroe from '../electronStore'

const isDevelopment = process.env.NODE_ENV !== 'production'
const isMac = process.platform === 'darwin'

const newFile = mainWindow => {
  let savePath = dialog.showSaveDialog(mainWindow, {
    filters: [{ name: 'Markdown', extensions: ['md'] }],
  })
  if (!savePath) {
    return
  }

  mainWindow.webContents.send('vuex-event', {
    type: 'editor/newFile',
    payload: savePath,
  })
}

const openFile = mainWindow => {
  dialog.showOpenDialog(
    {
      properties: ['openFile'],
      filters: [{ name: 'Markdown', extensions: ['md'] }],
    },
    filePaths => {
      if (filePaths && filePaths[0]) {
        mainWindow.webContents.send('vuex-event', {
          type: 'editor/openFile',
          payload: filePaths[0],
        })
      }
    }
  )
}

const saveFile = (mainWindow, savePath) => {
  mainWindow.webContents.send('vuex-event', {
    type: 'editor/saveFile',
    payload: savePath,
  })
}

const saveAsFile = mainWindow => {
  let savePath = dialog.showSaveDialog(mainWindow, {
    filters: [{ name: 'Markdown', extensions: ['md'] }],
  })
  if (!savePath) {
    return
  }

  saveFile(mainWindow, savePath)
}

const createMainMenuTemplate = mainWindow => {
  let mainMenuTemplate = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New',
          accelerator: isMac ? 'Command+N' : 'Ctrl+N',
          click: () => newFile(mainWindow),
        },
        {
          label: 'Open',
          accelerator: isMac ? 'Command+O' : 'Ctrl+O',
          click: () => openFile(mainWindow),
        },
        {
          label: 'Save',
          accelerator: isMac ? 'Command+S' : 'Ctrl+S',
          click: () => {
            const activeFilePath = electronStroe.get('active-file')

            if (activeFilePath) {
              return saveFile(mainWindow, activeFilePath)
            }

            return saveAsFile(mainWindow)
          },
        },
        {
          label: 'Save as',
          accelerator: isMac ? 'Command+Shift+S' : 'Ctrl+Shift+S',
          click: () => saveAsFile(mainWindow),
        },
        {
          label: 'Quit',
          accelerator: isMac ? 'Command+Q' : 'Ctrl+Q',
          click: () => app.quit(),
        },
      ],
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Toggle View Mode',
          accelerator: isMac ? 'Command+Shift+P' : 'Ctrl+Shift+P',
          click: () => {
            mainWindow.webContents.send('vuex-event', {
              type: 'editor/toggleViewMode',
            })
          },
        },
      ],
    },
  ]

  if (isMac) {
    mainMenuTemplate.unshift({})
  }

  if (isDevelopment) {
    mainMenuTemplate.push({
      label: 'Development',
      submenu: [
        {
          label: 'Toggle DevTools',
          accelerator:
            process.platform === 'darwin' ? 'Command+Shift+I' : 'Ctrl+Shift+I',
          click: (item, focusedWindow) => {
            focusedWindow.toggleDevTools()
          },
        },
        {
          role: 'reload',
        },
      ],
    })
  }

  return mainMenuTemplate
}

export default createMainMenuTemplate
