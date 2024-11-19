// create web server
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var querystring = require('querystring');
var _ = require('underscore');

var comments = [];
var server = http.createServer(function(req, res) {
  var urlObj = url.parse(req.url);
  var urlPathname = urlObj.pathname;
  var query = querystring.parse(urlObj.query);

  if (urlPathname === '/') {
    fs.readFile('./index.html', 'utf-8', function(err, data) {
      if (err) {
        res.statusCode = 404;
        res.end('404 not found');
        return;
      }
      res.end(data);
    });
  } else if (urlPathname === '/comment') {
    if (req.method === 'GET') {
      var commentsStr = JSON.stringify(comments);
    } else if (req.method === 'POST') {
        var comment = '';
        req.on('data', function(chunk) {
            comment += chunk;
        });
        req.on('end', function() {
            comment = querystring.parse(comment);
            comments.push(comment);
        });
        }
        res.end(commentsStr);
    }
});