'use strict';

const GLOBAL = require('./gulp/config/gulpConfig');

const gulp = require('gulp');

//gulp tasks
gulp.task('clean', require(GLOBAL.dirs.gulp + 'clean')(GLOBAL, gulp));
gulp.task('lint', ['clean'], require(GLOBAL.dirs.gulp + 'lint')(GLOBAL, gulp));
gulp.task('build', ['lint'], require(GLOBAL.dirs.gulp + 'build')(GLOBAL, gulp));
gulp.task('default');
