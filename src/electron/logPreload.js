const {contextBridge, ipcRenderer} = require("electron")

const exposedAPI =
{
    minimize: () =>
    {
        ipcRenderer.send('minimize-log')
    },
    isMaximized: () =>
    {
        return ipcRenderer.sendSync('is-maximized-log')
    },
    maximize: () =>
    {
        ipcRenderer.send('maximize-log')
    },
    unmaximize: () =>
    {
        ipcRenderer.send('unmaximize-log')
    },
    close: () =>
    {
        ipcRenderer.send('close-log')
    }
}

contextBridge.exposeInMainWorld("api", exposedAPI)