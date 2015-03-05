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

            for(var i = 0; i < projectData.length; i++) {
                var projectItem = html.replace(
                    matchTag('title'),
                    projectData[i].title || ''
                )
                .replace(
                    matchTag('caption'),
                    projectData[i].caption || ''
                )
                //.replace(
                //    matchTag('readMoreUrl'),
                //    projectData[i].readMoreUrl || '#'
                //)
                .replace(
                    matchTag('demoUrl'),
                    projectData[i].demoUrl || '#'
                )
                .replace(
                    matchTag('srcUrl'),
                    projectData[i].srcUrl || '#'
                )
                .replace(
                    matchTag('thumbnailUrl'),
                    projectData[i].thumbnailUrl || '//placehold.it/400x400'
                );

                console.log(projectItem);
            }
        } else {
            console.log(err);
        }
    }
);
