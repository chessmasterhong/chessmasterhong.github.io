'use strict';

var fs = require('fs'),
    path = require('path');

var srcRoot = '../src/';
var destRoot = '../dist/';

var charset = 'utf8';

var matchTag = function(tag) {
    tag = tag.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
    return new RegExp('\\{\\{\\s*' + tag + '\\s*\\}\\}', 'g');
};

var portfolioItems = '';

var portfolioTemplate = fs.readFileSync(
    path.join(__dirname, srcRoot, 'index.html'),
    charset
);

var portfolioItemTemplate = fs.readFileSync(
    path.join(__dirname, srcRoot, 'templates/portfolio-item.html'),
    charset
);

var projectData = JSON.parse(
    fs.readFileSync(
        path.join(__dirname, srcRoot, 'data/projects.json'),
        charset
    )
);

var i;

for(i = 0; i < projectData.length; i++) {
    var projectItem = '';
    
    projectItem = portfolioItemTemplate.replace(
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

    portfolioItems += projectItem;
}

portfolioTemplate = portfolioTemplate.replace(
    /((.|\n)*<ul.*id="portfolio-items".*?>).*(?=<\/ul>)/,
    '$1' + portfolioItems
);

fs.writeFileSync(
    path.join(__dirname, destRoot, 'index.html'),
    portfolioTemplate,
    charset,
    function(err) {
        if(err) {
            console.log(err);
        }
    }
);
