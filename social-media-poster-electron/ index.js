const { ipcMain } = require('electron');
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
