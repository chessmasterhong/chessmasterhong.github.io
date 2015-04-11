/**
 *  Blog module generator for chessmasterhong.github.io
 *  Author: Kevin Chan (chessmasterhong)
 */

'use strict';

var fs = require('fs'),
    path = require('path');

var charset = 'utf-8';

var container = '<div class="row"><div class="large-12 column"><h2 class="section-title">{{ page.title }}</h2></div></div><div class="row"><div class="intro large-12 column">{{ content }}</div></div>';

// Read contents of index.html
fs.readFile(
    path.join(__dirname, '..', 'index.html'),
    charset,
    function(err, data) {
        if(err) { throw err; }

        // Manipulate contents to make room for blog contents
        var newData = data
            // Replace main contents with blog container
            .replace(
                /(<main.*?>)(?:.)*(<\/main>)/gi,
                '$1' + container + '$2'
            )
            // Remove in-file style blocks
            .replace(
                /<style.*?>.*<\/style>/gi,
                ''
            )
            // Update hyperlinks
            .replace(
                /(<a href=")(#[a-z]*?">.*?<\/a>)/gi,
                '$1/$2'
            );

        // Create blog directories if it does not exist
        var layoutsDir = path.join(__dirname, '..', 'blog', '_layouts');
        if(!fs.existsSync(layoutsDir)){
            fs.mkdirSync(layoutsDir);
        }

        // Write modified contents to blog repository
        fs.writeFile(
            path.join(layoutsDir, 'default.html'),
            newData,
            charset,
            function(err) {
                if(err) { throw err; }

                // Done!
                console.log('Blog layout regenerated.');
            }
        );
    }
);
