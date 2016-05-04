var express = require('express');
require('dotenv').config();
var Twitter = require('twitter');
var app = express();

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
  // var hashtagInput = req.body.name // grabs from form
    var wgtnGeoCode = "-41.28648,174.776217,750km"
    var wellyTweets =  client.get('search/tweets', {q: '#lichen', lang: 'en', count: 10/*, geocode: wgtnGeoCode*/}, function(error, tweets, response) {
    if (error) console.log(error);
    // var searchResult = JSON.parse(response.body)
    // console.log(tweets.statuses)
    // console.log('response.body: ', response.body)
    //console.log('this is tweets.statuses: ', tweets.statuses)
    res.json(tweets.statuses)
 }) // close client.get
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


// console.log('tweets.statuses: ', tweets.statuses)
