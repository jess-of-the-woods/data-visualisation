var $        = require('jquery')
var request  = require('superagent');
var pieChart = require('./pieChart')

$(document).ready(function() {
	request
		.get('/tweets')
		.end(function(err, res){
			//console.log('res.body: ', res.body)
			for (var i = 0; i < res.body.length; i++) {
				$('#tweetsDiv').append('<p>' + res.body[i].text + ' ' + '<br>' +'User Name: ' + res.body[i].user.name + ' ' + 'Location: ' + res.body[i].user.location + '</p>')
			}

			var hashtagArray = []
			for ( var i = 0; i < res.body.length; i++ ) {
				hashtagArray.push(res.body[i].text.match(/#\w+/g))
			}
		//	console.log('this is hashtagArray: ', hashtagArray)
			var hashtagCounts = {}
			for (var i = 0; i < hashtagArray.length; i++) {
				var hashtagSubArray = hashtagArray[i]
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

	//		console.log('thus we have hashtagCounts: ', hashtagCounts)
			var hashtagCountArray = [];
			for( var hashtag in hashtagCounts ) {
			       hashtagCountArray.push({
							 hashtag: hashtag,
							 count: hashtagCounts[hashtag]
						 });
			}

			var sortedHashTagCountArray = hashtagCountArray.sort(compareSecondColumn)
			pieChart(sortedHashTagCountArray.slice(0,12), '#pieChart')

			console.log('this is sortedHashTagCountArray: ', sortedHashTagCountArray)

			// ===== for loop appends hashtags to page
			// for (var hashtag in hashtagCounts) {
			// 	$('#hashtagAssociates').append('<p>' + hashtag + ':' + hashtagCounts[hashtag] + '</p>')
			// 	 //console.log(hashtag)
			// }
			//
			// for (var hashtag = 0; hashtag < sortedHashTagCountArray.length; hashtag++) {
			// 	 	$('#hashtagAssociates').append('<p>' +  sortedHashTagCountArray[hashtag] + '</p>')
			// }

		}) // close .end
}) // close document ready..
