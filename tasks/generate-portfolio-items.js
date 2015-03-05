'use strict';

var fs = require('fs'),
    path = require('path');

var srcRoot = '../src/';

var charset = 'utf8';

fs.readFile(srcRoot + 'templates/portfolio-item.html', charset,
    function(err, html) {
        if(!err) {
            var projectData = JSON.parse(
                fs.readFileSync(srcRoot + 'data/projects.json')
            );
            console.log(projectData);
        } else {
            console.log(err);
        }
    }
);
