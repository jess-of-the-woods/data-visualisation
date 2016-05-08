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

//extract function refactor 
//1. identify tests
// - load the home page and test hard coded tweets
// - submit the form for user submitted hash tag
// 2. identify the code to extract - what is it's natural name
// 3. what inputs does that code need - those are function params
// 4. what variables does it change - those are the return obj
// 5. move code out into new function, replace with function call
// http://refactoring.com/catalog/extractMethod.html

function getTweets(hashTag, geoCode, callback) {
  var queryParams = {q: hashTag, lang: 'en', count: 20, /*geocode: geoCode*/}
  client.get('search/tweets', queryParams, function(error, tweets, response) {
    if (error) console.log(error);
    callback(tweets.statuses)
  }) // close client.get
}

app.get('/tweets', function(req, res){
  var wgtnGeoCode = "-41.28648,174.776217,750km"
  getTweets('#mitochondria', res, wgtnGeoCode)
  //unclear what it does with res
  //getTweets is now linked to express

  getTweets('#mitochondria', wgtnGeoCode, function(tweetStatuses) {
    res.json(tweetStatuses)
  })
})

app.post('/tweets', function(req, res){
  //same as line 23
  var hashtagInput = Object.keys(req.body)[0] // grabs from form
  getTweets(hashtagInput, null, function(tweetStatuses) {
    res.json(tweetStatuses)
  })
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
