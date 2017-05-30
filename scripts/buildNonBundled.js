var fs = require('fs');
var browserify = require('browserify');

var b = browserify('src/main.js', {
    standalone: 'Apisense',
    paths: ['src/']
});

b.ignore('jquery');
b.ignore('chart.js');

b.bundle().pipe(fs.createWriteStream('build/apisense.js'));
