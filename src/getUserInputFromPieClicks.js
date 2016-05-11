var request         = require('superagent');
var $               = require('jquery')
var hashtagAnalysis = require('./hashtagAnalysis')

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
      // console.log('this is hashtag: ', value)
      // console.log('this is res.body: ', res.body)
      
      //clearCurrentData()  // will this work w/out being required in??
      // should I put function inside hashtagAnalysis & rename to helper fn's?

      $('#userSubmittedTweetsHeader').prepend('<h3 class="ten columns" id="searchResult">Search Results:' + ' ' + value + '</h3>')

      for (var tweet in res.body) {
        $('#userSubmittedTweets').append('<p>' + res.body[tweet].text + ' ' + '<br>' +'User Name: ' + res.body[tweet].user.name + ' ' + 'Location: ' + res.body[tweet].user.location + '</p>')
      }

      // $('#userSubmittedTweets').append('<h6>Yep yep, those are the tweets. You just saw em.</h6>')

      // var sortedHashTagCountArray =  analyseHashtags(res.body)
      // renderSortedHashtags( sortedHashTagCountArray )
      // pieChart(sortedHashTagCountArray.slice(0,7), '#pieChart')
    } // close else
  })
}

module.exports = searchByAssociatedHashtag
