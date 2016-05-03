var $        = require('jquery')
var request  = require('superagent');

$(document).ready(function() {
	request
		.get('/tweets')
		.end(function(err, res){
			//  console.log(res.body)
			for (var i = 0; i < res.body.length; i++) {
				$('#tweetsDiv').append('<p>' + res.body[i].text + ' ' + '<br>' +'User Name: ' + res.body[i].user.name + ' ' + 'Location: ' + res.body[i].user.location + '</p>')
			//	console.log(res.body[i].text)
			}

			var hashtagArray = []
			for ( var i = 0; i < res.body.length; i++ ) {
				hashtagArray.push(res.body[i].text.match(/#\w+/g))
				// console.log('this is i: ', i)
			}
			console.log('this is hashtagArray: ', hashtagArray)
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

			// console.log('this is hashtagCounts: ', hashtagCounts)

			for (var i = 0; i < hashtagCounts.length; i++) {
				$('#hashtagAssociates').append('<p>' + hashtagCounts[i].value +'</p>')
				// console.log(hashtagCounts)
				// console.log('this is i: ', i )
			}

		}) // close .end
}) // close document ready..
