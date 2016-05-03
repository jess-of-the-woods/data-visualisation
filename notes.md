Notes:

browserify and render to DOM (debug browserify process.. huge file, lags, browser console errors)

'npm start' to start, logs to console


Build a function using regex to push all hashtags to an array. Another function to add all hashtags in array to an object, incrementing the number if hashtag exists more than once.
var hashtagObj = {}
hashtagObj['color'] = "blue"

https://stackoverflow.com/questions/25538860/extracting-hashtags-out-of-a-string
Just use a regular expression to find occurences of a hash followed by non-whitespace characters.
.match(/#\w+/g)
