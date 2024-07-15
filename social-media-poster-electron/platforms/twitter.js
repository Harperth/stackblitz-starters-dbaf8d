const Twitter = require('twitter');

const client = new Twitter({
  consumer_key: 'YOUR_CONSUMER_KEY',
  consumer_secret: 'YOUR_CONSUMER_SECRET',
  access_token_key: 'YOUR_ACCESS_TOKEN_KEY',
  access_token_secret: 'YOUR_ACCESS_TOKEN_SECRET'
});

async function postTweet(tweetText) {
  try {
    const tweet = await client.post('statuses/update', { status: tweetText });
    return tweet;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  postTweet
};
