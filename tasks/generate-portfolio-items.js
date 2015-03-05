'use strict';

var fs = require('fs'),
    path = require('path');

var srcRoot = '../src/';

var charset = 'utf8';

fs.readFile(srcRoot + 'templates/portfolio-item.html', charset,
    function(err, dataRaw) {
        if(!err) {
            var data = dataRaw;
            console.log(data);
        } else {
            console.log(err);
        }
    }
);
