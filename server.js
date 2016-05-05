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
    console.log(req)

    var wellyTweets =  client.get('search/tweets', {q: '#happy', lang: 'en', count: 20, geocode: wgtnGeoCode}, function(error, tweets, response) {
    if (error) console.log(error);
    // var searchResult = JSON.parse(response.body)
    // console.log(tweets.statuses)
    // console.log('response.body: ', response.body)
    //console.log('this is tweets.statuses: ', tweets.statuses)
    res.json(tweets.statuses)
 }) // close client.get
})

app.post('/tweets', function(req, res){
  // console.log('this is req.body: ', Object.keys(req.body)[0])
  var hashtagInput = Object.keys(req.body)[0] // grabs from form?
  //  console.log(hashtagInput)
  client.get('search/tweets', {q: hashtagInput, lang: 'en', count: 20}, function(error, tweets, response) {
  if (error) console.log(error);
  res.json(tweets.statuses)
  }) // close client.get
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


// console.log('tweets.statuses: ', tweets.statuses)
