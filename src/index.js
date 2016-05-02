var $        = require('jquery')
var request  = require('superagent');

$(document).ready(function() {
	request
		.get('/tweets')
		.end(function(err, res){
			// console.log(res.body)
			for (var i = 0; i < res.body.length; i++) {
				$('#tweetsDiv').append('<p>' + res.body[i].text + '</p>')
				// console.log(res.body[i].text)
			}
		})
});
