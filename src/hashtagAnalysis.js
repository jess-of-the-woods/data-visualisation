function extractHashtags( tweets ) {
  var hashtagArray = []
  for ( var i = 0; i < tweets.length; i++ ) {
    hashtagArray.push(tweets[i].text.match(/#\w+/g))
  }
 return hashtagArray
}

function createHashtagObject ( hashtagArray ) {
  var hashtagCounts = {}
  for (var i = 0; i < hashtagArray.length; i++) {
    // console.log('this is hashtagArray: ', hashtagArray)
    var hashtagSubArray = hashtagArray[i]
    // console.log('this is hashtagSubArray: ', hashtagSubArray)
    // console.log('this is hashtagSubArray: ', hashtagSubArray)
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

module.exports = {
extractHashtags: extractHashtags,
createHashtagObject: createHashtagObject,
createHashtagCountArray: createHashtagCountArray,
sortHashtagCountArray: sortHashtagCountArray
}
