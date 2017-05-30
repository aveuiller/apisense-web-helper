var fs = require('fs');
var browserify = require('browserify');

var b = browserify('src/main.js', {
    standalone: 'Apisense',
    paths: ['src/']
});

b.bundle().pipe(fs.createWriteStream('build/apisense.bundled.js'));
