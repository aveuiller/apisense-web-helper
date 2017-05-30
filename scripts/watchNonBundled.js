var fs = require('fs');
var watchify = require('watchify');
var browserify = require('browserify');

var b = browserify('src/main.js', {
    standalone: 'Apisense',
    paths: ['src/'],
    cache: {},
    packageCache: {},
    plugin: [watchify]
});

b.ignore('jquery');
b.ignore('chart.js');

b.on('update', bundle);
bundle();

function bundle() {
    var date = new Date().toLocaleString();
    console.log(date, "- Updating build/apisense.js");
    b.bundle().pipe(fs.createWriteStream('build/apisense.js'));
}
