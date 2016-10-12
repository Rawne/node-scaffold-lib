var gulp = require('gulp');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');
var mocha = require('gulp-mocha');
var sourcemaps = require('gulp-sourcemaps');
var istanbul = require('gulp-istanbul');
var remapIstanbul = require('remap-istanbul/lib/gulpRemapIstanbul');

gulp.task('build', function() {
   return tsProject.src()
   .pipe(sourcemaps.init())
   .pipe(tsProject())
   .pipe(sourcemaps.write())
   .pipe(gulp.dest('dist'));
});

gulp.task('test:instrument', ['build'], function() {
    return gulp.src('./dist/src/*.js')
    .pipe(istanbul())
    .pipe(istanbul.hookRequire()); //this forces any call to 'require' to return our instrumented files
});

gulp.task('test:cover', ['test:instrument'], function() {
    return gulp.src('./dist/**/*tests.js')
    .pipe(mocha({ui:'bdd'})) //runs tests
    .pipe(istanbul.writeReports({
        reporters: [ 'json' ] //this yields a basic non-sourcemapped coverage.json file
    })).on('end', remapCoverageFiles); //remap
});
//using remap-istanbul we can point our coverage data back to the original ts files
function remapCoverageFiles() {
    return gulp.src('./coverage/coverage-final.json')
    .pipe(remapIstanbul({
        basePath: '.',
        reports: {
            'html': './coverage',
            'text-summary': null,
            'lcovonly': './coverage/lcov.info'
        }
    }));
}

gulp.task('test', ['test:cover']);
gulp.task('default', ['build', 'test']);
