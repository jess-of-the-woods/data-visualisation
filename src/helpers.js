import $ from 'jquery'

function analyseHashtags (tweets) {
  var hashtagArray = extractHashtags(tweets)
  var hashtagCounts = createHashtagObject( hashtagArray )
  var hashtagCountArray = createHashtagCountArray( hashtagCounts )
  var sortedHashTagCountArray = sortHashtagCountArray( hashtagCountArray )
  return sortedHashTagCountArray
}

function extractHashtags( tweets ) {
  var hashtagArray = []
  tweets.map(function(tweet){
    return hashtagArray.push(tweet.text.match(/#\w+/g))
  })
 return hashtagArray
}

function createHashtagObject ( hashtagArray ) {
  var hashtagCounts = {}
  for (var i = 0; i < hashtagArray.length; i++) {
    var hashtagSubArray = hashtagArray[i]
    if (!hashtagSubArray) { continue }
    for(var j = 0; j < hashtagSubArray.length; j++) {
      var hashtag = hashtagSubArray[j]
      if (hashtagCounts[hashtag]){
        hashtagCounts[hashtag] += 1
      }
      else {
        hashtagCounts[hashtag] = 1
      }
    }
  }
  return hashtagCounts
}

function createHashtagCountArray ( hashtagCounts ){
  var hashtagCountArray = [];
  for( var hashtag in hashtagCounts ) {
         hashtagCountArray.push({
           hashtag: hashtag,
           count: hashtagCounts[hashtag]
         });
  }
  return hashtagCountArray
}

function sortHashtagCountArray ( hashtagCountArray ){
  function compareSecondColumn(a, b) {
    if (a.count === b.count) {
        return 0;
    } else {
        return (a.count > b.count) ? -1 : 1;
    }
  }
  var sortedHashTagCountArray = hashtagCountArray.sort(compareSecondColumn)
  return sortedHashTagCountArray
}

function clearCurrentData() {
  $('#tweetsHeader').hide();
  $('#tweetsDiv').hide();
  $('#pieChart').empty();
  $('#userSubmittedTweetsHeader').empty();
  $('#userSubmittedTweets').empty();
  $('#hashtagAssociates').empty();
}

function renderSortedHashtags ( sortedHashTagCountArray ) {
  for (var hashtag = 0; hashtag < sortedHashTagCountArray.slice(0,16).length; hashtag++) {
      $('#hashtagAssociates').append(sortedHashTagCountArray[hashtag].hashtag + ': ' + sortedHashTagCountArray[hashtag].count + '<br>')
  }
}

module.exports = {
  analyseHashtags: analyseHashtags,
  clearCurrentData: clearCurrentData,
  renderSortedHashtags: renderSortedHashtags
}
