(function () {
	'use strict';

	module.exports = function (GLOBAL, gulp) {
		const nodemon = require('gulp-nodemon');
		return function () {
				nodemon({
					script: 'dist/src/main.js',
					ext: '.js',
					ignore: '.ts',
					env: {
						'NODE_ENV': 'development'
					},
					delay: 20
				})

		}
	}
})();