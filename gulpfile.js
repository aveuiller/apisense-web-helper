'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var rename = require('gulp-rename');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');

var DEST = 'build/';

gulp.task('build', () => {
    let nonBundled = getBrowserify();
    nonBundled.ignore('chart.js');
    bundle(nonBundled, 'apisense.js', true)();

    let bundled = getBrowserify();
    bundle(bundled, 'apisense.bundle.js', true)();
});

gulp.task('build-dev', () => {
    let b = getBrowserify()
        .ignore('chart.js');
    bundle(b, 'apisense.js', false)();
});

gulp.task('build-dev-bundle', () => {
    let b = getBrowserify();
    bundle(b, 'apisense.bundle.js', false)();
});

gulp.task('watch', () => {
    return gulp.watch('./src/**', ['build-dev']);
});

gulp.task('watch-bundle', () => {
    return gulp.watch('./src/**', ['build-dev-bundle']);
});

function getBrowserify() {
    return browserify('src/main.js', {
            standalone: 'Apisense',
            paths: ['src/']
        })
        .transform("babelify", {
            presets: ["es2015"]
        });
}

function bundle(b, name, minify) {
    return () => {
        let b1 = b.bundle()
            .pipe(source(name))
            // This will output the non-minified version name.js
            .pipe(gulp.dest(DEST));
        if (minify) {
            // This will minify and rename to name.min.js
            b1.pipe(streamify(uglify()))
                .pipe(rename({
                    extname: '.min.js'
                }))
                .pipe(gulp.dest(DEST));
        }
    };
}
