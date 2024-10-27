const { app, BrowserWindow } = require('electron');
const WebSocket = require('ws');

let mainWindow;
let ws;

function createWindow() {
  // Attempt to create a WebSocket connection
  ws = new WebSocket('ws://localhost:8080');

  ws.on('open', () => {
    console.log('Connected to server');
    mainWindow = new BrowserWindow({
      width: 1920,
      height: 1080,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    });

    mainWindow.loadFile('index.html');

    mainWindow.on('closed', () => {
      console.log('Window closed, disconnecting from server...');
      if (ws) ws.close();
      mainWindow = null;
    });

    ws.on('message', (message) => {
      console.log(`Received: ${message}`);
    });

    ws.on('close', () => {
      console.log('Disconnected from server');
      if (mainWindow) {
        mainWindow.close();
      }
    });

    ws.on('error', (error) => {
      console.error(`WebSocket error: ${error}`);
      if (mainWindow) {
        mainWindow.close();
      }
    });
  });

  ws.on('error', (error) => {
    console.error(`WebSocket connection error: ${error}`);
    // Handle the case where WebSocket connection is refused
    // Prevent window creation or show an error message
    // For now, we will log an error and quit the app if not on macOS
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
