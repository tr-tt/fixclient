const {contextBridge, ipcRenderer} = require("electron")

const exposedAPI =
{
    minimize: () =>
    {
        ipcRenderer.send('minimize-app')
    },
    isMaximized: () =>
    {
        return ipcRenderer.sendSync('is-maximized-app')
    },
    maximize: () =>
    {
        ipcRenderer.send('maximize-app')
    },
    unmaximize: () =>
    {
        ipcRenderer.send('unmaximize-app')
    },
    close: () =>
    {
        ipcRenderer.send('close-app')
    }
}

contextBridge.exposeInMainWorld("api", exposedAPI)