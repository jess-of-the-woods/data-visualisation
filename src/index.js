var $               = require('jquery')
var request         = require('superagent');
var pieChart        = require('./pieChart')
var hashtagAnalysis = require('./hashtagAnalysis')

function renderSortedHashtags ( sortedHashTagCountArray ) {
  $('#hashtagAssociatesDiv').prepend('<h5 id="hashtagsHeader">Associated Hashtags:</h5><br>')
  for (var hashtag = 0; hashtag < sortedHashTagCountArray.slice(0,16).length; hashtag++) {
      $('#hashtagAssociates').append(sortedHashTagCountArray[hashtag].hashtag + ': ' + sortedHashTagCountArray[hashtag].count + '<br>')
  }
}

$(document).ready(function() {
	request
		.get('/tweets')
		.end(function(err, res){
			$('#tweetsHeader').append('<h3 class="ten columns">Tweet results ( hardcoded hashtag )..</h3>')
			for (var i = 0; i < res.body.length; i++) {
				$('#tweetsDiv').append('<p>' + res.body[i].text + ' ' + '<br>' +'User Name: ' + res.body[i].user.name + ' ' + 'Location: ' + res.body[i].user.location + '</p>')
			}

        var hashtagArray = hashtagAnalysis.extractHashtags( res.body )
        var hashtagCounts = hashtagAnalysis.createHashtagObject( hashtagArray )
        var hashtagCountArray = hashtagAnalysis.createHashtagCountArray( hashtagCounts )
        var sortedHashTagCountArray = hashtagAnalysis.sortHashtagCountArray( hashtagCountArray )

      // attempted refactor ( not working ) fn needs to return multiple vars which is impossible?
      // function analyseHashtags (tweets) {
      //   var hashtagArray = hashtagAnalysis.extractHashtags( res.body )
      //   var hashtagCounts = hashtagAnalysis.createHashtagObject( hashtagArray )
      //   var hashtagCountArray = hashtagAnalysis.createHashtagCountArray( hashtagCounts )
      //   var sortedHashTagCountArray = hashtagAnalysis.sortHashtagCountArray( hashtagCountArray )
      //   return sortedHashTagCountArray
      // }
      // analyseHashtags( res.body )

			pieChart(sortedHashTagCountArray.slice(0,16), '#pieChart')

			//========= render search results ( tweets )
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
              $('#tweetsHeader').hide();
              $('#tweetsDiv').hide();
              $('#hashtagsHeader').hide();
              // $('#hashtagAssociatesDiv').empty();
              $('#pieChart').empty();
              $('#hashtagAssociates').empty();
							$('#userSubmittedTweetsHeader').prepend('<h3 class="ten columns" id="searchResult">Search Results:' + ' ' + '#' + value + '</h3>')
							for (var w in res.body) {
								$('#userSubmittedTweets').append('<p>' + res.body[w].text + ' ' + '<br>' +'User Name: ' + res.body[w].user.name + ' ' + 'Location: ' + res.body[w].user.location + '</p>')
								}
							$('#userSubmittedTweets').append('<h4>Yep yep, those are the tweets. You just saw em.</h4><br>')
              var hashtagArray = hashtagAnalysis.extractHashtags( res.body )
              var hashtagCounts = hashtagAnalysis.createHashtagObject( hashtagArray )
              var hashtagCountArray = hashtagAnalysis.createHashtagCountArray( hashtagCounts )
              var sortedHashTagCountArray = hashtagAnalysis.sortHashtagCountArray( hashtagCountArray )
              renderSortedHashtags( sortedHashTagCountArray )
              pieChart(sortedHashTagCountArray.slice(0,16), '#pieChart')
						} // close else
					}) // close .end
				}) // close listener

      renderSortedHashtags( sortedHashTagCountArray )
		})
}) // close document ready
