const {app, BrowserWindow, ipcMain} = require('electron')
const path = require("path")
const windowStateKeeper = require('electron-window-state')
const isDev = require('electron-is-dev')

const rootPath = path.join(__dirname, '..', '..')

let appWindow

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
        //frame: false,
        webPreferences:
        {           
            contextIsolation: true, // Disable 'contextIsolation' to allow 'nodeIntegration'
            nodeIntegration: false,
            //preload: path.join(__dirname, "preload.js")
        },
        backgroundColor: '#343434'
    })

    if(isDev)
    {
        //appWindow.loadURL("http://localhost:8080/app.html")
        appWindow.loadFile(path.join(rootPath, '_build', 'app.html'))

        appWindow.webContents.openDevTools()
    }
    else
    {
        appWindow.loadFile(path.join(rootPath, '_build', 'app.html'))

        //appWindow.loadURL(`file://${path.join(rootPath, '_build', 'app.html')}`)
    }

    stateAppWindow.manage(appWindow)

    appWindow.on('closed', () =>
    {
        appWindow = null
    })
}

app.on('ready', () =>
{
    createAppWindow()
})

app.on('before-quit', () =>
{

})

app.on('window-all-closed', () =>
{
    app.quit()
})