var request         = require('superagent');
var $               = require('jquery')
var helpers = require('./helpers')

function searchByAssociatedHashtag(value){
  var location = 'none'
  request
  .post('/tweets')
  .send({hashtag: value, geocode: location})
  .end(function(error, res){
    if (error) {
      console.log(error)
    }
    else{
      helpers.clearCurrentData()
      $('#userSubmittedTweetsHeader').prepend('<h3 class="ten columns" id="searchResult">Search Results:' + ' ' + value + '</h3>')

      for (var tweet in res.body) {
        $('#userSubmittedTweets').append('<p>' + res.body[tweet].text + ' ' + '<br>' +'User Name: ' + res.body[tweet].user.name + ' ' + 'Location: ' + res.body[tweet].user.location + '</p>')
      }

      $('#userSubmittedTweets').append('<h6>Yep yep, those are the tweets. You just saw em.</h6>')

      var sortedHashTagCountArray =  helpers.analyseHashtags(res.body)
      helpers.renderSortedHashtags( sortedHashTagCountArray )
      // pieChart(sortedHashTagCountArray.slice(0,7), '#pieChart')
    } // close else
  })
}

module.exports = searchByAssociatedHashtag
