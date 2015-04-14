'use strict';

var fs = require('fs'),
    marked = require('marked'),
    path = require('path');

var postsDir = path.join(__dirname, '..', 'src', 'data', 'blog', 'posts');
var charset = 'utf-8';

fs.readdir(
    path.join(postsDir),
    function(err, files) {
        if(err) { throw err; }

        files.forEach(function(file) {
            fs.readFile(
                path.join(postsDir, file),
                charset,
                function(err, contents) {
                    var markdown = marked(contents);
                    console.log(markdown);
                }
            );
        });
    }
);










