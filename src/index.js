var $               = require('jquery')
var request         = require('superagent');
var pieChart        = require('./pieChart')
var helpers = require('./helpers')



$(document).ready(function() {
	request
		.get('/tweets')
		.end(function(err, res){
			$('#tweetsHeader').append('<h3 class="ten columns">Tweet results ( hardcoded hashtag )..</h3>')
			for (var tweet = 0; tweet < res.body.length; tweet++) {
				$('#tweetsDiv').append('<p>' + res.body[tweet].text + ' ' + '<br>' +'User Name: ' + res.body[tweet].user.name + ' ' + 'Location: ' + res.body[tweet].user.location + '</p>')
			}

      var sortedHashTagCountArray = helpers.analyseHashtags( res.body )
      pieChart( sortedHashTagCountArray.slice(0,7), '#pieChart' )
      helpers.renderSortedHashtags( sortedHashTagCountArray )
    })

	$('#hashtagForm').submit(function(e){
		e.preventDefault()
		var value = $('#hashtagInput').val()
    var geoCode = $('#regionGeoCode').val()
		request
		.post('/tweets')
		.send({hashtag: '#' + value, geocode: geoCode})
		.end(function( error, res ){
			if(error) {
 				console.log("Error: " + error);
			}
			else {
        helpers.clearCurrentData()
				$('#userSubmittedTweetsHeader').prepend('<h3 class="ten columns" id="searchResult">Search Results:' + ' ' + '#' + value + '</h3>')
				for (var tweet in res.body) {
					$('#userSubmittedTweets').append('<p>' + res.body[tweet].text + ' ' + '<br>' +'User Name: ' + res.body[tweet].user.name + ' ' + 'Location: ' + res.body[tweet].user.location + '</p>')
				}
				$('#userSubmittedTweets').append('<h6>Yep yep, those are the tweets. You just saw em.</h6>')
        var sortedHashTagCountArray =  helpers.analyseHashtags(res.body)
        helpers.renderSortedHashtags( sortedHashTagCountArray )
        pieChart(sortedHashTagCountArray.slice(0,7), '#pieChart')
			}
		})
	})
  var geoCode = $('#regionGeoCode').val()
})
