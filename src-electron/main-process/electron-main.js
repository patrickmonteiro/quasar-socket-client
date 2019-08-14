import { app, BrowserWindow } from 'electron'
const socket = require('express')()
const http = require('http').Server(socket)
const io = require('socket.io')(http)
const port = process.env.PORT || 3002

socket.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html')
});

socket.get('/texto/:text', (req, res) => {
  let params = req.params.text
  io.emit('texto', params)
  res.send({mensagem: `Texto: ${params}`})
})

http.listen(port, function(){
  console.log('WEBSOCKET listening on *:' + port);
});


/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if (process.env.PROD) {
  global.__statics = require('path').join(__dirname, 'statics').replace(/\\/g, '\\\\')
}

let mainWindow

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 300,
    height: 400,
    useContentSize: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadURL(process.env.APP_URL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', () => {
  createWindow()
  mainWindow.minimize()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
