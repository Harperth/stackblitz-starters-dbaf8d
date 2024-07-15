const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const express = require('express');
const twitter = require('./platforms/twitter');
const facebook = require('./platforms/facebook');

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

ipcMain.handle('post-twitter', async (event, message) => {
  try {
    const tweet = await twitter.postTweet(message);
    return tweet;
  } catch (error) {
    console.error('Error posting to Twitter:', error);
    throw new Error('Error posting to Twitter');
  }
});

ipcMain.handle('post-facebook', async (event, message) => {
  try {
    const post = await facebook.postToFeed(message);
    return post;
  } catch (error) {
    console.error('Error posting to Facebook:', error);
    throw new Error('Error posting to Facebook');
  }
});

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
