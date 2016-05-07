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
    res.send('index.html');

}); // close app.get

app.get('/tweets', function(req, res){
    var wgtnGeoCode = "-41.28648,174.776217,750km"
    var wellyTweets =  client.get('search/tweets', {q: '#fungi', lang: 'en', count: 20, geocode: wgtnGeoCode}, function(error, tweets, response) {
    if (error) console.log(error);
    res.json(tweets.statuses)
 }) // close client.get
})

app.post('/tweets', function(req, res){
  var hashtagInput = Object.keys(req.body)[0] // grabs from form
  client.get('search/tweets', {q: hashtagInput, lang: 'en', count: 20}, function(error, tweets, response) {
  if (error) console.log(error);
  res.json(tweets.statuses)
  }) // close client.get
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
