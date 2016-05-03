var $        = require('jquery')
var request  = require('superagent');

$(document).ready(function() {
	request
		.get('/tweets')
		.end(function(err, res){
			 console.log(res.body)
			for (var i = 0; i < res.body.length; i++) {
				$('#tweetsDiv').append('<p>' + res.body[i].text + ' ' + '<br>' +'User Name: ' + res.body[i].user.name + ' ' + 'Location: ' + res.body[i].user.location + '</p>')
				// console.log(res.body[i].text)
			} // close for loop

			var hashtagObj = {}
			// for (var i = 0; i < res.body.length; i++) {
			// 	if (res.body[i].text) {
			//
			// 	}
			// }
		})
});
//
// {
// 	'hello':1,
// 	'hey': 2
//  }
