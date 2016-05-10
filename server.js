var express = require('express');
require('dotenv').config();
var Twitter = require('twitter');
var bodyParser = require('body-parser')
var app = express();

app.use(bodyParser.urlencoded({ extended:true }))
app.use(express.static('client'));

var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

app.get('/', function (req, res) {
    res.send('index.html')
})

function getTweets(hashTag, geoCode, callback) {
  var queryParams = {q: hashTag, lang: 'en', count: 20, geocode: geoCode}
  client.get('search/tweets', queryParams, function(error, tweets, response) {
    if (error) console.log(error);
    callback(tweets.statuses)
  })
}

app.get('/tweets', function(req, res){
  var wgtnGeoCode = "-41.28648,174.776217,750km"
  getTweets('#happy', wgtnGeoCode, function(tweetStatuses) {
    res.json(tweetStatuses)
  })
})

app.post('/tweets', function(req, res){
  var hashtagInput = Object.keys(req.body)[0]
  getTweets(hashtagInput, null, function(tweetStatuses) {
    res.json(tweetStatuses)
  })
})

app.listen(3000, function () {
  console.log('Tweet visualisation galloping along on port 3000!')
});
