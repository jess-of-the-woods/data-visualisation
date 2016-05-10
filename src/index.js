var $               = require('jquery')
var request         = require('superagent');
var pieChart        = require('./pieChart')
var hashtagAnalysis = require('./hashtagAnalysis')

function analyseHashtags (tweets) {
  var hashtagArray = hashtagAnalysis.extractHashtags(tweets)
  var hashtagCounts = hashtagAnalysis.createHashtagObject( hashtagArray )
  var hashtagCountArray = hashtagAnalysis.createHashtagCountArray( hashtagCounts )
  var sortedHashTagCountArray = hashtagAnalysis.sortHashtagCountArray( hashtagCountArray )
  return sortedHashTagCountArray
}

function renderSortedHashtags ( sortedHashTagCountArray ) {
  for (var hashtag = 0; hashtag < sortedHashTagCountArray.slice(0,16).length; hashtag++) {
      $('#hashtagAssociates').append(sortedHashTagCountArray[hashtag].hashtag + ': ' + sortedHashTagCountArray[hashtag].count + '<br>')
  }
}

function clearCurrentData() {
  $('#tweetsHeader').hide();
  $('#tweetsDiv').hide();
  $('#pieChart').empty();
  $('#userSubmittedTweetsHeader').empty();
  $('#userSubmittedTweets').empty();
  $('#hashtagAssociates').empty();
}

$(document).ready(function() {
	request
		.get('/tweets')
		.end(function(err, res){
			$('#tweetsHeader').append('<h3 class="ten columns">Tweet results ( hardcoded hashtag )..</h3>')
			for (var i = 0; i < res.body.length; i++) {
				$('#tweetsDiv').append('<p>' + res.body[i].text + ' ' + '<br>' +'User Name: ' + res.body[i].user.name + ' ' + 'Location: ' + res.body[i].user.location + '</p>')
			}

      var sortedHashTagCountArray = analyseHashtags( res.body )
      pieChart(sortedHashTagCountArray.slice(0,7), '#pieChart')
      renderSortedHashtags( sortedHashTagCountArray )
    })

	$('#hashtagForm').submit(function(e){
		e.preventDefault()
		var value = $('#hashtagInput').val()
		request
		.post('/tweets')
		.send('#' + value)
		.end(function( error, res ){
			if(error) {
 				console.log("Error: " + error);
			}
			else {
        clearCurrentData()
				$('#userSubmittedTweetsHeader').prepend('<h3 class="ten columns" id="searchResult">Search Results:' + ' ' + '#' + value + '</h3>')
				for (var tweet in res.body) {
					$('#userSubmittedTweets').append('<p>' + res.body[tweet].text + ' ' + '<br>' +'User Name: ' + res.body[tweet].user.name + ' ' + 'Location: ' + res.body[tweet].user.location + '</p>')
					}
				$('#userSubmittedTweets').append('<h6>Yep yep, those are the tweets. You just saw em.</h6>')
        var sortedHashTagCountArray =  analyseHashtags(res.body)
        renderSortedHashtags( sortedHashTagCountArray )
        pieChart(sortedHashTagCountArray.slice(0,7), '#pieChart')
			}
		})
	})
})
