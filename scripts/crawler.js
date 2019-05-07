require([ "simplecrawler" ], function(simpleCrawler) {
    console.log("simplecrawler has been loaded.");
});

var Crawler = require('sim
let crawler = new Crawler("http://www.southeastern.edu/");

crawler.interval = 10000; // Ten seconds
crawler.maxConcurrency = 5;
crawler.maxDepth = 2;

crawler.on("fetchcomplete", function(queueItem, responseBuffer, response) {
    console.log("I just received %s (%d bytes)", queueItem.url, responseBuffer.length);
    console.log("It was a resource of type %s", response.headers['content-type']);
});