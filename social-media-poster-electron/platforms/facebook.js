const Facebook = require('facebook-node-sdk');

const fb = new Facebook({
  appId: 'YOUR_APP_ID',
  appSecret: 'YOUR_APP_SECRET'
});

async function postToFeed(message) {
  try {
    const response = await new Promise((resolve, reject) => {
      fb.api('/me/feed', 'post', { message }, (res) => {
        if (!res || res.error) {
          reject(res.error || 'Unknown error');
        } else {
          resolve(res);
        }
      });
    });
    return response;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  postToFeed
};
