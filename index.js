// var request  = require('superagent');
// var Promise = require('promise');
var $ = require('cheerio')
require('dotenv').config();
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});


var wgtnTweets = client.get('search/tweets', {q: '#lichen', lang: 'en'}, function(error, tweets, response) {
  if (error) console.log(error);
  var searchResult = JSON.parse(response.body)
//  console.log(response.body)
//  console.log(tweets.statuses)
//  console.log('this is searchResult: ', searchResult)
  for (var i = 0; i < tweets.statuses.length; i++) {
//    document.body.innerHTML="some words"
    console.log(tweets.statuses[i].text)
  }
})
// document.getElementsByTagName("div").innerHTML="what a sneaky snake!";
// document.body.innerHTML="yea!" /* works */
$(function() {
  $('#tweetDiv').html('some stufffff');

});
