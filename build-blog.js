/**
 *  Blog module generator for chessmasterhong.github.io
 *  Author: Kevin Chan (chessmasterhong)
 */

'use strict';

var fs = require('fs'),
    path = require('path');

var charset = 'utf-8';

// jshint multistr: true
var container = '\n\
      <div class="row">\n\
        <div class="large-12 column">\n\
          <h2 class="section-title">{{ title }}</h2>\n\
        </div>\n\
      </div>\n\
      <div class="row">\n\
        <div class="intro large-12 column">\n\
          {{ content }}\n\
        </div>\n\
      </div>\n\
      </div>\n\
    ';
// jshint multistr: false

fs.readFile(
    path.join(__dirname, 'index.html'),
    charset,
    function(err, data) {
        if(err) { throw err; }

        var newData = data
            .replace(
                /(<main.*>)(?:.|\n)*(<\/main>)/gi,
                '$1' + container + '$2'
            )
            .replace(
                /.*<style.*>(.|\n)*<\/style>\n/gi,
                ''
            );

        fs.writeFile(
            path.join(__dirname, 'blog', '_layouts', 'default.html'),
            newData,
            charset,
            function(err) {
                if(err) { throw err; }
                console.log('Blog layout regenerated.');
            }
        );
    }
);
