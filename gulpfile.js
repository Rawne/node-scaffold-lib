const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const mocha = require('gulp-mocha');
const sourcemaps = require('gulp-sourcemaps');
const istanbul = require('gulp-istanbul');
const remapIstanbul = require('remap-istanbul/lib/gulpRemapIstanbul');
const babel = require('gulp-babel');
const nodemon = require('gulp-nodemon');

gulp.task('test', ['test:cover']);
gulp.task('default', ['build', 'test']);

gulp.task('serve',['build'], () => {
    nodemon({
        tasks: ['build'],
        script: 'dist/src/main.js',
        ext: '.ts',
        ignore: '.js',
        env: {
            'NODE_ENV': 'development'
        }
    })
});

gulp.task('serve test', ['default'], () => {
    nodemon({
        tasks: ['default'],
        script: 'dist/test/startup.tests.js',
        ext: '.ts',
        ignore: '.js',
        env: {
            'NODE_ENV': 'development'
        }
    })
});

gulp.task('build', () => {
  return tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .pipe(sourcemaps.write())
    .pipe(babel({
      presets: ['latest']
      }))
    .pipe(gulp.dest('dist/src'))
});


gulp.task('test:instrument', ['build'], () => {
  return gulp.src('./dist/src/*.js')
    .pipe(istanbul())
    .pipe(istanbul.hookRequire()); //this forces any call to 'require' to return our instrumented files
});

gulp.task('test:cover', ['test:instrument'], () => {
  return gulp.src('./dist/**/*tests.js')
    .pipe(mocha({ui:'bdd'})) //runs tests
    .pipe(istanbul.writeReports({
        reporters: [ 'json' ]})) //this yields a basic non-sourcemapped coverage.json file
    .on('end', remapCoverageFiles); //remap
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


