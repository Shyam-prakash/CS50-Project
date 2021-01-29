# CS50-Project
Final project - Creating the analysis tool for movies using HTML, JS, CSS, REST api
# APPLYING TO API:
First apply to both TMDB and Twitter apis by creating developer accounts in the respective portals.
# USING TWITTER API:
For using twitter api first install twitter proxy package by using command npm -g twitter-proxy
Then Create a config JSON file, The config.json file you create should containing at least the following keys:
{
  "consumerKey": "<paste consumer key here>",
  "consumerSecret": "<paste consumer secret here>"
}.
TWITTER-PROXY handles the oauth twitter api requests and simplifies browser requests to avoid the need for a dedicated server.
Start the twitter proxy referencing the config.json file you created earlier. You can now make proxied api requests from http://localhost:7890/1.1/search/tweets.json?q=.
Then use this url in the Javascript code to access the twitter api and perform Query search.
