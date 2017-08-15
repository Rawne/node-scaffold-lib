
(function () {
	'use strict';

	module.exports = function (GLOBAL, gulp) {
		return function () {
			gulp.watch([
				GLOBAL.dirs.src1,
				GLOBAL.dirs.src2,
				GLOBAL.dirs.src3,
				GLOBAL.dirs.testsrc
			], ['lint', 'build']);

		}
	}
})();


