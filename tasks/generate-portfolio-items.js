'use strict';

var fs = require('fs'),
    path = require('path');

var srcRoot = '../src/';

var charset = 'utf8';


var matchTag = function(identifier) {
    return new RegExp(
        '\\{\\{\\s*' +
        identifier.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&') +
        '\\s*\\}\\}',
        'g'
    );
};

fs.readFile(srcRoot + 'templates/portfolio-item.html', charset,
    function(err, html) {
        if(!err) {
            var projectData = JSON.parse(
                fs.readFileSync(srcRoot + 'data/projects.json')
            );

            var projectItem = html.replace(
                matchTag('title'),
                projectData[0].title
            );



            console.log(projectItem);
        } else {
            console.log(err);
        }
    }
);
