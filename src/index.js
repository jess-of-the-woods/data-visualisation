var $        = require('jquery')
var request  = require('superagent');
var pieChart = require('./pieChart')

$(document).ready(function() {
	request
		.get('/tweets')
		.end(function(err, res){
			//console.log('res.body: ', res.body)
			$('#tweetsDiv2').append('<h3>Hardcoded tweet results..</h3>')
			for (var i = 0; i < res.body.length; i++) {
				$('#tweetsDiv2').append('<p>' + res.body[i].text + ' ' + '<br>' +'User Name: ' + res.body[i].user.name + ' ' + 'Location: ' + res.body[i].user.location + '</p>')
			}

			// attempted refactor (put code inside fn and call it)
			// createHashtagArray function (resBody) {
			// 	var hashtagArray = []
			// 	console.log(typeof resBody)
			// 	for ( var i = 0; i < resBody.length; i++ ) {
			// 		hashtagArray.push(resBody[i].text.match(/#\w+/g))
			// 	}
			// 	return hashtagArray
			// }
			// createHashtagArray(res.body)

			var hashtagArray = []
			for ( var i = 0; i < res.body.length; i++ ) {
				hashtagArray.push(res.body[i].text.match(/#\w+/g))
			}

			var hashtagCounts = {}
			for (var i = 0; i < hashtagArray.length; i++) {
				console.log('this is hashtagArray: ', hashtagArray)
				var hashtagSubArray = hashtagArray[i]
				console.log('this is hashtagSubArray: ', hashtagSubArray)
				for(var j = 0; j < hashtagSubArray.length; j++) {
					var hashtag = hashtagSubArray[j]
					if (hashtagCounts[hashtag]){
						hashtagCounts[hashtag] += 1
					}
					else {
						hashtagCounts[hashtag] = 1
					}
				}
			} // close outer for..

			function compareSecondColumn(a, b) {
		    if (a.count === b.count) {
		        return 0;
		    } else {
		        return (a.count > b.count) ? -1 : 1;
		    }
			}

			var hashtagCountArray = [];
			for( var hashtag in hashtagCounts ) {
			       hashtagCountArray.push({
							 hashtag: hashtag,
							 count: hashtagCounts[hashtag]
						 });
			}

			var sortedHashTagCountArray = hashtagCountArray.sort(compareSecondColumn)
			// console.log('this is sortedHashTagCountArray', sortedHashTagCountArray)

			//calls pieChart function and passes it 'sortedHashTagCountArray', sliced at 16th item as data, & id #pieChart as place to mount it.
			pieChart(sortedHashTagCountArray.slice(0,16), '#pieChart')

			$('#hashtagForm').submit(function(e){
				e.preventDefault()
				var value = $('#hashtagInput').val()
				request
				.post('/tweets')
				.send('#' + value)
				.end(function(error, res){
    				if(error) {
       				console.log("Error: " + error);
    				}
						else {
							$('#searchResult').html('Search Results:' + ' ' + '#' + value)
							for (var w in res.body) {
								$('#tweetsDiv').append('<p>' + res.body[w].text + ' ' + '<br>' +'User Name: ' + res.body[i].user.name + ' ' + 'Location: ' + res.body[i].user.location + '</p>')
								}
							$('#tweetsDiv').append('<h4>Yep yep, those are the tweets. You just saw em.</h4><br>')
						}
					})
				})

			// ===== for loop appends sorted hashtags to page
			$('#hashtagAssociates').prepend('<h5>Associated Hashtags:</h5>')
			for (var hashtag = 0; hashtag < sortedHashTagCountArray.length; hashtag++) {
				 	$('#hashtagAssociates').append('<p>' +  sortedHashTagCountArray[hashtag].hashtag + ': ' + sortedHashTagCountArray[hashtag].count +'</p>')
			}
		})
})
