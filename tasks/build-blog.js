'use strict';

var fs = require('fs'),
    marked = require('marked'),
    path = require('path');

var charset = 'utf-8';

var postsDir = path.join(__dirname, '..', 'src', 'data', 'blog', 'posts');

var postList = [];

fs.readdir(
    path.join(postsDir),
    function(err, files) {
        if(err) { throw err; }

        files.forEach(function(file) {
            var date = file.match(/\d{2,}/g);
            var year = date[0];
            var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][Number(date[1]) - 1];
            var day = date[2];
            var f = file.replace(/^\d{4}-\d{2}-\d{2}-(.*)\.md$/gi, '$1');
            var title = f.replace(/(?:^|_)(.)/g, function(m, a) { return ' ' + a.charAt(0).toUpperCase(); });

            postList.push(
                '<li><span class="date">' +
                    month + ' ' + day + ' ' + year + ' &raquo; ' +
                    '<a href="/blog/posts/' + f + '">' + title + '</a>' +
                '</span></li>'
            );

            fs.readFile(
                path.join(postsDir, file),
                charset,
                function(err, contents) {
                    var markdown = marked(contents);
                    //console.log(markdown);
                }
            );
        });
    }
);










