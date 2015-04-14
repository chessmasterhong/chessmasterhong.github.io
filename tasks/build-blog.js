/**
 *  Blog module generator for chessmasterhong.github.io
 *  Author: Kevin Chan (chessmasterhong)
 */

'use strict';

var fs = require('fs'),
    marked = require('marked'),
    path = require('path');

var charset = 'utf8';

var postsPathSrc = path.join(__dirname, '..', 'src', 'data', 'blog', 'posts');
var postsPathDest = path.join(__dirname, '..', 'blog');
var blogIndexPath = path.join(postsPathDest, 'index.html');

// Get all files in raw blog posts directory
fs.readdir(
    path.join(postsPathSrc),
    function(err, files) {
        if(err) { throw err; }

        // Get contents of blog index file
        var indexContent = fs.readFileSync(blogIndexPath, charset);

        var indexCont = [
            indexContent.replace(/(^.*?)\n?(<ul.*?class="post-list".*?>).*?<\/ul>.*$/gi, '$1$2'),
            indexContent.replace(/^.*?\n?<ul.*?class="post-list".*?>.*?(<\/ul>.*$)/gi, '$1')
        ];

        var postCont = [
            indexCont[0].replace(/(<div class="large-12 column">)<p>.*?<ul.*?class="post-list".*?>$/gi, ''),
            indexCont[1].replace(/^<\/ul>/gi, '')
        ];

        var postList = '';

        // For each file found
        files.forEach(function(file) {
            // extract data from filename
            var date = file.match(/\d{2,}/g);
            var year = date[0];
            var m = date[1];
            var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][Number(m) - 1];
            var day = date[2];
            var f = file.replace(/^\d{4}-\d{2}-\d{2}-(.*)\.md$/gi, '$1');
            var title = f.replace(/(?:^|_)(.)/g, function(m, a) { return ' ' + a.charAt(0).toUpperCase(); });

            // Construct post list item using extracted data
            // Append list item to blog post listing
            postList +=
                '<li><span class="date">' +
                    month + ' ' + day + ' ' + year + ' &raquo; ' +
                    '<a href="/blog/' + year + '/' + m + '/' + day + '/' + f + '">' + title + '</a>' +
                '</span></li>';

            // Read contents of individual file
            fs.readFile(
                path.join(postsPathSrc, file),
                charset,
                function(err, markdownContent) {
                    // Convert contents from Markdown to HTML
                    var markdown = marked(markdownContent);

                    // Create blog directories if it does not exist
                    var yearDir = path.join(postsPathDest, year);
                    if(!fs.existsSync(yearDir)){
                        fs.mkdirSync(yearDir);
                    }
                    var monthDir = path.join(yearDir, m);
                    if(!fs.existsSync(monthDir)){
                        fs.mkdirSync(monthDir);
                    }
                    var dayDir = path.join(monthDir, day);
                    if(!fs.existsSync(dayDir)){
                        fs.mkdirSync(dayDir);
                    }
                    var postDir = path.join(dayDir, f);
                    if(!fs.existsSync(postDir)){
                        fs.mkdirSync(postDir);
                    }

                    // Write blog post to file
                    fs.writeFile(
                        path.join(postDir, 'index.html'),
                        postCont[0] + markdown + postCont[1],
                        charset,
                        function(err) {
                            if(err) { throw err; }
                            console.log('Wrote post ' + f + ' to blog.');
                        }
                    );
                }
            );
        });

        // Insert blog post listing to extracted blog index contents
        // Write modified contents back to blog index file
        fs.writeFileSync(blogIndexPath, indexCont[0] + postList + indexCont[1], charset);

        // Done
        console.log('Blog rebuilt.');
    }
);










