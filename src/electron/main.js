const {app, BrowserWindow, ipcMain} = require('electron')
const path = require("path")
const windowStateKeeper = require('electron-window-state')
const isDev = require('electron-is-dev')

const rootPath = path.join(__dirname, '..', '..')

let appWindow
let logWindow

/* APP WINDOW */

const createAppWindow = () =>
{
    const stateAppWindow = windowStateKeeper(
    {
        file: 'appWindow.json',
        defaultWidth: 1800,
        defaultHeight: 900
    })

    appWindow = new BrowserWindow(
    {
        x: stateAppWindow.x, y: stateAppWindow.y,
        width: stateAppWindow.width, height: stateAppWindow.height,
        minWidth: 350, minHeight: 300,
        frame: false,
        webPreferences:
        {           
            contextIsolation: true, // Disable 'contextIsolation' to allow 'nodeIntegration'
            nodeIntegration: false,
            preload: path.join(__dirname, "appPreload.js")
        },
        backgroundColor: '#343434'
    })

    if(isDev)
    {
        appWindow.loadURL("http://localhost:8080/app.html")

        appWindow.webContents.openDevTools()
    }
    else
    {
        appWindow.loadURL(`file://${path.join(rootPath, '_build', 'app.html')}`)
    }

    stateAppWindow.manage(appWindow)

    appWindow.on('closed', () =>
    {
        appWindow = null
    })
}

/* LOG WINDOW */

const createLogWindow = () =>
{
    const stateLogWindow = windowStateKeeper(
    {
        file: 'logWindow.json',
        defaultWidth: 800,
        defaultHeight: 600
    })

    logWindow = new BrowserWindow(
    {
        x: stateLogWindow.x, y: stateLogWindow.y,
        width: stateLogWindow.width, height: stateLogWindow.height,
        minWidth: 350, minHeight: 300,
        frame: false,
        webPreferences:
        {
            contextIsolation: true, // Disable 'contextIsolation' to allow 'nodeIntegration'
            nodeIntegration: false,
            preload: path.join(__dirname, "logPreload.js")
        },
        backgroundColor: '#343434'
    })

    if(isDev)
    {
        logWindow.loadURL("http://localhost:8080/log.html")

        logWindow.webContents.openDevTools()
    }
    else
    {
        logWindow.loadURL(`file://${path.join(rootPath, '_build', 'log.html')}`)
    }

    stateLogWindow.manage(logWindow)

    logWindow.on('closed', () =>
    {
        logWindow = null
    })
}

/* APP EVENTS */

app.on('ready', () =>
{
    createAppWindow()
    createLogWindow()
})

app.on('before-quit', () =>
{

})

app.on('window-all-closed', () =>
{
    app.quit()
})

/* IPCMAIN */

ipcMain.on('minimize-app', () =>
{
    appWindow.minimize()
})
ipcMain.on('minimize-log', () =>
{
    logWindow.minimize()
})

ipcMain.on('is-maximized-app', (event) =>
{
    event.returnValue = appWindow.isMaximized()
})
ipcMain.on('is-maximized-log', (event) =>
{
    event.returnValue = logWindow.isMaximized()
})

ipcMain.on('maximize-app', () =>
{
    appWindow.maximize()
})
ipcMain.on('maximize-log', () =>
{
    logWindow.maximize()
})

ipcMain.on('unmaximize-app', () =>
{
    appWindow.unmaximize()
})
ipcMain.on('unmaximize-log', () =>
{
    logWindow.unmaximize()
})

ipcMain.on('close-app', () =>
{
    appWindow.close()
})
ipcMain.on('close-log', () =>
{
    logWindow.close()
})