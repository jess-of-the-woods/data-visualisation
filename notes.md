Notes:

-[x] get searched for queries running through analysis & rendering in pie chart
-[ ] get labels rendering on donutChart
-[ ] get all tweets from a user, graph by hashtag (love Tabby)
-[ ] geocodes for auckland.. rotorua etc. & drop down select on form

______________


1. get more tweets from twitter based on location..
into an array.

2. analyze based on other hashtags also included..

3. build up a visualisation based on number of associated hashtags..

Build a function using regex to push all hashtags to an array. Another function to add all hashtags in array to an object, incrementing the number if hashtag exists more than once.
var hashtagObj = {}
hashtagObj['color'] = "blue"

https://stackoverflow.com/questions/25538860/extracting-hashtags-out-of-a-string
Just use a regular expression to find occurences of a hash followed by non-whitespace characters.
.match(/#\w+/g)



sort nested array (hashtagCountArray) by 2nd element in inner arrays
e.g.
[
  [happy, 1],
  [sad, 3],
  [jealous, 43]
]

https://stackoverflow.com/questions/16096872/how-to-sort-2-dimensional-array-by-column-value

________

with some search queries (e.g. #feminism), zeroth array element is null..
index.js:24 Uncaught TypeError: Cannot read property 'length' of null


for (var i = 0; i < hashtagArray.length; i++) {
  var hashtagSubArray = hashtagArray[i]
}

Problem not happening anymore..

_____
