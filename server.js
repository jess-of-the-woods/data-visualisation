var express = require('express');
require('dotenv').config();
var Twitter = require('twitter');
var bodyParser = require('body-parser')
var app = express();

app.use(bodyParser.json())
app.use(express.static('client'));

var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

var region = {
  tamakiMakaurauGeoCode: '"-36.8621448,174.5852818,250km"',
  rotoruaGeoCode: '"-38.1856945,176.0371285,250km"',
  ponekeGeoCode: '"-41.28648,174.776217,250km"',
  otautahiGeoCode: '"-43.5128022,172.4589935, 250km"',
  none: null
}

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
  getTweets('#happy', region.ponekeGeoCode, function(tweetStatuses) {
    res.json(tweetStatuses)
  })
})

app.post('/tweets', function(req, res){
  var hashtagInput = req.body.hashtag
  var geocodeInput = req.body.geocode
  // console.log('this is geocodeInput', geocodeInput)
  var location = region[geocodeInput]
  // console.log('this is location', location)
  getTweets(hashtagInput, location, function(tweetStatuses) {
    res.json(tweetStatuses)
  })
})

app.listen(3000, function () {
  console.log('Tweet visualisation scuttling along on the 3000th port. Yea..')
});
